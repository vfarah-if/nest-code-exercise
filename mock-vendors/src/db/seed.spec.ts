import { contentStackFixture, customerFixture } from './fixtures'
import Mockendpoint from './models/Mockendpoint'
import { seedContentstack, seedCustomers } from './seed'
const mockingoose = require('mockingoose')

describe('Seed', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  describe('seedCustomers', () => {
    it('should seed customer data into mongodb', async () => {
      mockingoose(Mockendpoint).toReturn(customerFixture(), 'insertMany')

      await seedCustomers()

      expect(Mockendpoint.insertMany).toBeCalled()
    })
  })

  describe('seedContentstack', () => {
    it('should seed content stack data into mongodb', async () => {
      mockingoose(Mockendpoint).toReturn(contentStackFixture(), 'insertMany')

      await seedContentstack()

      expect(Mockendpoint.insertMany).toBeCalled()
    })
  })
})
