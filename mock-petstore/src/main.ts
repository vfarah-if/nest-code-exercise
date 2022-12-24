import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  // Uncomment if you want to run Mocker framework
  // await runOpenApiMocker()
  // Comment if you want to run Mocker framework
  await app.listen(4444)

  async function runOpenApiMocker() {
    const options = {
      port: 4444,
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
bootstrap()
