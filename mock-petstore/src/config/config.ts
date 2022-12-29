const DEFAULT_DB_PORT = '27017'
const DEFAULT_PORT = '4444'
const DEV_NODE_ENV = 'development'
const PROD_NODE_DEV = 'production'
const TEST_NODE_EV = 'test'
const DEFAULT_DB_NAME = 'petstore'
const config = {
  port: parseInt(process.env.PORT || DEFAULT_PORT, 10),
  isDev: process.env.NODE_ENV === DEV_NODE_ENV,
  isProd: process.env.NODE_ENV === PROD_NODE_DEV,
  isTest: process.env.NODE_ENV === TEST_NODE_EV,
  isInMemoryDatabase:
    process.env.DATABASE_IN_MEMORY?.toLowerCase() === 'true' || true,
  dbPort: parseInt(process.env.DB_PORT || DEFAULT_DB_PORT, 10),
  dbUrl: process.env.DATABASE_URL,
  dbName: process.env.DATABASE_DBNAME || DEFAULT_DB_NAME,
  dbUser: process.env.DATABASE_USER,
  dbPassword: process.env.DATABASE_PASS,
  hasAuthDetails:
    process.env.DATABASE_USER || process.env.DATABASE_PASS ? true : false,
}
// console.debug('.env config', config)
export { config }
