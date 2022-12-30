import { Module } from '@nestjs/common'
import { ContentDeliveryController } from './contentdelivery.controller'
import { ContentDeliveryService } from './contentdelivery.service'

@Module({
  controllers: [ContentDeliveryController],
  providers: [ContentDeliveryService],
})
export class ContentstackDeliveryModule {}
