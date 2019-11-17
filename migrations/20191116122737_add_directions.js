/// <reference path="../node_modules/knex/types/index.d.ts" />

exports.up = async function(knex) {
  await knex.schema.table('recipes', table => {
    table.jsonb('directions').defaultTo('"[]"')
  })
}

exports.down = async function(knex) {
  await knex.schema.table('recipes', table => {
    table.dropColumn('directions')
  })
}
