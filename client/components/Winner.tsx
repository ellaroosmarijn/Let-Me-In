import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Navigate } from 'react-router-dom'

import { postResultAdd } from '../actions/winner'

export default function Winner() {
  const dispatch = useAppDispatch()
  const winStatus = useAppSelector((state) => state.play)

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
    <>
      <div className="winner-container">
        <h1 className="winner-heading">YOU WON! Here&apos;s a GIFt</h1>
        <div className="winner-image-caption">
          <img
            src={winStatus.data.image.imageUrl}
            alt={winStatus.data.image.description}
          />
          <h1 className="winner-caption">COME ON IN!</h1>
        </div>
      </div>
    </>
  )
}
