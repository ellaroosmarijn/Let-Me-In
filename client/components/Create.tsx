import { useState } from 'react'
import { addImage } from '../actions/create'
import { useAppSelector, useAppDispatch } from '../hooks'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  Space,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'

function Create() {
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.create)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
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
    if (loading) {
      return (
        <Button type="submit" loading>
          Uploading
        </Button>
      )
    } else if (checkForEmptyInputs()) {
      return (
        <Button
          data-disabled
          sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
          onClick={(event) => event.preventDefault()}
          aria-describedby="upload"
        >
          Upload
        </Button>
      )
    }
    return <Button type="submit">Upload</Button>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div className="form-container">
        <Title>Create your own entry</Title>
        <Text>Fill out the form to add your own meme to the selection.</Text>
        <Space h="md" />
        <form onSubmit={handleSubmit} name="uploadImageForm">
          <TextInput
            label="Title"
            type="text"
            id="imageName"
            name="imageName"
            value={name}
            onChange={handleNameChange}
            required={true}
          />
          <Textarea
            label="Description"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required={true}
          />
          <Space h="sm" />
          <Tabs defaultValue="upload">
            <Tabs.List>
              <Tabs.Tab value="upload">Upload File</Tabs.Tab>
              <Tabs.Tab value="url">Use URL</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="upload" pt="xs">
              <input
                type="file"
                name="imageUpload"
                role="button"
                onChange={handleFileUpload}
              />
            </Tabs.Panel>

            <Tabs.Panel value="url" pt="xs">
              <TextInput
                label="Image URL"
                type="text"
                value={imageUrl}
                onChange={handleImageUrlChange}
                name="Image URL"
                role="button"
              />
            </Tabs.Panel>
          </Tabs>
          <Space h="lg" />
          <FormButton />
        </form>
      </div>
    </>
  )
}
export default Create
