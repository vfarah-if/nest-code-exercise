import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signin(user: AuthDto): Promise<{ accessToken: string }> {
    const result = await this.prismaService.user.findFirst({
      where: { email: user.email },
    })
    if (!result) this.raiseInvalidCredentials()
    const passwordMatch = argon.verify(result.hash, user.password)
    if (!passwordMatch) this.raiseInvalidCredentials()
    const { accessToken } = await this.signToken(result.id, result.email)
    return {
      accessToken,
    }
  }

  private raiseInvalidCredentials() {
    throw new ForbiddenException('Credentials invalid')
  }

  async signup(user: AuthDto): Promise<{ accessToken: string }> {
    const hash = await argon.hash(user.password)
    // console.log(user)
    const result = await this.prismaService.user
      .create({
        data: {
          email: user.email,
          hash,
          firstName: user.firstName,
          lastName: user.lastName,
          updatedAt: new Date(),
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken')
          }
        }
        throw error
      })
    const { accessToken } = await this.signToken(result.id, result.email)
    return {
      accessToken,
    }
  }

  async signToken(id: number, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: id,
      email,
    }
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    })
    return {
      accessToken: token,
    }
  }
}
