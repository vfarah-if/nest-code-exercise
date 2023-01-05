import { Module } from '@nestjs/common'
import { HybrisModule } from './hybris/hybris.module';

@Module({
  imports: [HybrisModule]
})
export class SapModule {}
