import { Image } from '../../models/image'
import {
  WinnerAction,
  POST_RESULT_ADD_PENDING,
  POST_RESULT_ADD_FULFILLED,
  POST_RESULT_ADD_REJECTED,
} from '../actions/winner'

interface WinnerState {
  data: Image | undefined
  error: string | undefined
  loading: boolean
}

const initialState: WinnerState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const WinnerReducer = (
  state = initialState,
  action: WinnerAction
): WinnerState => {
  const { type, payload } = action

  switch (type) {
    case POST_RESULT_ADD_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case POST_RESULT_ADD_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case POST_RESULT_ADD_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default WinnerReducer
