import type { Image } from '../../models/image'
import {
  UploadsAction,
  RECEIVE_IMAGE,
  REQUEST_IMAGE,
  FAILURE_IMAGE,
} from '../actions/uploads'

interface UploadState {
  data: Image[] | undefined
  error: string | null
  loading: boolean
}

const initialState: UploadState = {
  data: [],
  error: null,
  loading: false,
}

function uploadReducer(
  state = initialState,
  action: UploadsAction
): UploadState {
  switch (action.type) {
    case RECEIVE_IMAGE:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }
    case REQUEST_IMAGE:
      return {
        data: [],
        error: null,
        loading: true,
      }
    case FAILURE_IMAGE:
      return {
        data: [],
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default uploadReducer
