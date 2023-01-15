import { Module } from '@nestjs/common';
import { HybrisController } from './hybris.controller';
import { AuthModule } from './auth/auth.module';
import { HybrisService } from './hybris.service';

@Module({
  controllers: [HybrisController],
  imports: [AuthModule],
  providers: [HybrisService]
})
export class HybrisModule {}
