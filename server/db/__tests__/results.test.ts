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
    expect.assertions(6)

    // Act
    const results = await getResults('1')

    // Assert
    expect(results[2].id).toBe(3)
    expect(results[1].auth0Id).toBe('1')
    expect(results[2].imageId).toBe(3)
    expect(results).toHaveLength(3)
    expect(results[0].imageUrl).toBe(
      'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif'
    )
    expect(results[1].description).toBe('Judge Judy time')
  })
})
