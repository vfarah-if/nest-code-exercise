require('dotenv').config()
import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './config'
import { closeDbContext, dbContext } from './db/db_context'
import { seedDb } from './db/seed'
const { port } = config

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  dbContext()
    .then(() => {
      console.log('Connection to Mongo open')
      // seed test data
      seedDb()
    })
    .catch((error) => {
      const warningMessage = `Unable to connect to the local Mongo 
      (Make sure configured inside the .env file correctly)`
      console.warn(warningMessage, error)
    })
  // Uncomment if you want to run Mocker framework
  // await runOpenApiMocker()
  // Comment if you want to run Mocker framework
  await app.listen(port)

  async function runOpenApiMocker() {
    const options = {
      port: port,
      schema: './assets/customer-api.json',
      watch: true,
      servers: app,
    }
    const OpenApiMocker = require('open-api-mocker')
    const mocker = new OpenApiMocker(options)
    await mocker.validate()
    await mocker.mock()
  }
}

process.on('close', shutDown)
process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
function shutDown() {
  closeDbContext().then(() => {
    console.log('Closed out remaining connections')
    process.exit(0)
  })
}

bootstrap()
