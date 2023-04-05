import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'
import { Image } from '../../models/image'
import shuffle from 'fisher-yates'

import { fetchPlayContent } from '../actions/play'
import React from 'react'

export default function Play() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [shuffledArray, setShuffledArray] = useState<Image[]>([])
  const [activeCard, setActiveCard] = useState<boolean>(false)
  const [arr, setArr] = useState<Image[]>([
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
  ])

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
    const dataArr = [...arr, data]
    const newShuffledArray = shuffle(dataArr)
    setShuffledArray(newShuffledArray)
  }, [arr, data])

  function handleClick(index: number) {
    setActive(true)
    if (setActive) {
      setFlippedIndex(index)
      setTimeout(() => {
        setFlippedIndex(null)
        setActive(false)
      }, 2000)
    }
  }

  return (
    <div className="play">
      <h1>Catchy Header</h1>
      <div>
        {error && <p>{error}</p>}
        {loading && <img src="/loading.gif" alt="loading spinner" />}
        {shuffledArray.map((image, index) => {
          return (
            <div
              key={image?.id}
              className={flippedIndex === index ? 'flipped' : ''}
              onClick={() => handleClick(index)}
            >
              <div></div>
              <img key={image?.id} src={image?.imageUrl} alt="facedown cards" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
