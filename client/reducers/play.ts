import { Image } from '../../models/image'
import { FETCH_PLAY_CONTENT_ERROR, FETCH_PLAY_CONTENT_PENDING, FETCH_PLAY_CONTENT_SUCCESS, PlayAction } from '../actions/play'

interface PlayState {
  data: Image | object
  error: string | undefined
  loading: boolean
}

// initialState.data to be an empty array upon "Play" ticket completion
const initialState: PlayState = {
  data: {},
  // data: {image:
  //   {
  //     id: 1,
  //     uploaderId: '1',
  //     name: 'Let Me In',
  //     description: 'LET ME INNNNNNNNNNNNNNN',
  //     imageUrl:
  //       'https://media.tenor.com/bHGUqVIKzhoAAAAC/let-me-in-eric-andre.gif',
      
  //   },
  //   isWinning: true,
  // },
  error: undefined,
  loading: false,
}

const playReducer = (state = initialState, action: PlayAction): PlayState => {
  const { type } = action

  switch (type) {
    case FETCH_PLAY_CONTENT_PENDING:
      return {
        loading: true, 
        error: undefined,
        data: {}
      }
    case FETCH_PLAY_CONTENT_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload
      }
    case FETCH_PLAY_CONTENT_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: {}
      }
    default:
      return state
  }
}

export default playReducer
