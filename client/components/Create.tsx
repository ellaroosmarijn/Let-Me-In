// export default function Create() {
//   return (
//     <>
//       <h1>CREATE PAGE :D</h1>
//     </>
//   )
// }

import AWS from 'aws-sdk'
import { useState } from 'react'
const S3_BUCKET = 'letmein-image'
const REGION = 'ap-southeast-2'

AWS.config.update({
  accessKeyId: 'AKIAWJMNYKETP4GSCQJL',
  secretAccessKey: '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',
  region: 'ap-southeast-2',
  signatureVersion: 'v4',
})

function Create() {
  const [selectedFile, setSelectedFile] = useState({})
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const s3 = new AWS.S3()

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files[0])
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedFile) {
      return
    }
    //dispatch(addImageToDatabase(imageData, selectedFile))

    const params = {
      Bucket: S3_BUCKET,
      Key: `${Date.now()}.${selectedFile.name}`,
      Body: selectedFile,
    }
    const { Location } = await s3.upload(params).promise()
    //setImageUrl(Location)
    console.log('uploading to s3', Location)
  }

  //submit the form - containing object {
  // image meta-data,
  // uploadedImage: selectedFile
  //}
  // S3 upload, await the URL
  // Add to DB with the url
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

//https://dev.to/shadid12/how-to-upload-images-to-s3-in-a-react-application-4lm
