import request from 'superagent'
import { Image, ImageCreate } from '../../models/image'

async function addImage(imageData: ImageCreate, token: string): Promise<Image> {
  const result = await request
    .post('/api/v1/create')
    .set('Authorization', `Bearer ${token}`)
    .send(imageData)
  return result.body[0]
}

export default { addImage }
