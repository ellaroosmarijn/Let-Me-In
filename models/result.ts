export interface Result {
  id: number
  auth0Id: string
  imageId: string
  created: string
}

export interface ResultCreate {
  imageId: string
}

export interface JoinedResult extends Result {
  description: string
  imageUrl: string
}
