import connection from './connection'
import { ImageCreate } from '../../models/image'

function addImage(imageData: ImageCreate, uploaderId: string, db = connection) {
  return db('images').insert({ ...imageData, uploader_id: uploaderId })
}

export default { addImage }
