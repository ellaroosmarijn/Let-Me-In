import { Router } from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

import { getUploadsByUploaderId } from '../db/uploads'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    const userImgs = await getUploadsByUploaderId(auth0Id)

    res.json(userImgs)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router