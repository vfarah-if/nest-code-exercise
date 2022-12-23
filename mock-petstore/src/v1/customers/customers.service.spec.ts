import { Test, TestingModule } from '@nestjs/testing'
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

  it('should get customers', () => {
    expect(service.getCustomers()).toStrictEqual({
      email: 'jane.doe@newlook.com',
      firstName: 'Jane',
      lastName: 'Doe',
      mobileNumber: '+44 797396 7029',
      dateOfBirth: '1974-11-04',
      gender: 'Male',
    })
  })
})
