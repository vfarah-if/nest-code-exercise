import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { AuthDto } from '../src/auth/dto'
import { userInfo } from 'os'

describe('App', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl(`http://localhost:3333/`)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Auth', () => {
    const user: AuthDto = {
      email: 'john.doe@test.com',
      password: 'P@ssword123',
      firstName: 'John',
      lastName: 'Doe',
    }

    const unauthorisedUser: AuthDto = {
      email: 'jane.doe@sketchy.com',
      password: 'P@ssword234',
      firstName: 'Jane',
      lastName: 'Doe',
    }

    describe('Signup', () => {
      it('should sign up with created status', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(user)
          .expectStatus(HttpStatus.CREATED)
          .stores('accessToken', 'accessToken')
      })

      it('should be forbidden to sign up twice', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(user)
          .expectStatus(HttpStatus.BAD_REQUEST)
          .withJson({
            statusCode: 403,
            message: 'Credentials invalid',
            error: 'Forbidden',
          })
      })

      it('should be fail with bad request with no auth details', () => {
        return pactum
          .spec()
          .post('auth/signup')
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
              'firstName should not be empty',
              'lastName must be a string',
              'lastName should not be empty',
            ],
            error: 'Bad Request',
          })
      })
    })

    describe('Signin', () => {
      it('should sign in with ok status', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody(user)
          .expectStatus(HttpStatus.OK)
      })

      it('should be unauthorised to sign in if not registered', () => {
        return pactum
          .spec()
          .post('auth/signin')
          .withBody(unauthorisedUser)
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectJsonLike({
            statusCode: 401,
            message: 'Credentials invalid',
            error: 'Unauthorized',
          })
      })
    })
  })

  describe('User', () => {
    const user: AuthDto = {
      email: 'john.doe@test.com',
      password: 'P@ssword123',
      firstName: 'John',
      lastName: 'Doe',
    }

    describe('Get current user', () => {
      it('should fail get current user if no bearer token assigned', () => {
        return pactum
          .spec()
          .get('users/me')
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectJsonLike({
            statusCode: 401,
            message: 'Unauthorized',
          })
      })

      it('should fail get current user if no bearer token assigned', () => {
        return pactum
          .spec()
          .get('users/me')
          .expectStatus(HttpStatus.UNAUTHORIZED)
          .expectJsonLike({
            statusCode: 401,
            message: 'Unauthorized',
          })
      })

      it('should succeed to get a current user if a valid bearer token is assigned', () => {
        return pactum
          .spec()
          .get('users/me')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .expectStatus(HttpStatus.OK)
          .expectJsonLike({
            email: 'john.doe@test.com',
            firstName: 'John',
            lastName: 'Doe',
          })
      })
    })

    describe('Edit user', () => {
      it('should pass when editing an existing user', () => {
        let alteredUser = { ...user, email: 'john.doe@alteredemailtest.com' }
        alteredUser.email = ''
        return pactum
          .spec()
          .put('users/me/1')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .withBody(alteredUser)
          .expectStatus(HttpStatus.OK)
          .expectJsonLike({
            email: 'john.doe@alteredemailtest.com',
            firstName: 'JOHN',
            lastName: 'DOE',
          })
      })
    })
  })
  describe('Bookmarks', () => {
    describe('Get bookmarks', () => {})
    describe('Get bookmark by id', () => {})
    describe('Edit bookmark', () => {})
    describe('Delete bookmark', () => {})
  })
})
