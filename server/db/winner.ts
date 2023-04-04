import connection from './connection'

export interface Winner {
  auth0_id: string
  image_id: number
  created: string
}

// add results to database
export function addWinnerResults(winner: Winner, db = connection) {
  return db('results').insert(winner)
}

// get result by id
export function getById(id: number, db = connection) {
  return db('results').select().where({ id })
}
