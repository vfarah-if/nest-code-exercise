import { HttpStatus, Injectable } from '@nestjs/common'
import Mockendpoint from '../db/models'
import { Response } from 'express'

@Injectable()
export class CustomersService {
  async getCustomers(
    response: Response<any, Record<string, any>>,
  ): Promise<Response<any, Record<string, any>>> {
    const doc = await Mockendpoint.findOne({
      url: 'v1/customers',
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
          .json(doc['jsonResponse'])
      : response
          .status(HttpStatus.NOT_FOUND)
          .json({ data: 'Configure test to accept GET v1/customers' })
  }
}
