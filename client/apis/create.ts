import request from 'superagent'
import { ImageCreate } from '../../models/image'

export async function addImage(): Promise<Omit<ImageCreate, 'description'>> {
  const result = await request.post('/api/v1/create')
  return result.body
}
