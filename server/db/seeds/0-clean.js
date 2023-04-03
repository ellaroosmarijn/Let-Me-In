exports.seed = async (knex) => {
  await knex('results').del()
  await knex('images').del()
}
