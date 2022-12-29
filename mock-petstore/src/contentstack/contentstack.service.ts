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
      `v3/content_types/${contentTypeUid}/entries?locale=${locale}` +
      `&include_fallback=${String(includeFallback)}` +
      `&include_branch=${String(includeBranch)}` +
      `&environment=${environment}`
    console.debug('Finding entries for ', url)
    const doc = await Mockendpoint.findOne({
      url,
      method: 'GET',
    }).select({
      jsonResponse: 1,
      httpStatus: 1,
    })
    console.log(doc)
    return doc
      ? response
          // @ts-ignore
          .status(HttpStatus[doc['httpStatus']])
          .send(doc['jsonResponse'])
      : response
          .status(HttpStatus.NOT_FOUND)
          .send({ data: `Configure test to accept GET ${url}` })
  }
}
