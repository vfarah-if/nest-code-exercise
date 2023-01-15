import { DocumentType, SapUserType } from '../types'

export function sapUsersFixture(): (
  | SapUserType
  | {
      email: string
      password: string
      firstName: string
      lastName: string
      other: {
        country: string
        currency: string
        storeId: string
        department: string
        language: string
        cart?: undefined
      }
    }
)[] {
  return [
    {
      email: 'jane.doe@newlook.com',
      password: 'P@ssw0rd123',
      firstName: 'Jane',
      lastName: 'Doe',
      other: {
        currency: 'GBP',
        storeId: 'uk-store',
        department: 'Womans',
        language: 'en',
        cart: 'cb2c71af-ff36-42f5-88a4-b1ebc4df7e11',
      },
    },
    {
      email: 'john.doe@newlook.com',
      password: 'P@ssw0rd123',
      firstName: 'John',
      lastName: 'Doe',
      other: {
        country: 'GB',
        currency: 'GBP',
        storeId: 'uk-store',
        department: 'Mens',
        language: 'en',
      },
    },
  ]
}
