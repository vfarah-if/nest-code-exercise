import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/decorator'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('users')
export class UserController {
  constructor(private prismaService: PrismaService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  //   getMe(@Req() request: Request) {
  getMe(@GetUser('sub') sub: number) {
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
