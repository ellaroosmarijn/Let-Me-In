export interface Image {
  id: number
  uploaderId: string
  name: string
  description: string
  imageUrl: string
}

export interface ImageCreate {
  name: string
  description: string
  imageUrl: string
}
