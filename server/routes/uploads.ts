import { Router } from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

import { uploads } from '../db/uploads'

const router = Router()

router.get('/',checkJwt,async (req: JwtRequest, res)=> {

  // router.get('/:auth0Id',async (req, res)=> {
try{

  const auth0Id = req.auth?.sub
 
  // const auth0Id= req.params.auth0Id
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }
  const userImgs= await uploads(auth0Id)
  // console.log(userImgs)
  res.json(userImgs)

}catch (error) {
  console.error(error)
  res.sendStatus(500)
}


})


export default router
