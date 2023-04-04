import { useState } from 'react'
import { addImage } from '../actions/create'
import { useAppSelector, useAppDispatch } from '../hooks'

function Create() {
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.create)
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value)
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const imageData = {
      name,
      description,
      imageUrl,
    }
    dispatch(addImage(imageData, selectedFile))
  }

  if (loading) {
    return <div>Uploading your image...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageName">Title</label>
        <input
          type="text"
          id="imageName"
          name="imageName"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="decription"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="imageName">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <label htmlFor="uploadFile">Upload Image</label>
        <input
          type="file"
          name="uploadFile"
          id="uploadFile"
          onChange={handleFileInput}
        />
        <button type="submit">Upload</button>
      </form>
    </>
  )
}
export default Create
