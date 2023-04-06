import { Router } from 'express'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import db from '../db/create'

const router = Router()

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (auth0Id) {
      const newImage = await db.addImage(req.body, auth0Id)
      return res.json(newImage)
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.sendStatus(500)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})

export default router
