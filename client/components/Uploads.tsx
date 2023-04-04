import { useEffect } from 'react'
import { fetchUploads } from '../actions/uploads'
import { useAppSelector, useAppDispatch } from '../hooks'

export default function Uploads() {
  const uploads = useAppSelector((state) => state.uploads)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUploads()), []
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
