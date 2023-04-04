import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import request from 'supertest'
import { TokenExpiredError } from 'jsonwebtoken'
import createJWKSMock from 'mock-jwks'
import express from 'express'
const app = express()

const client = jwksClient({
  jwksUri: 'https://bendevacademy.au.auth0.com/.well-known/jwks.json',
})
const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err)
      return
    }
    const signingKey = key.getPublicKey()
    callback(null, signingKey)
  })
}

const verifyAuth0Token = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }

      resolve(decoded)
    })
  })
}

describe('/api/v1/create', () => {
  const jwks = createJWKSMock('https://bendevacademy.au.auth0.com/')
  const newImageData = {
    name: 'Test Name',
    description: 'Test Description',
    imageUrl: 'https://test.jpg',
  }
  beforeEach(() => {})

  it('should not allow adding to the database if not authorised', async () => {
    const actual = await request(app).post('/api/v1/create').send(newImageData)
    console.log(actual)
    expect(actual).toBe(1)
  })
  it.todo('should allow adding to the data base if authorised')
  it.todo('should return an error message if the DB function fails')
  it.todo('should return an id and url for an image if successful')
})

// const app = require('../app')
// const response = await request(app).get('/');

// https://codeburst.io/unit-test-token-verification-for-auth0-using-jest-and-mock-jwks-2c8488df97d6

// describe("Auth Test", () => {
//   const jwks = createJWKSMock("https://MYAUTH0APP.auth0.com/");

//   beforeEach(() => {
//     jwks.start();
//   });

//   afterEach(() => {
//     jwks.stop();
//   });
// });
