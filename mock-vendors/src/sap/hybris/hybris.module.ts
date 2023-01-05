import { Module } from '@nestjs/common';
import { HybrisController } from './hybris.controller';

@Module({
  controllers: [HybrisController]
})
export class HybrisModule {}
