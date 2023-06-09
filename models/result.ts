export interface Result {
  id: number
  auth0Id: string
  imageId: number
  created: string
}

export interface ResultCreate {
  imageId: number
}

export interface JoinedResult extends Result {
  description: string
  imageUrl: string
}
