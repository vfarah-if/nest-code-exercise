import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from '../logger/logger.module'
import { DbService } from './db.service'
import Mockendpoint from './models/Mockendpoint'

describe('DbService integration test', () => {
  let service: DbService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService],
      imports: [LoggerModule],
    }).compile()

    service = module.get<DbService>(DbService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('When starting and stopping the database', () => {
    beforeEach(async () => {
      try {
        await service.start()
      } catch (error) {
        console.error(error)
      }
    }, 10000)

    afterEach(async () => {
      await service.stop()
    }, 10000)

    it('should create a mongodb instance with seeded data', async () => {
      expect(service.connection).toBeDefined()
      expect(service.memoryServer).toBeDefined()
      expect(service.memoryServer.state).toBe('running')
      expect(await Mockendpoint.count()).toBeGreaterThanOrEqual(1)
    })
  })
})
