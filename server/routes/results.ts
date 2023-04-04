import { Router } from 'express'
import { getResults } from '../db/results'
import checkJwt, {JwtRequest}from '../auth0'
const router = Router()

export default router

// GET /results
router.get('/', checkJwt, async (req:JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if(!auth0Id ){
      console.error('No auth0Id')
      return res.status(401).json({error: 'Unauthorized'})
    }
    const result = await getResults(auth0Id)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})
