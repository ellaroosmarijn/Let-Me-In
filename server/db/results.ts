import connection from './connection'
import { Result } from '../../models/result'

export function getResults(db = connection): Promise<Result[]> {
  return (
    db('results').join('images', 'results.image_id', 'images.id')
      .select('results.id', 'auth0_id as auth0Id', 'image_id as imageId', 'created', 'images.image_url as imageUrl')
  )
}
