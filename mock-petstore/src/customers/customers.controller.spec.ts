import { Test, TestingModule } from '@nestjs/testing'
import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'

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
  })

  it('should have controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('should have service defined', () => {
    expect(service).toBeDefined()
  })

  it.todo('should get customers')

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
