import { Test, TestingModule } from '@nestjs/testing'
import { customerFixture, MockEndpointType } from '../db/fixtures'
import Mockendpoint from '../db/models'
import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'
import { Response } from 'express'
import { HttpStatus } from '@nestjs/common'
const mockingoose = require('mockingoose')

describe('CustomersController', () => {
  let controller: CustomersController
  let service: CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile()

    controller = module.get<CustomersController>(CustomersController)
    service = module.get<CustomersService>(CustomersService)
    mockingoose.resetAll()
  })

  it('should have controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('should have service defined', () => {
    expect(service).toBeDefined()
  })

  it('should get customers wth correct status and the correct json', async () => {
    // @ts-ignore
    const response: Response = {}
    const mockStatus = jest.fn().mockReturnValue(response)
    response.status = mockStatus
    const mockJson = jest.fn().mockReturnValue(response)
    response.json = mockJson
    const findOneResponse = <MockEndpointType>customerFixture()[0]
    mockingoose(Mockendpoint).toReturn(findOneResponse, 'findOne')

    await controller.getCustomers(response)

    expect(mockStatus).toBeCalledWith(HttpStatus[findOneResponse.httpStatus])
    expect(mockJson).toBeCalledWith(findOneResponse.jsonResponse)
  })
})
