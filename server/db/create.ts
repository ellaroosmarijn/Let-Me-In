import connection from './connection'
import { ImageCreate } from '../../models/image'

function addImage(imageData: ImageCreate, uploaderId: string, db = connection) {
  const { name, description, imageUrl } = imageData
  return db('images')
    .insert({ name, description, image_url: imageUrl, uploader_id: uploaderId })
    .returning(['id', 'image_url'])
}

export default { addImage }
