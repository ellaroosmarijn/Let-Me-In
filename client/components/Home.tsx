import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchHomeImage } from '../actions/home'

export default function Home() {
  const homeImage = useAppSelector((state) => state.home)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchHomeImage())
  }, [dispatch])

  function imageClick() {
    dispatch(fetchHomeImage())
  }

  return (
    <div className="home">
      <h4>Welcome to Let Me In!</h4>
      <div>
        {homeImage.loading && (
          <img src="/assets/loading.gif" className="loader" alt="loading" />
        )}

        {homeImage.error && <p role={'paragraph'}>{homeImage.error}</p>}

        {homeImage.data ? (
          <div
            onClick={imageClick}
            onKeyDown={imageClick}
            role="button"
            tabIndex={0}
          >
            <img
              src={homeImage.data.imageUrl}
              alt={homeImage.data.description}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Link to="/play">
        <button>Start!</button>
      </Link>
    </div>
  )
}
