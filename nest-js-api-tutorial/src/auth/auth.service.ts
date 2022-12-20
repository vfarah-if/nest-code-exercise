import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  login() {
    return { auth: 'login' };
  }

  signup() {
    return 'signup';
  }
}
