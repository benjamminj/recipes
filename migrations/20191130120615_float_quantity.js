/// <reference path="../node_modules/knex/types/index.d.ts" />

exports.up = async function(knex) {
  await knex.raw(
    `ALTER TABLE "ingredients" ALTER COLUMN "quantity" type decimal(3,2);`
  )
}

exports.down = async function(knex) {
  await knex.raw(
    `ALTER TABLE "ingredients" ALTER COLUMN "quantity" type integer;`
  )
}
