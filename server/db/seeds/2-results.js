exports.seed = async (knex) => {
  await knex('results').insert([
    {
      id: 1,
      auth0_id: '1',
      image_id: 1,
      created: new Date(Date.now()),
    },
    {
      id: 2,
      auth0_id: '1',
      image_id: 2,
      created: new Date(Date.now()),
    },
    {
      id: 3,
      auth0_id: '1',
      image_id: 3,
      created: new Date(Date.now()),
    },
    {
      id: 4,
      auth0_id: '2',
      image_id: 2,
      created: new Date(Date.now()),
    },
    {
      id: 5,
      auth0_id: '2',
      image_id: 3,
      created: new Date(Date.now()),
    },
    {
      id: 6,
      auth0_id: '3',
      image_id: 3,
      created: new Date(Date.now()),
    },
  ])
}
