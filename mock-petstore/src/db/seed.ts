import { contentStackFixture, customerFixture } from './fixtures'
import Mockendpoint from './models'

export async function seedDb(): Promise<void> {
  Promise.all([await seedCustomers(), await seedContentstack()])
}

export async function seedCustomers() {
  const response = await Mockendpoint.insertMany(customerFixture())
  console.debug('Populated customer mocks with', response)
  return response
}

export async function seedContentstack() {
  const response = await Mockendpoint.insertMany(contentStackFixture())
  console.debug('Populated content mocks with', response)
  return response
}
