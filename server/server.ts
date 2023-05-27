import express from 'express'
import { join, resolve } from 'node:path'

import homeRoutes from './routes/home'
import playRoutes from './routes/play'
import winnerRoutes from './routes/winner'
import resultsRoutes from './routes/results'
import createRoutes from './routes/create'
import uploadsRoutes from './routes/uploads'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, '..', 'dist', 'public')))

server.use('/api/v1/home', homeRoutes)
server.use('/api/v1/play', playRoutes)
server.use('/api/v1/winner', winnerRoutes)
server.use('/api/v1/results', resultsRoutes)
server.use('/api/v1/create', createRoutes)
server.use('/api/v1/uploads', uploadsRoutes)

server.get('*', (req, res) => {
  res.sendFile(resolve('dist/public/index.html'))
})

export default server
