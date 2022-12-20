import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: AuthDto) {
    console.log('Body', data)
    return this.authService.signup(data)
  }

  @Post('signin')
  signin() {
    return this.authService.sigin()
  }
}
