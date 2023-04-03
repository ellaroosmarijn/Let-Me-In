import connection from '../connection'

import { getHomeImage } from '../home'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getHomeImage', () => {
  it('gets the contenders from the contenders table in the database.', async () => {
    // Arrange
    expect.assertions(5)

    // Act
    const homeImage = await getHomeImage()

    // Assert
    // Since the getHomeImage() database function gets a random image
    // we can only assert that the homeImage has the correct properties
    expect(homeImage.id).toBeDefined()
    expect(homeImage.uploaderId).toBeDefined()
    expect(homeImage.name).toBeDefined()
    expect(homeImage.description).toBeDefined()
    expect(homeImage.imageUrl).toBeDefined()
  })
})
