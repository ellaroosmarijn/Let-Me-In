import connection from '../connection'

import { addWinnerResults } from '../winner'

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
  created: new Date(1630565951299),
}

describe('addWinnerResults', () => {
  it('adds a winner result to the results database', async () => {
    const resultAddedId = await addWinnerResults(testData, connection)
    expect(resultAddedId[0].id).toBe(7)
  })
})
