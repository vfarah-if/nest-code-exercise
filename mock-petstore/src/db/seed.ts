import { customerFixture } from './fixtures'
import Mockendpoint from './models'

export async function seedDb(): Promise<void> {
  Promise.all(await seedCustomers())
}

export async function seedCustomers() {
  const response = await Mockendpoint.insertMany(customerFixture())
  console.debug('Populated customer mocks with', response)
  return response
}
