import connection from './connection'

import { Result } from '../../models/result'
export interface Winner {
  auth0_id: string
  image_id: number
  created: Date
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
