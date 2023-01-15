import { contentStackFixture, sapUsersFixture, whoamiFixture } from './fixtures'

import Mockendpoint from './models/Mockendpoint'
import { addSapUser } from './services'

export async function seedDb(): Promise<any> {
  return Promise.all([
    await seedContentstack(),
    await seedSapUsers(),
    await seedSapWhoami(),
  ])
}

export async function seedContentstack() {
  return await Mockendpoint.insertMany(contentStackFixture())
}

export async function seedSapWhoami() {
  return await Mockendpoint.insertMany(whoamiFixture())
}

export async function seedSapUsers() {
  return Promise.all(
    sapUsersFixture().map(async (user) => await addSapUser(user)),
  )
}
