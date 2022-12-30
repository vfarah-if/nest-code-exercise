import { Module } from '@nestjs/common'
import { ContentstackDeliveryModule } from './contentdelivery/contentdelivery.module'

@Module({
  imports: [ContentstackDeliveryModule],
})
export class ContentstackModule {}
