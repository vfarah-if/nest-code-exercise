import {
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Query,
  Res,
  Version,
} from '@nestjs/common'
import { Response } from 'express'
import { config } from '../../config'
import { ContentDeliveryService } from './contentdelivery.service'

@Controller('content_types')
export class ContentDeliveryController {
  constructor(private service: ContentDeliveryService) {}

  @Version('3')
  @Get('/:contentTypeUid/entries')
  @Header('Content-Type', 'application/json')
  async getEntries(
    @Param('contentTypeUid') contentTypeUid: string,
    @Res() response: Response,
    @Query('locale') locale?: string,
    @Query('environment') environment?: string,
    @Query('include_fallback') includeFallback?: boolean,
    @Query('include_branch') includeBranch?: boolean,
    @Headers() headers?,
  ): Promise<Response<any, Record<string, any>>> {
    console.debug(
      'From Controller',
      headers,
      contentTypeUid,
      environment || config.contentStackDeliveryApi.environment,
      locale,
      includeFallback,
      includeBranch,
    )
    return this.service.getEntries({
      response,
      contentTypeUid,
      environment: environment || config.contentStackDeliveryApi.environment,
      locale,
      includeFallback,
      includeBranch,
      headers,
    })
  }
}
