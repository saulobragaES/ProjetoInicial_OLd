// Destructor, pego so o db que tem la no arquivo knexfile.js
const { db } = require('./.env')
module.exports = {
    client: 'mssql',
    connection: db,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }


};
