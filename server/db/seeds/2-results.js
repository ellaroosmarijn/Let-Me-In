exports.seed = async (knex) => {
  await knex('results').insert([
    {
      id: 1,
      auth0_id: 'google-oauth2|112183669155211890686',
      image_id: 1,
      created: new Date(Date.now()),
    },
    {
      id: 2,
      auth0_id: 'google-oauth2|112183669155211890686',
      image_id: 2,
      created: new Date(Date.now()),
    },
    {
      id: 3,
      auth0_id: 'google-oauth2|112183669155211890686',
      image_id: 3,
      created: new Date(Date.now()),
    },
    {
      id: 4,
      auth0_id: 'google-oauth2|112183669155211890686',
      image_id: 2,
      created: new Date(Date.now()),
    },
    {
      id: 5,
      auth0_id: 'google-oauth2|112183669155211890686',
      image_id: 3,
      created: new Date(Date.now()),
    },
    {
      id: 6,
      auth0_id: 'google-oauth2|112183669155211890686',
      image_id: 3,
      created: new Date(Date.now()),
    },
  ])
}
