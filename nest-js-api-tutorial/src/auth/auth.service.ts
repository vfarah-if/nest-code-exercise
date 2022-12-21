import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signin(user: AuthDto) {
    const result = await this.prismaService.user.findFirst({
      where: { email: user.email },
    })
    if (!result) this.raiseInvalidCredentials()
    const passwordMatch = argon.verify(result.hash, user.password)
    if (!passwordMatch) this.raiseInvalidCredentials()
    return { id: result.id, email: result.email }
  }

  private raiseInvalidCredentials() {
    throw new ForbiddenException('Credentials invalid')
  }

  async signup(user: AuthDto) {
    const hash = await argon.hash(user.password)
    const result = this.prismaService.user
      .create({
        data: {
          email: user.email,
          hash,
          firstName: user.firstName,
          lastName: user.lastName,
          updatedAt: new Date(),
        },
        select: { id: true, email: true, createdAt: true },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken')
          }
        }
        throw error
      })
    return result
  }
}
