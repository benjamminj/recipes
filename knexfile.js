require('dotenv').config()

let pg = require('pg')
// TODO: can we remove or senable?
pg.defaults.ssl = process.env.NODE_ENV === 'production'

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
}
