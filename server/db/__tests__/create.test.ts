import connection from '../connection'
import db from '../create'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('addImage', () => {
  it('should add new image and returns id and image URL', async () => {
    const newImageData = {
      name: 'Test Name',
      description: 'Test Description',
      imageUrl: 'https://test.jpg',
    }
    const uploaderId = 'testID'
    const addedimage = await db.addImage(newImageData, uploaderId)
    const imageData = await connection('images').select()

    expect(imageData).toHaveLength(5)
    expect(imageData[4].image_url).toBe('https://test.jpg')
    expect(addedimage).toEqual([{ id: 5, image_url: 'https://test.jpg' }])
  })
})
