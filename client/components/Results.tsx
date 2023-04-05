import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchResults } from '../actions/results'
import { useAuth0 } from '@auth0/auth0-react'

export default function Results() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const results = useAppSelector((state) => state.results)
  const dispatch = useAppDispatch()
  console.log('user', user)

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      dispatch(fetchResults(token))
    }
    getAccess().catch(console.error)
  }, [dispatch, getAccessTokenSilently])

  return (
    <>
      <div className="results">
        {results.loading && (
          <img src="/assets/loading.gif" className="loader" alt="loading" />
        )}
        {results.error && <p role={'paragraph'}> {results.error} </p>}
        {isAuthenticated ? (
          <div>
            <div>
              {results.data ? (
                results.data.length !== 0 ? (
                  results.data.map((data) => {
                    return (
                      <>
                        <div>
                          <h1>Congrats on being Let In!</h1>
                          <img src={data.imageUrl} alt="derp" />
                          <p></p>
                        </div>
                      </>
                    )
                  })
                ) : (
                  <div>
                    <h1>{`If you don't play, you can't have any results. How can you have any results if you don't play?`}</h1>
                    <Link to="/play">
                      <button>Go Play!</button>
                    </Link>
                  </div>
                )
              ) : (
                <div>
                  <p>No data!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h1>{`If you don't log in, you can't have any results. How can you have any results if you don't log in?`}</h1>
              <Link to="/">
                <button>Go back Home and Log in!</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
