exports.seed = async (knex) => {
  await knex('images').insert([
    {
      id: 1,
      uploader_id: 'google-oauth2|104177402938278805058',
      name: 'Let Me In',
      description: 'LET ME INNNNNNNNNNNNNNN',
      image_url:
        'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif',
    },
    {
      id: 2,
      uploader_id: '1',
      name: 'Judge Judy',
      description: 'Judge Judy time',
      image_url: 'https://media.tenor.com/vTY0qobiAtsAAAAC/judge-judy-time.gif',
    },
    {
      id: 3,
      uploader_id: '2',
      name: 'One hour later',
      description: 'Two hours later, three hours later',
      image_url: '/images/hours-later-spongebob.gif',
    },
    {
      id: 4,
      uploader_id: '2',
      name: "It's me",
      description: 'Can you buzz me in?',
      image_url: '/images/can-you-buzz-me-in.gif',
    },
  ])
}
