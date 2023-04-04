import { Router } from 'express'
import { getWinningImage } from '../db/play'
import checkJwt, { JwtRequest } from '../auth0'

const router = Router()

// GET '/api/v1/play'
router.get('/', checkJwt, async (req, res) => {
  // const auth0Id = req.auth?.sub
  //   if (!auth0Id) {
  //     console.error('No auth0Id')
  //     return res.status(401).send('Unauthorized')
  //   }
    
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
