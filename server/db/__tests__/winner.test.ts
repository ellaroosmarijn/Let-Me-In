import connection from '../connection'

import { addWinnerResults, getById } from '../winner'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

const testData = {
  auth0_id: '3',
  image_id: 2,
  created: '1630565951299',
}

describe('addWinnerResults', () => {
  it('adds a winner result to the results database', async () => {
    const resultAddedId = await addWinnerResults(testData, connection)
    expect(resultAddedId[0].id).toBe(7)
  })
})

describe('get result by ID', () => {
  it('gets a speciic result that has a matching ID', async () => {
    const id = 5
    const resultId = await getById(id, connection)
    expect(resultId[0].auth0_id).toBe('2')
    expect(resultId[0].image_id).toBe(3)
  })
})
