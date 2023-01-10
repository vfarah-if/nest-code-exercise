import { Controller, Get, HttpCode, HttpStatus, Version } from '@nestjs/common'
import { config } from '../config'

@Controller('health')
export class HealthController {
  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  getHealthCheck() {
    return { version: config.version }
  }
}
