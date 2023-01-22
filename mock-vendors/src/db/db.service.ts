import { Injectable } from '@nestjs/common'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { connect, Mongoose } from 'mongoose'
import mongodb from 'mongodb'

import { LoggerService } from '../logger/logger.service'
import { healthFixture } from './fixtures/health.fixture'
import Mockendpoint from './models/Mockendpoint'
import { config } from '../config'
import { seedDb } from './seed'

const {
  dbUrl,
  dbName,
  dbUser,
  dbPassword,
  dbPort,
  isInMemoryDatabase,
  hasAuthDetails,
} = config.database

@Injectable()
export class DbService {
  public memoryServer: MongoMemoryServer
  public connection: Mongoose
  constructor(private logger: LoggerService) {}

  async start(): Promise<void> {
    if (isInMemoryDatabase) {
      this.logger.log(
        `Preparing transient Mongo database ${dbName} on port ${dbPort}`,
      )
      this.memoryServer = await MongoMemoryServer.create({
        auth: {
          customRootName: dbUser,
          customRootPwd: dbPassword,
        },
        instance: {
          dbName,
          port: dbPort,
          auth: hasAuthDetails,
        },
      })
      this.logger.log('Memory database started', this.memoryServer.state)
    } else {
      this.logger.log(
        `Preparing database ${dbName} with user '${dbUser}' on URL '${dbUrl}'`,
      )
    }
    mongoose.set('strictQuery', false)
    this.connection = await connect(dbUrl, {
      dbName: dbName,
      user: dbUser,
      pass: dbPassword,
      autoIndex: true,
      autoCreate: true,
    })
    this.logger.log('Connection to Database now open')
    const seedResponse = await this.seed()
    this.logger.log('Finished seeding database', seedResponse)
  }

  async stop(): Promise<void> {
    if (this.memoryServer) {
      this.memoryServer.stop()
      this.logger.log('Memory Server is now stopped')
    }
    if (this.connection) {
      await this.connection.disconnect()
      this.logger.log('Database is now disconnected')
    }
  }

  private async seed(): Promise<any> {
    return Promise.all([
      await this.clearExistingMockendpoints(),
      await seedDb(),
    ])
  }

  private async clearExistingMockendpoints(): Promise<mongodb.DeleteResult> {
    return await Mockendpoint.deleteMany()
  }
}
