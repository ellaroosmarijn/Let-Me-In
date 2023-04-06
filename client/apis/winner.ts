import request from 'superagent'

import { ResultCreate } from '../../models/result'

export async function saveResult(newResult: ResultCreate, token: string) {
  const response = await request.post('/api/v1/winner/').send(newResult).set('Authorization', `Bearer ${token}`)
  return response.body
}
