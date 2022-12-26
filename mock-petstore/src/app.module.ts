import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './customers/customers.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomersModule,
    PrismaModule,
  ],
})
export class AppModule {}
