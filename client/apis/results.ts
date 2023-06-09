import request from 'superagent'
import { JoinedResult } from '../../models/result'

const rootUrl = '/api/v1/results'

export async function getResults(token: string): Promise<JoinedResult[]> {
  const response = await request
    .get(rootUrl)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
