import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchResults } from '../actions/results'
import { useAuth0 } from '@auth0/auth0-react'

export default function Results() {
  const { getAccessTokenSilently } = useAuth0()
  const results = useAppSelector((state) => state.results)
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   getAccessTokenSilently()
  //     .then((token) => {
  //       dispatch(fetchResults(token))
  //     })
  //     .catch((err) => {
  //       console.error(err.message)
  //     })
  // }, [dispatch, getAccessTokenSilently])

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
        <h1>Congrats on being Let In!</h1>
        <div>
          {results.loading && (
            <img src="/assets/loading.gif" className="loader" alt="loading" />
          )}

          {results.error && <p role={'paragraph'}> {results.error} </p>}

          {results.data}
        </div>
      </div>
    </>
  )
}
