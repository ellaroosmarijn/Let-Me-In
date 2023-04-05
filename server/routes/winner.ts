import { Router } from 'express'

import { addWinnerResults } from '../db/winner'

import checkJwt, { JwtRequest } from '../auth0'

const router = Router()

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    const imageId = req.body.imageId as number

    if (!imageId || !auth0Id) {
      res.sendStatus(400)
      return
    }

    const objectToInsert = {
      auth0_id: auth0Id,
      image_id: imageId,
      created: new Date(),
    }

    const [result] = await addWinnerResults(objectToInsert)
    return res.json(result)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

export default router
