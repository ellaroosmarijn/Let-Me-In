import connection from './connection'
import { Image } from '../../models/image'

export function uploads(uploderId: string, db = connection):  Promise<Image[]>{
  return db('images')
    .where('uploader_id', uploderId)
    .select(
      'id',
      'uploader_id as uploaderId',
      'name',
      'description',
      'image_url as imageUrl'
    )
}
