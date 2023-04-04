import connection from './connection'
import { Result } from '../../models/result'

export function getResults(db = connection): Promise<Result> {
  return db('results')
    // .orderByRaw('RANDOM()')
    .select('id', 'auth0_id as auth0Id', 'image_id as imageId', 'created')
    
}
