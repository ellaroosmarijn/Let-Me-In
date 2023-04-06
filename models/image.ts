export interface Image {
  id: number
  uploaderId: string
  name: string
  description: string
  imageUrl: string
  isWinning?: boolean
}

export interface ImageCreate {
  name: string
  description: string
  imageUrl: string
}
