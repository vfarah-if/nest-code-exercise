import { Test, TestingModule } from '@nestjs/testing'
import { ContentstackController } from './contentstack.controller'
import { ContentstackService } from './contentstack.service'

describe('ContentstackController', () => {
  let controller: ContentstackController
  let service: ContentstackService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentstackService],
      controllers: [ContentstackController],
    }).compile()

    controller = module.get<ContentstackController>(ContentstackController)
    service = module.get<ContentstackService>(ContentstackService)
  })

  it('should have a controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('should have a service provider defined', () => {
    expect(service).toBeDefined()
  })
})
