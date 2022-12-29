import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Version,
} from '@nestjs/common'
import { Response } from 'express'
import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  getCustomers(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return this.customerService.getCustomers(response)
  }
}
