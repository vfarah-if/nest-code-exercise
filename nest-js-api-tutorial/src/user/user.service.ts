import { Injectable } from '@nestjs/common'
import { EditUserDto } from './dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUser(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true },
    })
  }

  update(id: number, user: EditUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: { ...user },
      select: { id: true, email: true, firstName: true, lastName: true },
    })
  }
}
