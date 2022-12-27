import { config } from './config'

describe('config', () => {
  beforeEach(() => {
    require('dotenv').config({
      path: '../../env.test',
    })
  })
  it('should configure defaults', () => {
    expect(config).toMatchSnapshot()
  })

  // DATABASE_URL="mongodb://127.0.0.1:27017/petstore?ssl=false&connectTimeoutMS=5000&maxPoolSize=50"
  // NODE_ENV='development'
  // DATABASE_PORT='27107'
  // DATABASE_IN_MEMORY=true
  // DATABASE_DBNAME='petstore'
  // DATABASE_USER=
  // DATABASE_PASS=
})
