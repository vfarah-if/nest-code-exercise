import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: AuthDto) {
    console.log('Body', user)
    return this.authService.signup(user)
  }

  @Post('signin')
  signin() {
    return this.authService.sigin()
  }
}
