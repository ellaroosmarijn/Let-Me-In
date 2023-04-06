import type { Image } from '../../models/image'
import {
  UploadsAction,
  RECEIVE_UPLOAD_IMAGE,
  REQUEST_UPLOAD_IMAGE,
  FAILURE_UPLOAD_IMAGE,
} from '../actions/uploads'

interface UploadState {
  data: Image[]
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
    case RECEIVE_UPLOAD_IMAGE:
      return {
        data: action.payload,
        error: null,
        loading: false,
      }
    case REQUEST_UPLOAD_IMAGE:
      return {
        data: [],
        error: null,
        loading: true,
      }
    case FAILURE_UPLOAD_IMAGE:
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
