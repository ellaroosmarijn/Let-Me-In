import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchResults } from '../actions/results'
import { useAuth0 } from '@auth0/auth0-react'

export default function Results() {
  const { getAccessTokenSilently } = useAuth0()
  const results = useAppSelector((state) => state.results)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      dispatch(fetchResults(token))
    }
    getAccess().catch(console.error)
  }, [dispatch, getAccessTokenSilently])

  return (
    <>
      <h1>Congrats on being Let In!</h1>
    </>
  )
}
