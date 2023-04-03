import { Router } from 'express'
import { getAllImages } from '../db/play'

const router = Router()

// GET '/api/v1/play'
router.get('/', async (req, res) => {
  try {
    const images = await getAllImages()
    res.json(images)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "There was an error trying to get the images"
    })
  }
})

export default router
