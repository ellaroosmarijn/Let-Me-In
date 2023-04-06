import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Navigate } from 'react-router-dom'

import { postResultAdd } from '../actions/winner'

export default function Winner() {
  const dispatch = useAppDispatch()
  const winStatus = useAppSelector((state) => state.play)

  useEffect(() => {
    async function ifImage() {
      if (winStatus.data) {
        return dispatch(postResultAdd(winStatus.data))
      }
    }

    function ifNoImage() {
      return <Navigate to="/play" />
    }
    if (winStatus.data) {
      ifImage()
    } else {
      ifNoImage()
    }
  }, [dispatch, winStatus.data])

  return (
    <>
      <div className="winner-container">
        <h1 className="winner-heading">YOU WON! Here&apos;s a GIFt</h1>
        <div className="winner-image-caption">
          {winStatus.data && (
            <img
              src={winStatus.data.imageUrl}
              alt={winStatus.data.description}
            />
          )}
          <h1 className="winner-caption">COME ON IN!</h1>
        </div>
      </div>
    </>
  )
}
