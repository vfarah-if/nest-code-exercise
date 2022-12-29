import { HttpStatus, Injectable } from '@nestjs/common'
import { Response } from 'express'
import Mockendpoint from '../db/models'

@Injectable()
export class ContentstackService {
  async getEntries(
    response: Response<any, Record<string, any>>,
    contentTypeUid: string,
    environment: string,
    locale: string = 'en-gb',

    includeFallback: boolean = true,
    includeBranch: boolean = false,
  ): Promise<
    | import('express').Response<any, Record<string, any>>
    | PromiseLike<import('express').Response<any, Record<string, any>>>
  > {
    const url =
      `v3/content_types/${contentTypeUid}/entries?local=${locale}` +
      `&include_fallback=${includeFallback ? 'true' : 'false'}&include_branch=${
        includeBranch ? 'true' : 'false'
      }&environment=${environment}`
    console.debug('getEntries for ', url)
    const doc = await Mockendpoint.findOne({
      url,
      method: 'GET',
    }).select({
      jsonResponse: 1,
      httpStatus: 1,
    })
    console.log(doc)
    return (
      response
        // @ts-ignore
        .status(HttpStatus[doc['httpStatus']])
        .send(doc['jsonResponse'])
    )
  }
}
