import { Router } from 'express'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import db from '../db/create'

const router = Router()

router.post('/', async (req: JwtRequest, res) => {
  try {
    const auth0Id = 'bananas'
    //req.auth?.sub
    console.log(auth0Id)
    if (auth0Id) {
      const result = await db.addImage(req.body, auth0Id)
      return res.json(result)
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.send(err.message)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})

export default router
