require('dotenv').config()
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import {
  setupApp,
  setupDatabase,
  setupSwagger,
  shutDown,
} from './infrastructure/setup'
import { config } from './config'
const { port } = config

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  setupApp(app)
  setupSwagger(app)
  await setupDatabase(app)
  await app.listen(port)
  process.on('close', async () => await shutDown(app, true))
  process.on('SIGTERM', async () => await shutDown(app, true))
  process.on('SIGINT', async () => await shutDown(app, true))
}

bootstrap()
