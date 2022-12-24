import { Controller, Get, Version } from '@nestjs/common'
import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  @Version('1')
  getCustomers() {
    return this.customerService.getCustomers()
  }
}
