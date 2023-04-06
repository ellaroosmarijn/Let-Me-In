import { Image } from '../../models/image'
import {
  CreateAction,
  ADD_IMAGE_PENDING,
  ADD_IMAGE_FULFILLED,
  ADD_IMAGE_REJECTED,
} from '../actions/create'

interface CreateState {
  data: Image | undefined
  error: string | undefined
  loading: boolean
}

const initialState: CreateState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const createReducer = (
  state = initialState,
  action: CreateAction
): CreateState => {
  const { type, payload } = action

  switch (type) {
    case ADD_IMAGE_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case ADD_IMAGE_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case ADD_IMAGE_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default createReducer
