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

const s3 = new AWS.S3()

async function imageUpload(imageFile: File) {
  if (!imageFile) {
    return
  }
  const params = {
    Bucket: S3_BUCKET,
    Key: `${Date.now()}.${imageFile.name}`,
    Body: imageFile,
  }
  const { Location } = await s3.upload(params).promise()
  return Location
}

export default imageUpload
