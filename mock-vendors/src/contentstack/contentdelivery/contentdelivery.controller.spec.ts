import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Response } from 'express'
import { contentStackFixture, MockEndpointType } from '../../db/fixtures'
import Mockendpoint from '../../db/models'
import { ContentDeliveryController } from './contentdelivery.controller'
import { ContentDeliveryService } from './contentdelivery.service'
const mockingoose = require('mockingoose')

describe('ContentDeliveryController', () => {
  let controller: ContentDeliveryController
  let service: ContentDeliveryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDeliveryService],
      controllers: [ContentDeliveryController],
    }).compile()

    controller = module.get<ContentDeliveryController>(
      ContentDeliveryController,
    )
    service = module.get<ContentDeliveryService>(ContentDeliveryService)
    mockingoose.resetAll()
  })

  it('should have a controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('should have a service provider defined', () => {
    expect(service).toBeDefined()
  })

  it('should get contentstack entities with the correct status and the correct json', async () => {
    // @ts-ignore
    const response: Response = {}
    const mockStatus = jest.fn().mockReturnValue(response)
    response.status = mockStatus
    const mockJson = jest.fn().mockReturnValue(response)
    response.json = mockJson
    const findOneResponse = <MockEndpointType>contentStackFixture()[0]
    mockingoose(Mockendpoint).toReturn(findOneResponse, 'findOne')

    await controller.getEntries('nl_homepage', response)

    expect(mockStatus).toBeCalledWith(HttpStatus[findOneResponse.httpStatus])
    expect(mockJson).toBeCalledWith(findOneResponse.jsonResponse)
  })

  it('should get contentstack not found seful message for the tester to create missing scneario', async () => {
    // @ts-ignore
    const response: Response = {}
    const mockStatus = jest.fn().mockReturnValue(response)
    response.status = mockStatus
    const mockJson = jest.fn().mockReturnValue(response)
    response.json = mockJson
    mockingoose(Mockendpoint).toReturn(null, 'findOne')

    await controller.getEntries('nl_homepage', response)

    expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND)
    expect(mockJson).toBeCalledWith({
      data: 'Configure test to accept GET v3/content_types/nl_homepage/entries?locale=en-gb&include_fallback=true&include_branch=false&environment=test-sandbox',
    })
  })
})
