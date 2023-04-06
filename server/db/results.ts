import connection from './connection'
import { JoinedResult } from '../../models/result'

export function getResults(
  auth0Id: string,
  db = connection
): Promise<JoinedResult[]> {
  return db('results')
    .join('images', 'results.image_id', 'images.id')
    .where('auth0_id', auth0Id)
    .select(
      'results.id',
      'auth0_id as auth0Id',
      'image_id as imageId',
      'created',
      'images.image_url as imageUrl',
      'images.description as description'
    )
}
