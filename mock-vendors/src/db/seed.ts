import { contentStackFixture, customerFixture } from './fixtures'
import Mockendpoint from './models/Mockendpoint'
import { addSapUser } from './services'

export async function seedDb(): Promise<any> {
  return Promise.all([
    await seedCustomers(),
    await seedContentstack(),
    await seedSAPContacts(),
  ])
}

export async function seedCustomers() {
  return await Mockendpoint.insertMany(customerFixture())
}

export async function seedContentstack() {
  return await Mockendpoint.insertMany(contentStackFixture())
}

export async function seedSAPContacts() {
  // TODO: Extract to fixtures
  const users = [
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
  return Promise.all(users.map(async (user) => await addSapUser(user)))
}
