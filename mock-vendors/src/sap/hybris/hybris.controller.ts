import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common'
import { Request } from 'express'
import { HybrisService } from './hybris.service'

@Controller()
export class HybrisController {
  constructor(private service: HybrisService) {}

  @HttpCode(HttpStatus.OK)
  @Get('json/transition/session-who-am-i')
  getWhoAmI(@Req() req: Request) {
    return this.service.getWhoAmI(req)
  }
}
