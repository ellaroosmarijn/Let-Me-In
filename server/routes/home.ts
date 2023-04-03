import { Router } from 'express'

const router = Router()

import { getHomeImage } from '../db/home'

// GET /api/v1/home/
router.get('/', async (req, res) => {
  try {
    const homeImage = await getHomeImage()
    res.json(homeImage)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
