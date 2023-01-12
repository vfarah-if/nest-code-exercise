import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, SignInDto } from './dto'

@Controller('sap/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() user: AuthDto) {
    return this.authService.signup(user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() user: SignInDto) {
    console.debug('user', user)
    return this.authService.signin(user)
  }
}
