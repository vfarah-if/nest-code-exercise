import { Module } from '@nestjs/common'
import { ContentstackModule } from './contentstack/contentstack.module'
import { SapModule } from './sap/sap.module'
import { HealthModule } from './health/health.module'
import { LoggerModule } from './logger/logger.module'
import { DbModule } from './db/db.module'

@Module({
  imports: [
    ContentstackModule,
    SapModule,
    HealthModule,
    LoggerModule,
    DbModule,
  ],
})
export class AppModule {}
