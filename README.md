# Nest JS Exercise
- Go through the basics and share any links. 
- Install CLI globally `npm install -g @nestjs/cli`
- Create a new project by running `nest new <Name> `
- For all the nest CLI usages see https://docs.nestjs.com/cli/usages
  - `nest g service/module/controller <entity>`
- For database connection using an ORM use [**Prisma**](https://www.prisma.io/docs/getting-started/quickstart)
  - `npx prisma --help`
  - `npx prisma init` to initialise prisma settings
  - `npx prisma migrate dev`to generate initial migration

- Install config for global use
  - `@nestjs/config`

- Install JWT
  - `yarn add @nestjs/passport passport passport-local`
  - `yarn add -D @types/passport-local`
- For e2e testing an API use [Pactum](https://pactumjs.github.io/) or SuperTest
- For manipulating the environment variables, use `yarn add -D dotenv-cli `

# Useful Videos

- NestJs Course for Beginners - Create a REST API @ https://www.youtube.com/watch?v=GHTA143_b-s

# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
