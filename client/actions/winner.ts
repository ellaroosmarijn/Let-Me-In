import type { ThunkAction } from '../store'

import { Image } from '../../models/image'
import { saveResult } from '../apis/winner'

export const POST_RESULT_ADD_PENDING = 'POST_RESULT_ADD_PENDING'
export const POST_RESULT_ADD_FULFILLED = 'POST_RESULT_ADD_FULFILLED'
export const POST_RESULT_ADD_REJECTED = 'POST_RESULT_ADD_REJECTED'

export type WinnerAction =
  | { type: typeof POST_RESULT_ADD_PENDING; payload: void }
  | { type: typeof POST_RESULT_ADD_FULFILLED; payload: Image }
  | { type: typeof POST_RESULT_ADD_REJECTED; payload: string }

export function postResultAddPending(): WinnerAction {
  return {
    type: POST_RESULT_ADD_PENDING,
  } as WinnerAction
}

export function postResultAddFulfilled(image: Image): WinnerAction {
  return {
    type: POST_RESULT_ADD_FULFILLED,
    payload: image,
  }
}

export function postResultAddRejected(error: string): WinnerAction {
  return {
    type: POST_RESULT_ADD_REJECTED,
    payload: error,
  }
}

export function postResultAdd(image: Image): ThunkAction {
  return (dispatch) => {
    dispatch(postResultAddPending())
    const imageId = { imageId: image.id }
    return saveResult(imageId)
      .then(() => {
        dispatch(postResultAddFulfilled(image))
      })
      .catch((error: Error) => {
        dispatch(postResultAddRejected(error.message))
      })
  }
}
