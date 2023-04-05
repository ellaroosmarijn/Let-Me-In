import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { Image } from '../../models/image'

import { fetchPlayContent } from '../actions/play'

export default function Play() {

  const [arr, setArr] = useState<Image[]>([
    {id: 1001, isWinning:false, imageUrl:'images/wrong1.gif' , uploaderId: "developers",  name:"placeholder-image", description: "placeholder-description" },
    {id: 1002, isWinning:false, imageUrl:'images/wrong2.gif', uploaderId: "developers",  name:"placeholder-image", description: "placeholder-description" },
    {id: 1003, isWinning:false, imageUrl:'images/wrong3.gif', uploaderId: "developers", name:"placeholder-image", description: "placeholder-description"  },
    {id: 1004, isWinning:false, imageUrl:'images/wrong4.gif', uploaderId: "developers", name:"placeholder-image", description: "placeholder-description"  },
    {id: 1005, isWinning:false, imageUrl:'images/wrong5.gif', uploaderId: "developers", name:"placeholder-image", description: "placeholder-description"  },
    {id: 1006, isWinning:false, imageUrl:'images/wrong6.gif', uploaderId: "developers", name:"placeholder-image", description: "placeholder-description"  },
    {id: 1007, isWinning:false, imageUrl:'images/wrong7.gif', uploaderId: "developers", name:"placeholder-image", description: "placeholder-description" },
    {id: 1008, isWinning:false, imageUrl:'images/wrong8.gif', uploaderId: "developers",  name:"placeholder-image", description: "placeholder-description" },
  ])

  const { loading, error, data } = useAppSelector((state) => state.play)
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently } = useAuth0()
  const dataArr = [...arr, data]
 
   useEffect(() => {
    async function dispatchFetchPlayContent() {
      const token = await getAccessTokenSilently()
      dispatch(fetchPlayContent(token))
       
    }

   dispatchFetchPlayContent()
  }, [dispatch, getAccessTokenSilently])

  return (
    <div className="play">
      <h1>Catchy Header</h1>
      {error && <p>{error}</p>}
      {loading && <img src="/loading.gif" alt="loading spinner" />}
      {dataArr.map((image)=>{
        return(<img key={image?.id} src={image?.imageUrl} alt="facedown cards" />) 
      })}
    </div>
  )
}
