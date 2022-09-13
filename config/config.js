// {
//   "development": {
//     "database": "wabi_sketch_dev",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "database": "wabi_sketch_test",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "database": "wabi_sketch_production",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }

require('dotenv').config()
module.exports = {
  development: {
    database: 'wabi_sketch_dev',
    dialect: 'postgres'
  },
  test: {
    database: 'wabi_sketch_test',
    dialect: 'postgres'
  },
  production: {
    database: 'wabi_sketch_production',
    // use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
