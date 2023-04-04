import connection from './connection'

import { Image } from '../../models/image'

export async function getWinningImage(db = connection): Promise<Image> {
  return db('images')
    .orderByRaw('RANDOM()')
    .select(
      'id',
      'uploader_id as uploaderId',
      'name',
      'description',
      'image_url as imageUrl'
    )
    .first()
}
