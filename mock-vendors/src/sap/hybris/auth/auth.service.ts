import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthDto, SignInDto } from './dto'
import { addSapUser } from '../../../db/services'
import SapUser from '../../../db/models/SapUser'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { config } from '../../../config'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(user: AuthDto) {
    try {
      return await addSapUser(user)
    } catch (error) {
      if (error.code === '11000') {
        throw new ForbiddenException('Credentials taken')
      }
      throw error
    }
  }

  async signin(user: SignInDto) {
    const existingUser = await SapUser.findOne({ email: user.email })
    if (!existingUser) this.raiseInvalidCredentials()
    const passwordMatch = await argon.verify(
      existingUser['hash'],
      user.password,
    )
    console.debug(existingUser['hash'], passwordMatch)
    if (!passwordMatch) this.raiseInvalidCredentials()
    const accessToken = await this.signToken(
      existingUser.id,
      existingUser['email'],
    )
    return accessToken
  }

  private raiseInvalidCredentials() {
    throw new UnauthorizedException('Credentials invalid')
  }

  async signToken(id: string, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: id,
      email,
    }
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: config.sapApi.jwt_expire_time,
      secret: config.sapApi.jwt_secret,
    })
    return {
      accessToken: token,
    }
  }
}
