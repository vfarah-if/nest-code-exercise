import { Module } from '@nestjs/common'
import { CustomersModule } from './v1/customers/customers.module'

@Module({
  imports: [CustomersModule],
})
export class AppModule {}
