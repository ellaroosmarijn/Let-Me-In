import { Router } from 'express'

import { addWinnerResults, getById } from '../db/winner'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const userInput = await addWinnerResults(req.body)
    const addedValue = await getById(userInput[0].id)
    return res.json(addedValue)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

export default router
