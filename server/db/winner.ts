import connection from './connection'

module.exports = {
  addResults,
}

export interface Winner {
  auth0_id: string
  image_id: number
  created: string
}

// add results to database
export function addResults(winner: Winner, db = connection) {
  return db('results').insert(winner)
}

//
