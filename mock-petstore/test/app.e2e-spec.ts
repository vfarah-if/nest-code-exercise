import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication, VersioningType } from '@nestjs/common'
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    })
    await app.init()
    await app.listen(4444)
    pactum.request.setBaseUrl('http://localhost:4444/')
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET Customers', () => {
    it('should get customers', () => {
      return pactum
        .spec()
        .get('v1/customers')
        .expectStatus(HttpStatus.OK)
        .expectJsonLike({
          email: 'jane.doe@newlook.com',
          firstName: 'Jane',
          lastName: 'Doe',
          mobileNumber: '+44 797396 7029',
          dateOfBirth: '1974-11-04',
          gender: 'Male',
        })
        .inspect()
    })
  })
})
