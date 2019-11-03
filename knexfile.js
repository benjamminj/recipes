require('dotenv').config()

let pg = require('pg')
// TODO: can we remove or enable?
// pg.defaults.ssl = true

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
}
