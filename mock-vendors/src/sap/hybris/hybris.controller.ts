import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

@Controller()
export class HybrisController {
  @HttpCode(HttpStatus.OK)
  @Get('json/transition/session-who-am-i')
  getWhoAmI() {
    //cookieparse
    // parse for the details that can be passed in
  }
}

// /json/transition/session-who-am-i
