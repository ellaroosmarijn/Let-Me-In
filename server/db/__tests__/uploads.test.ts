import connection from '../connection'
import { getUploadsByUploaderId } from '../uploads'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getUserImage', () => {
  it('get the user uploaded images from the database', async () => {
    // Arrange
    expect.assertions(2)

    const user1Id = '1'
    const user2Id = '2'

    // Act
    const user1 = await getUploadsByUploaderId(user1Id)
    const user2 = await getUploadsByUploaderId(user2Id)

    // Assert
    expect(user1).toHaveLength(2)
    expect(user2).toHaveLength(2)
  })

  it('get image with properties right', async () => {
    expect.assertions(3)
    const user1Id = '1'

    const user = await getUploadsByUploaderId(user1Id)
    const userArray = [
      {
        id: 1,
        uploaderId: '1',
        name: 'Let Me In',
        description: 'LET ME INNNNNNNNNNNNNNN',
        imageUrl:
          'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif',
      },
      {
        id: 2,
        uploaderId: '1',
        name: 'Judge Judy',
        description: 'Judge Judy time',
        imageUrl:
          'https://media.tenor.com/vTY0qobiAtsAAAAC/judge-judy-time.gif',
      },
    ]

    expect(user[0]).toMatchObject(userArray[0])
    expect(user[1]).toMatchObject(userArray[1])
    expect(user).toEqual(userArray)
  })
})
