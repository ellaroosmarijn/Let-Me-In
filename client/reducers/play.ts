import { Image } from '../../models/image'
import {
  FETCH_PLAY_CONTENT_ERROR,
  FETCH_PLAY_CONTENT_PENDING,
  FETCH_PLAY_CONTENT_SUCCESS,
  PlayAction,
} from '../actions/play'

interface PlayState {
  data: Image | undefined
  error: string | undefined
  loading: boolean
}

const initialState: PlayState = {
  data: undefined,
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
        data: undefined,
      }
    case FETCH_PLAY_CONTENT_SUCCESS:
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      }
    case FETCH_PLAY_CONTENT_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: undefined,
      }
    default:
      return state
  }
}

export default playReducer
