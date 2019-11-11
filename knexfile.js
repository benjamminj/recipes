require('dotenv').config()

let pg = require('pg')
pg.defaults.ssl = true

process.env.DATABASE_URL

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
}
