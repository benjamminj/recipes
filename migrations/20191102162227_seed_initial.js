/// <reference path="../node_modules/knex/types/index.d.ts" />

exports.up = async function(knex) {
  await knex.raw('create extension if not exists "uuid-ossp"')
  await knex.schema.createTable('recipes', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name')
    table.integer('prepTime')
    table.integer('cookTime')
    table.timestamps(true, true)
  })

  await knex.schema.createTable('ingredients', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.timestamps(true, true)
    table.string('name')

    table.uuid('recipeId')
    table
      .foreign('recipeId')
      .references('id')
      .inTable('recipes')

    table.integer('quantity')
    table.string('unit')
    table.string('notes')
  })

  return
}

exports.down = async function(knex) {
  await knex.schema.dropTable('ingredients')
  await knex.schema.dropTable('recipes')
  await knex.raw('drop extension if exists "uuid-ossp"')
  return
}
