import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { connect, disconnect, Mongoose } from 'mongoose'
import { config } from '../config'

const dbContext = async (): Promise<Mongoose> => {
  /*
   *  NOTE: If this is failing, you have not setup the .env
   *   file in the root of the project - see readme for more
   */
  const {
    dbUrl,
    dbName,
    dbUser,
    dbPassword,
    dbPort,
    isInMemoryDatabase,
    hasAuthDetails,
  } = config
  console.assert(dbUrl)
  console.assert(dbName)
  console.assert(dbPort)
  let uri = dbUrl
  let mongoDb = undefined
  if (isInMemoryDatabase) {
    // console.debug(
    //   `Preparing inMemoryDatabase ${dbName} on port ${dbPort} with user '${dbUser}'
    //  password '${dbPassword}'`,
    // )
    mongoDb = await MongoMemoryServer.create({
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
  }

  console.debug(
    `Connecting to Mongo database ${dbName} with user '${
      isInMemoryDatabase ? 'None' : dbUser
    }' on URL '${uri}'`,
  )

  const options = {
    dbName: dbName,
    user: dbUser,
    pass: dbPassword,
    autoIndex: true,
    autoCreate: true,
  }
  mongoose.set('strictQuery', false)
  return await connect(uri, options)
}

const closeDbContext = async (): Promise<void> => {
  return await disconnect()
}

export { dbContext, closeDbContext }
