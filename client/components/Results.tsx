// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchResults } from '../actions/results'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent } from 'react'

export default function Results() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0()
  const results = useAppSelector((state) => state.results)
  const dispatch = useAppDispatch()

  const handleSignIn = () => {
    loginWithRedirect()
  }

  function handleKeyDownLogin(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault()
    if (e.code == 'Enter') {
      loginWithRedirect()
    }
  }

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      dispatch(fetchResults(token))
    }
    getAccess().catch(console.error)
  }, [dispatch, getAccessTokenSilently])
  return (
    <>
      <div className="resultsHeader">
        <h1>Congrats on being let in!</h1>
      </div>
      <div className="results">
        {results.loading && (
          <img src="/assets/loading.gif" className="loader" alt="loading" />
        )}
        {results.error && <p role="paragraph"> {results.error} </p>}
        {isAuthenticated ? (
          <>
            <div className="resultsData">
              {results.data ? (
                results.data.length !== 0 ? (
                  results.data.map((data) => {
                    return (
                      <div key={data.id} className="resultsImage">
                        <h4>{data.description}</h4>
                        <img
                          src={data.imageUrl}
                          alt={data.description}
                          className="resultsImg"
                        />
                      </div>
                    )
                  })
                ) : (
                  <div>
                    <h4>{`If you don't play, you can't have any results. How can you have any results if you don't play?`}</h4>
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
          </>
        ) : (
          <div>
            <div>
              <h4>{`If you don't log in, you can't have any results. How can you have any results if you don't log in?`}</h4>
              <div
                onClick={handleSignIn}
                onKeyDown={handleKeyDownLogin}
                role="button"
                tabIndex={0}
              >
                Go Login!
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
