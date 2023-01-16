import { Test, TestingModule } from '@nestjs/testing'
import { healthFixture, MockEndpointType } from '../db/fixtures'
import Mockendpoint from '../db/models/Mockendpoint'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

const mockingoose = require('mockingoose')

describe('HealthController', () => {
  let controller: HealthController
  let service: HealthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile()

    controller = module.get<HealthController>(HealthController)
    service = module.get<HealthService>(HealthService)
    mockingoose.resetAll()
  })

  it('should have controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('should have service defined', () => {
    expect(service).toBeDefined()
  })

  it('should get a version and database health acknowledgment', async () => {
    const findOneResponse = <MockEndpointType>healthFixture()[0]
    mockingoose(Mockendpoint).toReturn(findOneResponse, 'findOne')

    const actual = await controller.getHealthCheck()

    expect(actual).toEqual({ database: 'Healthy', version: '0.0.1' })
  })
})
