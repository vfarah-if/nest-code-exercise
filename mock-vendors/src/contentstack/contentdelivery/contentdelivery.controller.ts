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
import {
  ApiAcceptedResponse,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger'
import { Response } from 'express'
import { config } from '../../config'
import { ContentDeliveryService } from './contentdelivery.service'

@Controller('content_types')
export class ContentDeliveryController {
  constructor(private service: ContentDeliveryService) {}

  @Version('3')
  @Get('/:contentTypeUid/entries')
  @Header('Content-Type', 'application/json')
  @ApiOperation({
    description: 'Contentstack Delivery API for entries',
    summary: 'Get All Entries from content stack',
  })
  @ApiParam({
    name: 'contentTypeUid',
    required: true,
    type: String,
    description: 'Content Type Identifier',
  })
  @ApiQuery({
    name: 'locale',
    required: false,
    type: String,
    description:
      'Enter the code of the language of which the entries needs to be included. ' +
      'Only the entries published in this locale will be displayed. ' +
      'en-gb (default)',
  })
  @ApiQuery({
    name: 'environment',
    required: false,
    type: String,
    description:
      'Enter the name of the environment of which the entries needs to be included.' +
      'Default is what is configured in the env variables.',
  })
  @ApiQuery({
    name: 'include_branch',
    required: false,
    type: Boolean,
    description:
      'Set this to true to include the _branch top-level key in the response. ' +
      'This key states the unique ID of the branch where the concerned Contentstack module resides. ' +
      'Default is false.',
  })
  @ApiQuery({
    name: 'include_fallback',
    required: false,
    type: Boolean,
    description:
      "Enter 'true' to include the published localized content from the fallback locale when the " +
      'specified locale does not contain published content. Default is true.',
  })
  @ApiAcceptedResponse({
    status: 200,
    type: Array,
    isArray: true,
    description: 'List of Contentstack Entries',
  })
  @ApiHeader({
    required: false,
    name: 'x-test',
    example: 'UNAUTHORIZED',
    description: 'Will return any http status assigned',
  })
  async getEntries(
    @Param('contentTypeUid') contentTypeUid: string,
    @Res() response: Response,
    @Query('locale') locale?: string,
    @Query('environment') environment?: string,
    @Query('include_fallback') includeFallback?: boolean,
    @Query('include_branch') includeBranch?: boolean,
    @Headers() headers?,
  ): Promise<Response<any, Record<string, any>>> {
    // console.debug(
    //   'From Controller',
    //   headers,
    //   contentTypeUid,
    //   environment || config.contentStackDeliveryApi.environment,
    //   locale,
    //   includeFallback,
    //   includeBranch,
    // )
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
