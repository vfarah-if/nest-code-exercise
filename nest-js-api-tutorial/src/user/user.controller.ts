import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('users')
export class UserController {
  constructor(private prismaService: PrismaService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() request: Request) {
    const { sub, email } = <{ sub: number; email: string }>request.user
    if (sub) {
      return this.prismaService.user.findUnique({
        where: {
          id: sub,
        },
        select: { email: true, firstName: true, lastName: true },
      })
    }
  }
}
