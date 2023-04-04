import knexFile from './knexfile'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const connection = knex(config)

import { Image } from '../../models/image'


export async function getWinningImage( db = connection): Promise<Image> {
  return db('images')
  .orderByRaw('RANDOM()')
  .select(
    'id',
    'uploader_id as uploaderId',
    'name',
    'description',
    'image_url as imageUrl'
  )
  .first()
}

