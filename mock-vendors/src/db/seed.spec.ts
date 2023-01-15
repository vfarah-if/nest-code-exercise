import { contentStackFixture, whoamiFixture, sapUsersFixture } from './fixtures'
import Mockendpoint from './models/Mockendpoint'
import { seedContentstack, seedSapWhoami, seedSapUsers } from './seed'
import { addSapUser } from './services'
jest.mock('./services')

const mockingoose = require('mockingoose')

describe('Seed', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  describe('seedContentstack', () => {
    it('should seed content stack data into mongodb', async () => {
      mockingoose(Mockendpoint).toReturn(contentStackFixture(), 'insertMany')

      await seedContentstack()

      expect(Mockendpoint.insertMany).toBeCalled()
    })
  })

  describe('seedSapWhoami', () => {
    it('should seed who-am-i data into mongodb', async () => {
      mockingoose(Mockendpoint).toReturn(whoamiFixture(), 'insertMany')

      await seedSapWhoami()

      expect(Mockendpoint.insertMany).toBeCalled()
    })
  })

  describe('seedSapUsers', () => {
    it('should seed sap users into mongodb', async () => {
      await seedSapUsers()

      sapUsersFixture().forEach((expectedUser) =>
        expect(addSapUser).toBeCalledWith(expectedUser),
      )
    })
  })
})
