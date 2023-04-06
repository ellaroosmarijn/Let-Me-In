import connection from './connection'

import { Result } from '../../models/result'
export interface Winner {
  auth0_id: string
  image_id: number
  created: string
}

export function addWinnerResults(
  winner: Winner,
  db = connection
): Promise<Result[]> {
  return db('results').insert(winner, [
    'id',
    'auth0_id as auth0Id',
    'image_id as imageId',
    'created',
  ])
}

// get result by id
export function getById(id: number, db = connection) {
  return db('results').select().where({ id })
}
