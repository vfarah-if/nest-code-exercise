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
    return (
      response
        // @ts-ignore
        .status(HttpStatus[doc['httpStatus']])
        .send(doc['jsonResponse'])
    )
  }
}
