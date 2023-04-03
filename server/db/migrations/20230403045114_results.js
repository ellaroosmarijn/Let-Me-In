/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('results', (table) => {
    table.increments('id')
    table.string('auth0_id')
    table.integer('image_id').references('images.id')
    table.date('created')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('results')
}
