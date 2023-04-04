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
    expect.assertions(4)

    // Act
    const results = await getResults()

    // Assert
    // Since the getResults() database function gets a random image
    // we can only assert that the Results has the correct properties
    expect(results.id).toBeDefined()
    expect(results.auth0Id).toBeDefined()
    expect(results.imageId).toBeDefined()
    expect(results.created).toBeDefined()
  })
})
