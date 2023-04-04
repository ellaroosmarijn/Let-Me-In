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

})





