require('dotenv').config()
import { ValidationPipe } from '@nestjs/common'
import { VersioningType } from '@nestjs/common/enums/version-type.enum'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { config } from './config'
import { closeDbContext, dbContext } from './db/db_context'
import { seedDb } from './db/seed'

const { port } = config

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
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
  try {
    await dbContext()
    console.debug('Connection to Mongo open')
    const seedResponse = await seedDb()
    console.debug('Finished seeding data', seedResponse)
  } catch (error) {
    const warningMessage = `Unable to connect to the local Mongo 
    (Make sure configured inside the .env file correctly)`
    console.warn(warningMessage, error)
  }
  await app.listen(port)
}

process.on('close', shutDown)
process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
async function shutDown(): Promise<void> {
  await closeDbContext()
  console.log('Closed out remaining connections')
  process.exit(0)
}

bootstrap()
