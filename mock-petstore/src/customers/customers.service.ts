import { Injectable } from '@nestjs/common'
import Mockendpoint from '../db/models'

type ContactModel = {
  email: string
  firstName: string
  lastName: string
  mobileNumber: string
  dateOfBirth: string
  gender: string
}

@Injectable()
export class CustomersService {
  async getCustomers(): Promise<ContactModel> {
    const doc = await Mockendpoint.findOne({
      url: 'v1/customers',
      method: 'GET',
    }).select({
      jsonResponse: 1,
    })
    console.log(doc)
    return doc ? <ContactModel>doc['jsonResponse'] : undefined
  }
}
