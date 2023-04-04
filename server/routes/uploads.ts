import { Router } from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

import { uploads } from '../db/uploads'

const router = Router()

router.get('/uploads/:auth0Id', async (req, res)=> {
try{

  // const auth0Id = req.auth?.sub
  const auth0Id = req.params.auth0Id
  const userImgs= await uploads(auth0Id)
  res.json(userImgs)

}catch (error) {
  console.error(error)
  res.sendStatus(500)
}


})


export default router
