import { contentStackFixture, customerFixture } from './fixtures'
import Mockendpoint from './models'

export async function seedDb(): Promise<any> {
  return Promise.all([await seedCustomers(), await seedContentstack()])
}

export async function seedCustomers() {
  return await Mockendpoint.insertMany(customerFixture())
}

export async function seedContentstack() {
  return await Mockendpoint.insertMany(contentStackFixture())
}
