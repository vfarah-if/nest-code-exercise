import { HttpStatus, Injectable } from '@nestjs/common'
import { Response } from 'express'
import Mockendpoint from '../../db/models'

interface getEntriesOptions {
  response: Response<any, Record<string, any>>
  contentTypeUid: string
  environment: string
  locale?: string
  includeFallback?: boolean
  includeBranch?: boolean
  headers?: any
}

@Injectable()
export class ContentDeliveryService {
  async getEntries({
    response,
    contentTypeUid,
    environment,
    locale = 'en-gb',
    includeFallback = true,
    includeBranch = false,
    headers = undefined,
  }: getEntriesOptions): Promise<
    | import('express').Response<any, Record<string, any>>
    | PromiseLike<import('express').Response<any, Record<string, any>>>
  > {
    const url =
      `v3/content_types/${contentTypeUid}/entries?locale=${locale}` +
      `&include_fallback=${String(includeFallback)}` +
      `&include_branch=${String(includeBranch)}` +
      `&environment=${environment}`
    const headerParams = headers['x-test']
      ? { 'x-test': headers['x-test'] }
      : undefined
    console.debug('Finding entries for ', url, 'Headers: ', headers)
    const doc = await Mockendpoint.findOne({
      url,
      method: 'GET',
      headerParams,
    }).select({
      jsonResponse: 1,
      httpStatus: 1,
    })
    console.log(doc)
    return doc
      ? response
          // @ts-ignore
          .status(HttpStatus[doc['httpStatus']])
          .json(doc['jsonResponse'])
      : response
          .status(HttpStatus.NOT_FOUND)
          .json({ data: `Configure test to accept GET ${url}` })
  }
}
