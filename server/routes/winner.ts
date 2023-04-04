import { Router } from 'express'

import { addWinnerResults, getById } from '../db/winner'

const router = Router()

router.post('/', async (req, res) => {
  const userInput = await addWinnerResults(req.body)
  const addedValue = await getById(userInput[0])
  return res.json(addedValue)
})

export default router
