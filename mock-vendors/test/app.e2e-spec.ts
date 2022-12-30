require('dotenv').config()
import { Test } from '@nestjs/testing'
import { HttpStatus, INestApplication, VersioningType } from '@nestjs/common'
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module'
import { seedDb } from '../src/db/seed'
import { closeDbContext, dbContext } from '../src/db/db_context'
import { config } from '../src/config'

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
    await dbContext()
    await seedDb()

    pactum.request.setBaseUrl('http://localhost:4444/')
  })

  afterAll(async () => {
    await closeDbContext()
    await app.close()
  })

  describe('Customers', () => {
    describe('GET Customers', () => {
      it('should get customers', async () => {
        return await pactum
          .spec()
          .get('v1/customers')
          .expectStatus(HttpStatus.CREATED)
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

  describe('Contentstack', () => {
    describe('Content Delivery', () => {
      describe('GET Entries', () => {
        it('should get entities with success', async () => {
          const { environment } = config.contentStackDeliveryApi
          return await pactum
            .spec()
            .get(
              'v3/content_types/nl_homepage/entries?locale=en-gb' +
                `&include_fallback=true&include_branch=false&environment=${environment}`,
            )
            .expectStatus(HttpStatus.OK)
            .expectJsonLike({
              entries: [
                {
                  _version: 18,
                  locale: 'en-gb',
                  uid: 'bltc11602372b9095e3',
                  _in_progress: false,
                },
              ],
            })
            .inspect()
        })

        it('should get entities with unauthorised test error', async () => {
          const { environment } = config.contentStackDeliveryApi
          return await pactum
            .spec()
            .get(
              'v3/content_types/nl_homepage/entries?locale=en-gb' +
                `&include_fallback=true&include_branch=false&environment=${environment}`,
            )
            .withHeaders('X-Test', 'UNAUTHORIZED')
            .expectStatus(HttpStatus.UNAUTHORIZED)
            .expectJsonLike({
              error: 'Unauthorised',
            })
            .inspect()
        })

        it('should get entities with notfound test warning if the scenario is not configured or expected', async () => {
          const { environment } = config.contentStackDeliveryApi
          return await pactum
            .spec()
            .get(
              'v3/content_types/nl_homepage/entries?locale=en-us' +
                `&include_fallback=true&include_branch=false&environment=${environment}`,
            )
            .expectStatus(HttpStatus.NOT_FOUND)
            .expectJsonLike({
              data: 'Configure test to accept GET v3/content_types/nl_homepage/entries?locale=en-us&include_fallback=true&include_branch=false&environment=dev-sandbox',
            })
            .inspect()
        })
      })
    })
  })
})