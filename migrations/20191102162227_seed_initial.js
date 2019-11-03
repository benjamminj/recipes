/// <reference path="../node_modules/knex/types/index.d.ts" />

exports.up = async function(knex) {
  await knex.raw('create extension if not exists "uuid-ossp"')
  return knex.schema.createTable('recipes', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name')
    table.integer('prepTime')
    table.integer('cookTime')
    // TODO: directions relationship
    // TODO: ingredients relationship
  })
}

exports.down = function(knex) {
  knex.raw('drop extension if exists "uuid-ossp"')
  return knex.schema.dropTable('recipes')
}
