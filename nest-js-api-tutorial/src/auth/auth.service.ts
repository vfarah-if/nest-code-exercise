import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { auth: 'login' };
  }

  signup() {
    return 'signup';
  }
}
