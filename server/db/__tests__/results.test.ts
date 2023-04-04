import connection from '../connection'

import { getResults } from '../results'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getResults', () => {
  it('gets the results from the results table in the database.', async () => {
    // Arrange

    expect.assertions(5)

    // Act
    const results = await getResults('1')

    // Assert
    // Since the getResults() database function gets a random image
    // we can only assert that the Results has the correct properties
    console.log(results)
    expect(results[2].id).toBe(3)
    expect(results[1].auth0Id).toBe('1')
    expect(results[0].imageId).toBeDefined()
    expect(results).toHaveLength(3)
    expect(results[0].imageUrl).toBeDefined()
  })
})
