import { HttpStatus, Res } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { response, Response } from 'express'
import { customerFixture, DocumentType, MockEndpointType } from '../db/fixtures'
import Mockendpoint from '../db/models'
import { CustomersService } from './customers.service'

describe('CustomersService', () => {
  let service: CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile()

    service = module.get<CustomersService>(CustomersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // it.only('should get customers', async () => {
  //   const result = customerFixture()[0]
  //   // @ts-ignore
  //   jest.spyOn(Mockendpoint, 'findOne').mockReturnValue(result)
  //   const actual = await service.getCustomers()
  //   expect(actual).toBeDefined()
  // })
  // it('should get customers', () => {
  //   expect(service.getCustomers()).toStrictEqual({
  //     email: 'jane.doe@newlook.com',
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     mobileNumber: '+44 797396 7029',
  //     dateOfBirth: '1974-11-04',
  //     gender: 'Male',
  //   })
  // })
})
