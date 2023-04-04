import request from 'superagent'
import { ImageCreate } from '../../models/image'

async function addImage(
  imageData: ImageCreate
): Promise<Omit<ImageCreate, 'description'>> {
  const result = await request.post('/api/v1/create').send(imageData)
  return result.body
}

export default { addImage }
