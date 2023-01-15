import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import * as argon from 'argon2'

import SapUser from '../../db/models/SapUser'
import { AuthService } from './auth/auth.service'

@Injectable()
export class HybrisService {
  constructor(private service: AuthService) {}

  async getWhoAmI(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ) {
    const jwt = this.service.extractJWT(req)
    console.debug(jwt)
    if (jwt) {
      const accessToken = this.service.decodeToken(jwt['accessToken'])
      if (accessToken && accessToken['sub']) {
        const sapUserFromJWT = await this.getSapUserFromJWTData(
          accessToken,
          jwt,
        )
        if (sapUserFromJWT) return sapUserFromJWT
      }
    }
    // TODO: get from mockendpoint database and headers
    return { isSignedIn: false }
  }

  private async getSapUserFromJWTData(
    accessToken: string | { [key: string]: any },
    jwt: string,
  ) {
    const customerData = await SapUser.findById(accessToken['sub'])
    if (customerData) {
      const hashedEmail = await argon.hash(customerData['email'])
      const formattedAccessToken = {
        ...accessToken['accessToken'],
        email: hashedEmail,
        token_type: 'bearer',
        scope: 'default openid',
        access_token: jwt['accessToken'],
        expires_in: accessToken['exp'],
      }
      return {
        isSignedIn: true,
        accessToken: formattedAccessToken,
        customerData: {
          hashedEmail,
          firstName: customerData['firstName'],
          lastName: customerData['lastName'],
        },
        newLookSessionData: customerData['details'],
      }
    }
    return null
  }
}
