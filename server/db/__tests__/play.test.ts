import connection from '../connection'

import { getWinningImage } from '../play'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getWinningImage', () => {
  it('gets the winning image from the database.', async () => {
    // Arrange
    expect.assertions(5)

    // Act
    const winningImage = await getWinningImage(connection)
    
    //Assert
    expect(winningImage.id).toBeDefined()
    expect(winningImage.uploaderId).toBeDefined()
    expect(winningImage.name).toBeDefined()
    expect(winningImage.description).toBeDefined()
    expect(winningImage.imageUrl).toBeDefined()
  })
})
