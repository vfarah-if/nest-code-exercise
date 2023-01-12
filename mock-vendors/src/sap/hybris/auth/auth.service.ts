import { ForbiddenException, Injectable } from '@nestjs/common'
import { AuthDto, SignInDto } from './dto'
import { addSapUser } from '../../../db/services/addSapUser'

@Injectable()
export class AuthService {
  async signup(user: AuthDto) {
    try {
      return await addSapUser(user)
    } catch (error) {
      console.warn('ERROROROROR', typeof error, error)
      // if(error instanceof MongoServerError)
      if (error.code === '11000') {
        throw new ForbiddenException('Credentials taken')
      }
      throw error
    }
  }

  signin(user: SignInDto) {
    throw new Error('Method not implemented.')
  }
}
