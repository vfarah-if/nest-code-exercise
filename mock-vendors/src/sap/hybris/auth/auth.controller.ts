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
    return await this.authService.signin(user, res)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date() })
    res.cookie('JSESSION', '', { expires: new Date() })
    res.cookie('jsession', '', { expires: new Date() })
  }
}
