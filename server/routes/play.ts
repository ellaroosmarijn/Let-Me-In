import { Router } from 'express'
import { getWinningImage } from '../db/play'
import checkJwt from '../auth0'

const router = Router()

// GET '/api/v1/play'
router.get('/', checkJwt, async (req, res) => {
  try {
    const winningImage = await getWinningImage()
    res.json(winningImage)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the image',
    })
  }
})

export default router
