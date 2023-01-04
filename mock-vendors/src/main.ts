require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './config'
import { closeDbContext, dbContext } from './db/db_context'
import { seedDb } from './db/seed'
const { port } = config

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
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
