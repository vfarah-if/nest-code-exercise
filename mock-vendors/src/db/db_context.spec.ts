import Mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { dbContext } from './db_context'
import { MongoMemoryServerOpts } from 'mongodb-memory-server-core/lib/MongoMemoryServer'
import { config } from '../config'

describe('dbContext', () => {
  let spyOnConnect: jest.SpyInstance<
      Promise<typeof Mongoose>,
      [uri: string, options?: Mongoose.ConnectOptions]
    >,
    spyMongoMemoryServerCreate: jest.SpyInstance<
      Promise<MongoMemoryServer>,
      [opts?: MongoMemoryServerOpts]
    >

  beforeAll(() => {
    spyOnConnect = jest.spyOn(Mongoose, 'connect')
    spyMongoMemoryServerCreate = jest.spyOn(MongoMemoryServer, 'create')
  })

  beforeEach(() => {
    spyOnConnect.mockReset()
    spyMongoMemoryServerCreate.mockReset()
  })

  it('should create a memory mongodb instance', async () => {
    await dbContext()

    expect(spyMongoMemoryServerCreate).toHaveBeenCalledTimes(1)
    expect(spyMongoMemoryServerCreate).toHaveBeenCalledWith({
      auth: {
        customRootName: config.dbUser,
        customRootPwd: config.dbPassword,
      },
      instance: {
        dbName: config.dbName,
        port: config.dbPort,
        auth: config.hasAuthDetails,
      },
    })
  })

  it('should call mongo connect with the environment setup', async () => {
    await dbContext()

    expect(Mongoose.connect).toBeCalledTimes(1)
    expect(Mongoose.connect).toBeCalledWith(config.dbUrl, {
      dbName: config.dbName,
      user: config.dbUser,
      pass: config.dbPassword,
      autoIndex: true,
      autoCreate: true,
    })
  })
})
