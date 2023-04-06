import { useState, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { Image } from '../../models/image'
import { useNavigate } from "react-router-dom"
import shuffleArray from '../helpers/playLib'
import { fetchPlayContent } from '../actions/play'

export default function Play() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [shuffledArray, setShuffledArray] = useState<Image[]>([])
  const [activeCard, setActiveCard] = useState<boolean>(false)
  const [headerText, setHeaderText] = useState<string>('Click on a Square to Find the Winning Meme!')
  
  const navigate = useNavigate()
  const { loading, error, data } = useAppSelector((state) => state.play)
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function dispatchFetchPlayContent() {
      const token = await getAccessTokenSilently()
      dispatch(fetchPlayContent(token))
    }

    dispatchFetchPlayContent()
  }, [dispatch, getAccessTokenSilently])
  
  useEffect(() => {
    const arr = [
      {
        id: 1001,
        isWinning: false,
        imageUrl: 'images/wrong1.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1002,
        isWinning: false,
        imageUrl: 'images/wrong2.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1003,
        isWinning: false,
        imageUrl: 'images/wrong3.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1004,
        isWinning: false,
        imageUrl: 'images/wrong4.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1005,
        isWinning: false,
        imageUrl: 'images/wrong5.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1006,
        isWinning: false,
        imageUrl: 'images/wrong6.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1007,
        isWinning: false,
        imageUrl: 'images/wrong7.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
      {
        id: 1008,
        isWinning: false,
        imageUrl: 'images/wrong8.gif',
        uploaderId: 'developers',
        name: 'placeholder-image',
        description: 'placeholder-description',
      },
    ]
    const updatedData = {...data, isWinning: true}
    const dataArr = [...arr, updatedData] as Image[]
    const newShuffledArray = shuffleArray(dataArr) as Image[]
    setShuffledArray(newShuffledArray)
  }, [data])

function handleClick(index: number, image: Image) {  
  if(image.isWinning) {
      setActiveCard(true)
    setFlippedIndex(index)
    setHeaderText('You Found the Correct Meme!')
    setTimeout(() => {
      navigate('/winner')
    }, 2000)
  } else if (flippedIndex === null && !activeCard) {
      setActiveCard(true)
      setFlippedIndex(index)
      setHeaderText('Wrong One, Try Again!')
      setTimeout(() => {
      setFlippedIndex(null)
      setActiveCard(false)
      setHeaderText('Click on a Square to Find the Winning Meme!')
    }, 2000)
  }
  }

  return (
    <div className="play">
      <h1>{headerText}</h1>
      <div>
        {error && <p>{error}</p>}
        {loading ? ( <img src="assets/loading.gif" alt="loading spinner" />) : (
        <div>
        {shuffledArray.map((image, index) => {
          return (
            <div
              key={index}
              className={flippedIndex === index ? 'flipped' : ''}
              onClick={() => handleClick(index, image)}
              onKeyDown={(event) =>{if(event.key === 'Enter'){ handleClick(index, image)}}}
              tabIndex={0}
              role ='button'
              >
              <div></div>
              <img src={image?.imageUrl} alt="facedown cards" />
            </div>
          )
        })}
        </div>
        )}
      </div>
    </div>
  )
}
