import { HttpStatus, Injectable } from '@nestjs/common'
import * as argon from 'argon2'

import SapUser from '../../db/models/SapUser'
import { AuthService } from './auth/auth.service'
import Mockendpoint from '../../db/models/Mockendpoint'
import { Request, Response } from 'express'

@Injectable()
export class HybrisService {
  constructor(private service: AuthService) {}

  async getWhoAmI(
    request: Request,
    response: Response,
    headers: any = undefined,
  ) {
    const jwt = this.service.extractJWT(request)
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
    var { doc, headerParams, url } = await this.getSessionFromDb(headers)
    console.debug(doc, headers, headerParams, url)
    response.cookie(
      'JSESSION',
      headerParams ? headerParams['JSESSION'] : 'anonymous.app1-ee2',
    )
    return doc
      ? response
          // @ts-ignore
          .status(HttpStatus[doc['httpStatus']])
          .json(doc['jsonResponse'])
      : response
          .status(HttpStatus.NOT_FOUND)
          .json({ data: `Configure test to accept GET ${url}` })
  }

  private async getSessionFromDb(headers: any) {
    const url = 'json/transition/session-who-am-i'
    const headerParams =
      headers && headers['jsession']
        ? { JSESSION: headers['jsession'] }
        : undefined
    const doc = await Mockendpoint.findOne({
      url,
      method: 'GET',
      headerParams,
    }).select({
      jsonResponse: 1,
      httpStatus: 1,
    })
    return { doc, headerParams, url }
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
