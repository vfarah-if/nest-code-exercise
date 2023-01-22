import { Module } from '@nestjs/common'
import { LoggerModule } from '../logger/logger.module'
import { DbService } from './db.service'

@Module({
  providers: [DbService],
  imports: [LoggerModule],
})
export class DbModule {}
