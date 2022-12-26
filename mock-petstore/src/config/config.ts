const config = {
  port: parseInt(process.env.PORT || '4444', 10),
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isInMemoryDatabase:
    process.env.DATABASE_IN_MEMORY?.toLowerCase() === 'true' || true,
  dbPort: parseInt(process.env.DB_PORT || '27017', 10),
  dbUrl: process.env.DATABASE_URL,
  dbName: process.env.DATABASE_DBNAME || 'petstore',
  dbUser: process.env.DATABASE_USER,
  dbPassword: process.env.DATABASE_PASS,
}
// console.debug('.env config', config)
export { config }
