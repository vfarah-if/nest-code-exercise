import { Module } from '@nestjs/common';
import { HybrisController } from './hybris.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [HybrisController],
  imports: [AuthModule]
})
export class HybrisModule {}
