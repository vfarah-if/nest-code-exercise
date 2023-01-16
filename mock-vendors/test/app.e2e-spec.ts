require('dotenv').config()
import { Test } from '@nestjs/testing'
import {
  HttpStatus,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import * as pactum from 'pactum'
import * as cookieParser from 'cookie-parser'

import { AppModule } from '../src/app.module'
import { seedDb } from '../src/db/seed'
import { closeDbContext, dbContext } from '../src/db/db_context'
import { config } from '../src/config'
import { AuthDto } from '../src/sap/hybris/auth/dto/auth.dto'
import { SignInDto } from 'src/sap/hybris/auth/dto'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.enableVersioning({
      type: VersioningType.URI,
    })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.use(cookieParser())
    const config = new DocumentBuilder()
      .setTitle('mock-vendors-api')
      .setDescription('Mock supported vendor endpoints with testing scenarios')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
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

  describe('Mock Vendor API', () => {
    describe('Health', () => {
      describe('GET Health', () => {
        it('should get a version for the health check', async () => {
          return await pactum
            .spec()
            .get('v1/health')
            .expectStatus(HttpStatus.OK)
            // TODO: Extend to check database health, which is a hood test for the database
            .expectJsonLike({
              version: 'Unknown',
            })
            .inspect()
        })
      })
    })

    describe('Swagger', () => {
      describe('GET docs', () => {
        it('should get a swagger docs api', async () => {
          return await pactum
            .spec()
            .get('docs')
            .expectStatus(HttpStatus.OK)
            .inspect()
        })

        it('should get a swagger as json', async () => {
          return await pactum
            .spec()
            .get('docs-json')
            .expectStatus(HttpStatus.OK)
            .inspect()
        })
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
              'v3/content_types/nl_homepage/entries?locale=en-fr' +
                `&include_fallback=true&include_branch=false&environment=${environment}`,
            )
            .expectStatus(HttpStatus.NOT_FOUND)
            .expectJsonLike({
              data: 'Configure test to accept GET v3/content_types/nl_homepage/entries?locale=en-fr&include_fallback=true&include_branch=false&environment=dev-sandbox',
            })
            .inspect()
        })
      })
    })
  })

  describe('SAP', () => {
    describe('Hybris', () => {
      describe('Auth', () => {
        const user: AuthDto = {
          email: 'john.doe@test.com',
          password: 'P@ssword123',
          firstName: 'John',
          lastName: 'Doe',
          other: {
            language: 'en',
            site: 'http://localhost:4444',
          },
        }

        const unauthorisedUser: SignInDto = {
          email: 'jane.doe@noauth.com',
          password: 'P@ssword123',
        }

        describe('Signup', () => {
          it('should sign up with created status', async () => {
            return await pactum
              .spec()
              .post('sap/auth/signup')
              .withBody(user)
              .expectStatus(HttpStatus.CREATED)
          })

          it('should be forbidden to sign up twice', async () => {
            return await pactum
              .spec()
              .post('sap/auth/signup')
              .withBody(user)
              .expectStatus(HttpStatus.BAD_REQUEST)
              .withJson({
                statusCode: 403,
                message: 'Credentials invalid',
                error: 'Forbidden',
              })
          })

          it('should be fail with bad request with no auth details', async () => {
            return await pactum
              .spec()
              .post('sap/auth/signup')
              .withBody({})
              .expectStatus(HttpStatus.BAD_REQUEST)
              .expectJsonLike({
                statusCode: 400,
                message: [
                  'email should not be empty',
                  'email must be an email',
                  'password must be a string',
                  'password should not be empty',
                  'firstName must be a string',
                  'lastName must be a string',
                ],
                error: 'Bad Request',
              })
          })
        })

        describe('Signin', () => {
          it('should sign in with ok status', () => {
            return pactum
              .spec()
              .post('sap/auth/signin')
              .withBody(user)
              .stores('accessToken', 'accessToken')
              .withCookies('token', '$S{accessToken}')
              .expectStatus(HttpStatus.OK)
          })

          it('should be unauthorised to sign in if not registered', () => {
            return pactum
              .spec()
              .post('sap/auth/signin')
              .withBody(unauthorisedUser)
              .expectStatus(HttpStatus.UNAUTHORIZED)
              .expectJsonLike({
                statusCode: 401,
                message: 'Credentials invalid',
                error: 'Unauthorized',
              })
          })
        })

        describe('Signout', () => {
          it('should always signout', () => {
            return pactum
              .spec()
              .post('sap/auth/signout')
              .expectStatus(HttpStatus.OK)
          })
        })

        describe('WhoAmI', () => {
          describe('When not signed in', () => {
            beforeAll(() => {
              pactum.spec().post('sap/auth/signout').expectStatus(HttpStatus.OK)
              // .inspect()
            })

            it('should ok an anonymous user by default', () => {
              return pactum
                .spec()
                .get('json/transition/session-who-am-i')
                .expectStatus(HttpStatus.OK)
                .expectJsonLike({
                  isSignedIn: false,
                  accessToken: {
                    access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
                    token_type: 'bearer',
                    expires_in: 286,
                    scope: 'default openid',
                  },
                })
                .withCookies('JSESSION', 'anonymous.app1-ee2')
              // .inspect()
            })

            it('should ok an anonymous user when explicitly assigned header', () => {
              return pactum
                .spec()
                .get('json/transition/session-who-am-i')
                .withHeaders('jsession', 'anonymous.app1-ee2')
                .expectStatus(HttpStatus.OK)
                .expectJsonLike({
                  isSignedIn: false,
                  accessToken: {
                    access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
                    token_type: 'bearer',
                    expires_in: 286,
                    scope: 'default openid',
                  },
                })
                .withCookies('JSESSION', 'anonymous.app1-ee2')
              // .inspect()
            })
          })

          describe('When signed in with JWT', () => {
            let cookie
            beforeAll(() => {
              return pactum
                .spec()
                .post('sap/auth/signin')
                .withBody({
                  email: 'john.doe@newlook.com',
                  password: 'P@ssw0rd123',
                })
                .expectStatus(HttpStatus.OK)
                .returns((ctx) => {
                  cookie = ctx.res.headers['set-cookie']
                  console.debug('COOKIEE', cookie)
                  return ctx.res.headers['set-cookie']
                })
            })

            it('should get a signed in user when auth token within cookie', () => {
              return pactum
                .spec()
                .get('json/transition/session-who-am-i')
                .expectStatus(HttpStatus.OK)
                .withCookies(cookie[0])
                .expectJsonLike({
                  isSignedIn: true,
                  accessToken: {
                    token_type: 'bearer',
                    scope: 'default openid',
                  },
                  customerData: {
                    firstName: 'John',
                    lastName: 'Doe',
                  },
                  newLookSessionData: {
                    country: 'GB',
                    currency: 'GBP',
                    storeId: 'uk-store',
                    department: 'Mens',
                    language: 'en',
                  },
                })
                .inspect()
            })
          })

          describe('When signing in with headers', () => {
            beforeAll(() => {
              // make sure there is no JWT token
              pactum.spec().post('sap/auth/signout').expectStatus(HttpStatus.OK)
              // .inspect()
            })

            it('should ok a logged in user', () => {
              return pactum
                .spec()
                .get('json/transition/session-who-am-i')
                .withHeaders('jsession', 'loggedin.app1-ee2')
                .expectStatus(HttpStatus.OK)
                .expectJsonLike({
                  isSignedIn: true,
                  accessToken: {
                    access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
                    token_type: 'bearer',
                    expires_in: 286,
                    scope: 'default openid',
                  },
                })
                .withCookies('JSESSION', 'loggedin.app1-ee2')
              // .inspect()
            })

            it('should expire a logged in user', () => {
              return pactum
                .spec()
                .get('json/transition/session-who-am-i')
                .withHeaders('jsession', 'expired.app1-ee2')
                .expectStatus(HttpStatus.GONE)
                .expectJsonLike({
                  isSignedIn: true,
                  accessToken: {
                    access_token: 'vIvfxOIwEyx4KB4WPDhR-ud0zM0',
                    token_type: 'bearer',
                    expires_in: 286,
                    scope: 'default openid',
                  },
                })
                .withCookies('JSESSION', 'expired.app1-ee2')
              // .inspect()
            })
          })
        })
      })
    })
  })
})
