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
})
