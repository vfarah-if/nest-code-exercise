import { Module } from '@nestjs/common';
import { ContentstackController } from './contentstack.controller';
import { ContentstackService } from './contentstack.service';

@Module({
  controllers: [ContentstackController],
  providers: [ContentstackService]
})
export class ContentstackModule {}
