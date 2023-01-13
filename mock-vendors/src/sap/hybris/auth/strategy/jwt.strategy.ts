import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { config } from '../../../../config'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.sapApi.jwt_secret,
    })
  }

  async validate(payload: any) {
    console.log(payload)
    return payload
  }

  public static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      'token' in req.cookies &&
      req.cookies.user_token.length > 0
    ) {
      return req.cookies.token
    }
    return null
  }
}
