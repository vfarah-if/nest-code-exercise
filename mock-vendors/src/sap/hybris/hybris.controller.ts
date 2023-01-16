import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { HybrisService } from './hybris.service'

@Controller()
export class HybrisController {
  constructor(private service: HybrisService) {}

  @HttpCode(HttpStatus.OK)
  @Get('json/transition/session-who-am-i')
  getWhoAmI(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Headers() headers?,
  ) {
    return this.service.getWhoAmI(request, response, headers)
  }
}
