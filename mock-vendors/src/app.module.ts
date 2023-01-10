import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './customers/customers.module'
import { ContentstackModule } from './contentstack/contentstack.module'
import { SapModule } from './sap/sap.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    CustomersModule,
    ContentstackModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SapModule,
    HealthModule,
  ],
})
export class AppModule {}
