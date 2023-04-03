import { Image } from '../../models/image'
import {
  HomeAction,
  FETCH_HOME_IMAGE_PENDING,
  FETCH_HOME_IMAGE_FULFILLED,
  FETCH_HOME_IMAGE_REJECTED,
} from '../actions/home'

interface HomeState {
  data: Image | undefined
  error: string | undefined
  loading: boolean
}

const initialState: HomeState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const homeReducer = (state = initialState, action: HomeAction): HomeState => {
  const { type, payload } = action

  switch (type) {
    case FETCH_HOME_IMAGE_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case FETCH_HOME_IMAGE_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case FETCH_HOME_IMAGE_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default homeReducer
