import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchResults } from '../actions/results'
import { useAuth0 } from '@auth0/auth0-react'

export default function Results() {
  const { getAccessTokenSilently } = useAuth0()
  const results = useAppSelector((state) => state.results)
  const dispatch = useAppDispatch()

  // async function getToken(): Promise<string> {
  //   try {
  //     const token = await getAccessTokenSilently()
  //     return token
  //   } catch (err) {
  //     console.error(err)
  //     return ''
  //   }
  // }
  // try {const token = await getToken()
  //   dispatch(fetchResults(token))}
  // const token = await getToken()
  // dispatch(fetchResults(token))

  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const data = await fetch('https://yourapi.com');
  //   }

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, [])

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      dispatch(fetchResults(token))
    }
    getAccess().catch(console.error)
  }, [dispatch, getAccessTokenSilently])

  // useEffect(async () => {
  //   try {
  //     const token = await getToken()
  //     dispatch(fetchResults(token))
  //   } catch (err) {
  //     console.error(err)
  //     return 'no access token'
  //   }
  // })

  return (
    <>
      <h1>Congrats on being Let In!</h1>
    </>
  )
}
