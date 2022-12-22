import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() user: AuthDto) {
    return this.authService.signup(user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() user: AuthDto) {
    return this.authService.signin(user)
  }
}
