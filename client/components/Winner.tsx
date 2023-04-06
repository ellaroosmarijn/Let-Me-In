import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'

import { postResultAdd } from '../actions/winner'
import { useAuth0 } from '@auth0/auth0-react'

export default function Winner() {
  const dispatch = useAppDispatch()
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const winStatus = useAppSelector((state) => state.play)

  useEffect(() => {
    async function ifImage() {
      if (winStatus.data) {
        const token = await getAccessTokenSilently()
        return dispatch(postResultAdd(winStatus.data, token))
      }
    }

    function ifNoImage() {
      return navigate('/play')
    }
    if (winStatus.data) {
      ifImage()
    } else {
      ifNoImage()
    }
  }, [dispatch, getAccessTokenSilently, navigate, winStatus.data])

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
