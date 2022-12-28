import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './customers/customers.module'
import { ContentModule } from './content/content.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CustomersModule, ContentModule],
})
export class AppModule {}
