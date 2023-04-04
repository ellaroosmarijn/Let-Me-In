import { Router } from 'express'
import { getResults } from '../db/results'
const router = Router()

export default router

// GET /results
router.get('/', async (req, res) => {
  try {
    const result = await getResults()
    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
