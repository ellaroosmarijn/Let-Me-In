import request from 'superagent'

import { ResultCreate } from '../../models/result'

export async function saveResult(newResult: ResultCreate) {
  const response = await request.post('/api/v1/winner/').send(newResult)
  return response.body
}
