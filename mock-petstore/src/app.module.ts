import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './customers/customers.module'
import { ContentstackModule } from './contentstack/contentstack.module'

@Module({
  imports: [
    CustomersModule,
    ContentstackModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
