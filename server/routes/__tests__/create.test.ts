import request from 'supertest'
//import express from 'express'
import checkJwt from '../../auth0'
import { JwtRequest } from '../../auth0'
jest.mock('../../auth0')
import server from '../../server'
import db from '../../db/create'
jest.mock('../../db/create')

jest.mocked(checkJwt).mockImplementation(async (req: JwtRequest, res, next) => {
  req.auth = {
    sub: 'auth0|123',
  }
  next()
})

describe('/api/v1/create', () => {
  const newImageData = {
    name: 'Test Name',
    description: 'Test Description',
    imageUrl: 'https://test.jpg',
  }

  const addImageResponse = {
    id: 12,
    image_url: 'https://test.jpg',
  }

  jest.mocked(db.addImage).mockResolvedValue([addImageResponse])

  it('should return an id and a url', async () => {
    jest.mocked(db.addImage).mockResolvedValue([addImageResponse])
    const actual = await request(server)
      .post('/api/v1/create')
      .send(newImageData)
    expect(actual.body[0].id).toBe(12)
    expect(actual.body[0].image_url).toBe('https://test.jpg')
  })

  it('should call addImage with an image object and an Auth0 id', async () => {
    jest.mocked(db.addImage).mockResolvedValue([addImageResponse])
    await request(server).post('/api/v1/create').send(newImageData)
    expect(db.addImage).toHaveBeenCalledWith(newImageData, 'auth0|123')
  })

  it('should display an error message if the DB function fails and returns an error', async () => {
    jest
      .mocked(db.addImage)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const actual = await request(server)
      .post('/api/v1/create')
      .send(newImageData)
    console.log(actual.text)
    expect(actual.text).toBe('Whoops, something went wrong')
  })

  it('should display an custom error message if the DB function fails and does not return an error', async () => {
    jest.mocked(db.addImage).mockRejectedValue('Whoops, something went wrong')
    const actual = await request(server)
      .post('/api/v1/create')
      .send(newImageData)
    console.log(actual.text)
    expect(actual.text).toBe('An unknown error has occurred')
  })
})
