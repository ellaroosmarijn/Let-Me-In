// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import { fetchUploads } from '../actions/uploads'
import { useAppSelector, useAppDispatch } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'

export default function Uploads() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  const uploads = useAppSelector((state) => state.uploads)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getDispatch() {
      const token = await getAccessTokenSilently()
      dispatch(fetchUploads(token))
    }
    getDispatch()
  }, [dispatch, getAccessTokenSilently])

  if (!isAuthenticated) {
    return <h1>You need to log in to access this page.</h1>
  }
  return (
    <>
      <h1>Let Me In! Uploads Page</h1>
      <div className="uploads">
        {uploads.loading && (
          <img src="/assets/loading.gif" className="loader" alt="loading" />
        )}

        {uploads.error && <p role={'paragraph'}>{uploads.error}</p>}

        <ul>
          {uploads.data?.map((image) => {
            return (
              <li key={image.id}>
                <h2>{image.name}</h2>
                <img
                  className="uploaded-images"
                  src={image.imageUrl}
                  alt={image.description}
                />
                <p>{image.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
