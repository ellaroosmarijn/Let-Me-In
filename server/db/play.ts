import knexFile from './knexfile'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const connection = knex(config)

import { Image } from "../../models/image";

export function getAllImages ( db = connection ): Promise<Image[]> {
  return db('images').select()
}


// export function getRandomImage ( db = connection): Promise<Image> {
  // return db('images')
// }