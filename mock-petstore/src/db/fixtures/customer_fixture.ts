import { DocumentType, MockEndpointType } from './types'

export function customerFixture(): (DocumentType | MockEndpointType)[] {
  return [
    {
      url: 'v1/customers',
      method: 'GET',
      jsonResponse: {
        email: 'jane.doe@newlook.com',
        firstName: 'Jane',
        lastName: 'Doe',
        mobileNumber: '+44 797396 7029',
        dateOfBirth: '1974-11-04',
        gender: 'Male',
      },
      httpStatus: 'CREATED',
    },
  ]
}
