import { Injectable } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  signup(user: AuthDto) {
    throw new Error('Method not implemented.')
  }
  signin(user: AuthDto) {
    throw new Error('Method not implemented.')
  }
}
