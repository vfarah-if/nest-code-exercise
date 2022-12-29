import {
  Controller,
  Get,
  Header,
  Param,
  Query,
  Res,
  Version,
} from '@nestjs/common'
import { Response } from 'express'
import { ContentstackService } from './contentstack.service'

@Controller('content_types')
export class ContentstackController {
  constructor(private service: ContentstackService) {}

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
  ): Promise<Response<any, Record<string, any>>> {
    return this.service.getEntries(
      response,
      contentTypeUid,
      environment,
      locale,
      includeFallback,
      includeBranch,
    )
  }
}
