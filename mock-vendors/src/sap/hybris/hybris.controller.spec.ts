import { Test, TestingModule } from '@nestjs/testing'
import { AuthModule } from './auth/auth.module'
import { HybrisController } from './hybris.controller'
import { HybrisService } from './hybris.service'

describe('HybrisController', () => {
  let controller: HybrisController
  let service: HybrisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HybrisController],
      providers: [HybrisService],
      imports: [AuthModule],
    }).compile()

    controller = module.get<HybrisController>(HybrisController)
    service = module.get<HybrisService>(HybrisService)
  })

  it('should have controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('should have service defined', () => {
    expect(service).toBeDefined()
  })

  it.todo('should getWhoAmI from a token')

  it.todo(
    'should getWhoAmI from a header allowing anoymous data to be returned',
  )

  it.todo(
    'should getWhoAmI from a header allowing logged in data to be returned',
  )

  it.todo('should getWhoAmI from a header showing expiration of the session')
})
