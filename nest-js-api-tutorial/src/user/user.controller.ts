import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { EditUserDto } from '../user/dto'
import { GetUser } from '../auth/decorator'
import { UserService } from './user.service'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  //   getMe(@Req() request: Request) {
  getMe(@GetUser('sub') id: number) {
    return this.userService.getUser(id)
  }

  @HttpCode(HttpStatus.OK)
  @Patch('me')
  editMe(@GetUser('sub') id: number, @Body() user: EditUserDto) {
    return this.userService.update(id, user)
  }
}
