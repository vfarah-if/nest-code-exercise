import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  sigin() {
    return { auth: 'login' }
  }

  signup(user) {
    return `signup ${user}`
  }
}
