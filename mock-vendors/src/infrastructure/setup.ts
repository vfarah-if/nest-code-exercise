import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { DbService } from '../db/db.service'
import { LoggerService } from '../logger/logger.service'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('mock-vendors-api')
    .setDescription('Mock supported vendor endpoints with testing scenarios')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  const logger = app.get(LoggerService)
  logger.log('Mapped Swagger API {/docs} {/docs-json}')
}

export async function setupDatabase(app: INestApplication): Promise<void> {
  const dbService = app.get(DbService)
  await dbService.start()
}

export function setupApp(app: INestApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.use(cookieParser())
}

export async function shutDown(
  app: INestApplication,
  canExitProcess = false,
): Promise<void> {
  const dbService = app.get(DbService)
  await dbService.stop()
  await app.close()
  if (canExitProcess) {
    process.exit(0)
  }
}
