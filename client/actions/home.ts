import { Image } from '../../models/image'
import { getHomeImage } from '../apis/home'
import type { ThunkAction } from '../store'

export const FETCH_HOME_IMAGE_PENDING = 'FETCH_HOME_IMAGE_PENDING'
export const FETCH_HOME_IMAGE_FULFILLED = 'FETCH_HOME_IMAGE_FULFILLED'
export const FETCH_HOME_IMAGE_REJECTED = 'FETCH_HOME_IMAGE_REJECTED'

export type HomeAction =
  | { type: typeof FETCH_HOME_IMAGE_PENDING; payload: void }
  | { type: typeof FETCH_HOME_IMAGE_FULFILLED; payload: Image }
  | { type: typeof FETCH_HOME_IMAGE_REJECTED; payload: string }

export function fetchHomeImagePending(): HomeAction {
  return {
    type: FETCH_HOME_IMAGE_PENDING,
  } as HomeAction
}

export function fetchHomeImageFulfilled(homeImage: Image): HomeAction {
  return {
    type: FETCH_HOME_IMAGE_FULFILLED,
    payload: homeImage,
  }
}

export function fetchHomeImageRejected(errorMessage: string): HomeAction {
  return {
    type: FETCH_HOME_IMAGE_REJECTED,
    payload: errorMessage,
  }
}

export function fetchHomeImage(): ThunkAction {
  return (dispatch) => {
    dispatch(fetchHomeImagePending())
    return getHomeImage()
      .then((homeImage) => {
        dispatch(fetchHomeImageFulfilled(homeImage))
      })
      .catch((error) => {
        dispatch(fetchHomeImageRejected(error.message))
      })
  }
}
