import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Navigate } from 'react-router-dom'

import { postResultAdd } from '../actions/winner'

export default function Winner() {
  const dispatch = useAppDispatch()
  const winStatus = useAppSelector((state) => state.play)
  console.log(winStatus)

  useEffect(() => {
    async function ifImage() {
      return dispatch(postResultAdd(winStatus.data.image))
    }

    function ifNoImage() {
      return <Navigate to="/play" />
    }
    if (winStatus.data.image.id) {
      ifImage()
    } else {
      ifNoImage()
    }
  }, [dispatch, winStatus.data.image])

  return (
    <div className="display-image">
      <h1>YOU ARE A WINNER</h1>
      <img
        src={winStatus.data.image.imageUrl}
        alt={winStatus.data.image.description}
      />
    </div>
  )
}
