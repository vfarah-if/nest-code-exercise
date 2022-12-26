import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { config } from 'src/config'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const { dbUrl: url } = config
    super({
      datasources: {
        db: {
          url,
        },
      },
    })
  }

  async cleanDb() {
    await this.mockendpoint.deleteMany()
  }
}
