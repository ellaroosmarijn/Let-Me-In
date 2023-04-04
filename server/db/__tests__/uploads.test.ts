import connection from "../connection";
import { uploads } from "../uploads";

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
  
  // Act
  // first we get the user imges Uploads('1' || "2")
  const user1 = await uploads('1')
  const user2 = await uploads('2')

  console.log(user1)
  // Assert
  // we can check for length 
  expect(user1).toHaveLength(2)
  expect(user2).toHaveLength(2)


 
 
 
 
 
  }) 

  it('get image with properties right', async()=>{

    expect.assertions(3)
    const user = await uploads('1')
    const obj1= {
      id: 1,
      uploaderId: '1',
      name: 'Let Me In',
      description: 'LET ME INNNNNNNNNNNNNNN',
      imageUrl: 'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif'
    }
    const obj2=  {
      id: 2,
      uploaderId: '1',
      name: 'Judge Judy',
      description: 'Judge Judy time',
      imageUrl: 'https://media.tenor.com/vTY0qobiAtsAAAAC/judge-judy-time.gif'
    }
    const userArray =  [
      {
        id: 1,
        uploaderId: '1',
        name: 'Let Me In',
        description: 'LET ME INNNNNNNNNNNNNNN',
        imageUrl: 'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif'
      },
      {
        id: 2,
        uploaderId: '1',
        name: 'Judge Judy',
        description: 'Judge Judy time',
        imageUrl: 'https://media.tenor.com/vTY0qobiAtsAAAAC/judge-judy-time.gif'
      }
    ]

    expect(user[0]).toMatchObject(obj1)
    expect(user[1]).toMatchObject(obj2)
    expect(user).toEqual(userArray)

  })

})





