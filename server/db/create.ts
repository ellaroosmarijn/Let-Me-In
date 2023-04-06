import connection from './connection'
import { Image, ImageCreate } from '../../models/image'

async function addImage(
  imageData: ImageCreate,
  uploaderId: string,
  db = connection
): Promise<Image[]> {
  const { name, description, imageUrl } = imageData
  const result = await db('images')
    .insert({ name, description, image_url: imageUrl, uploader_id: uploaderId })
    .returning(['id', 'name', 'uploader_id', 'description', 'image_url'])

  return result.map((item) => {
    return {
      id: item.id,
      name: item.name,
      uploaderId: item.uploader_id,
      description: item.description,
      imageUrl: item.image_url,
    }
  })
}

export default { addImage }
