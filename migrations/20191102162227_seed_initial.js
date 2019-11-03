/// <reference path="../node_modules/knex/types/index.d.ts" />

exports.up = function(knex) {
  return knex.schema.createTable('recipes', table => {
    table.uuid('id')
    table.string('name')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('recipes')
}
