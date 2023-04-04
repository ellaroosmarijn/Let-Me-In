import { useEffect, useState } from 'react'
import { fetchUploads } from '../actions/uploads'
import { useAppSelector, useAppDispatch } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'

export default function Uploads() {
  const { getAccessTokenSilently } = useAuth0()
  const [error, setError] = useState('')
  const uploads = useAppSelector((state) => state.uploads)
  const dispatch = useAppDispatch()

  async function getToken() {
    const token = await getAccessTokenSilently()
    return token
  }

  useEffect(() => {
    const token = getToken()

    dispatch(fetchUploads(token)), []
  })

  return (
    <>
      <h1>UPLOADS PAGE :D</h1>
      <div>
        <ul>
          {uploads.data?.map((image) => {
            return (
              <li key={image.id}>
                <h2>{image.name}</h2>
                <img src={image.imageUrl} alt={image.description} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
