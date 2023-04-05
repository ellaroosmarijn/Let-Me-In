import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'

import { fetchPlayContent } from '../actions/play'

export default function Play() {
  const { loading, error, data } = useAppSelector((state) => state.play)

  const dispatch = useAppDispatch()

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function dispatchFetchPlayContent() {
      const token = await getAccessTokenSilently()
      dispatch(fetchPlayContent(token))
    }

    dispatchFetchPlayContent()
  }, [dispatch, getAccessTokenSilently])

  return (
    <div className="play">
      <h1>Catchy Header</h1>
      {error && <p>{error}</p>}
      {loading && <img src="/loading.gif" alt="loading spinner" />}
      <img src={data?.imageUrl} alt="" />
    </div>
  )
}
