require('dotenv').config()

const pg = require('pg')
pg.defaults.ssl = process.env.NODE_ENV === 'production'

process.env.DATABASE_URL

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
}
