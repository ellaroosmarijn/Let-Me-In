import React, { useState } from 'react'
import { addImage } from '../actions/create'
import { useAppSelector, useAppDispatch } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'
import TextareaAutosize from 'react-textarea-autosize'

export default function Create() {
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.create)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [url, setUrl] = useState(false)
  const [uploadImage, setUploadImage] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { getAccessTokenSilently } = useAuth0()

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
    const accessToken = await getAccessTokenSilently()
    const imageData = {
      name,
      description,
      imageUrl,
    }
    dispatch(addImage(imageData, selectedFile, accessToken))
    clearForm()
  }
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  function clearForm() {
    setDescription('')
    setName('')
    setSelectedFile(null)
    setImageUrl('')
  }
  function checkForEmptyInputs() {
    if (name && description && (selectedFile || imageUrl)) {
      return false
    } else {
      return true
    }
  }

  function FormButton() {
    if (loading === true) {
      return (
        <button className="uploading-button" type="submit">
          Uploading
        </button>
      )
    } else if (checkForEmptyInputs()) {
      return (
        <button
          className="disabled-button"
          data-disabled
          onClick={(event: React.MouseEvent) => event.preventDefault()}
          aria-describedby="upload"
        >
          Upload
        </button>
      )
    }
    return (
      <button className="button" type="submit">
        Upload
      </button>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div className="form-container">
        <h1 className="title">Create your own entry</h1>
        <div className="text">
          Fill out the form to add your own meme to the selection.
        </div>
        <form onSubmit={handleSubmit} name="uploadImageForm">
          <label className="form-label" htmlFor="meme-title">
            Title:
          </label>
          <input
            className="form-input"
            id="meme-title"
            name="Title"
            type="text"
            placeholder="Title"
            value={name}
            onChange={handleNameChange}
            required={true}
          />
          <label className="form-label" htmlFor="meme-title">
            Description:
          </label>
          <TextareaAutosize
            className="form-input"
            placeholder="Description"
            id="description"
            name="Description"
            value={description}
            onChange={handleDescriptionChange}
            required={true}
          />
          {url ? (
            <>
              <label className="form-label" htmlFor="meme-title">
                Image URL:
              </label>
              <input
                className="form-input"
                placeholder="Image URL"
                id="image-url"
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                name="Image URL"
                role="button"
              />
              <FormButton />
              <div className="padding-bottom" />
            </>
          ) : (
            <button
              className="secondary-button"
              onClick={() => {
                setUrl(true)
              }}
            >
              ImageURL
            </button>
          )}
          {uploadImage ? (
            <>
              <div className="padding-top" />
              <input
                type="file"
                name="imageUpload"
                role="button"
                onChange={handleFileUpload}
              />
              <div className="padding-above-formbutton" />
              <FormButton />
            </>
          ) : (
            <button
              className="secondary-button"
              onClick={() => {
                setUploadImage(true)
              }}
            >
              Upload
            </button>
          )}
        </form>
      </div>
    </>
  )
}
