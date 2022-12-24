import { Injectable } from '@nestjs/common'

@Injectable()
export class CustomersService {
  getCustomers(): {
    email: string
    firstName: string
    lastName: string
    mobileNumber: string
    dateOfBirth: string
    gender: string
  } {
    return {
      email: 'jane.doe@newlook.com',
      firstName: 'Jane',
      lastName: 'Doe',
      mobileNumber: '+44 797396 7029',
      dateOfBirth: '1974-11-04',
      gender: 'Male',
    }
  }
}
