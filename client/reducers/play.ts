import { Image } from '../../models/image'
import { PlayAction } from '../actions/play'

interface PlayState {
  data: { image: Image, position: number }
  error: string | undefined
  loading: boolean
}

// initialState.data to be an empty array upon "Play" ticket completion
const initialState: PlayState = {
  data: {image:
    {
      id: 1,
      uploaderId: '1',
      name: 'Let Me In',
      description: 'LET ME INNNNNNNNNNNNNNN',
      imageUrl:
        'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif',
    },
    position: 3,
  },
  error: undefined,
  loading: false,
}

const playReducer = (state = initialState, action: PlayAction): PlayState => {
  const { type } = action

  switch (type) {
    default:
      return state
  }
}

export default playReducer
