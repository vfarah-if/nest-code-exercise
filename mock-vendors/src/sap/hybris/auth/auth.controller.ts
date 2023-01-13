import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthDto, SignInDto } from './dto'

@Controller('sap/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() user: AuthDto) {
    console.debug(user)
    return this.authService.signup(user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Res({ passthrough: true }) res: Response,
    @Body() user: SignInDto,
  ) {
    console.debug('user', user)
    const data = await this.authService.signin(user)
    res.cookie('token', data, { httpOnly: true })
    return data
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date() })
  }
}
