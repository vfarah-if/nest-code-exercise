export function customerFixture(): (
  | import('mongoose').Document<any, any, any>
  | {
      url: string
      method: string
      jsonResponse: {
        email: string
        firstName: string
        lastName: string
        mobileNumber: string
        dateOfBirth: string
        gender: string
      }
    }
)[] {
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
    },
  ]
}
