import { Controller, Get, HttpCode, HttpStatus, Version } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private service: HealthService) {}

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  getHealthCheck() {
    return this.service.getHealthCheck()
  }
}
