import type { ThunkAction } from '../store'
import type { Image } from '../../models/image'
import { getUploads } from '../apis/uploads'

export const REQUEST_UPLOAD_IMAGE = 'REQUEST_IMAGE'
export const RECEIVE_UPLOAD_IMAGE = 'RECEIVE_IMAGE'
export const FAILURE_UPLOAD_IMAGE = 'FAILURE_IMAGE'

export type UploadsAction =
  | { type: typeof REQUEST_UPLOAD_IMAGE; payload: void }
  | { type: typeof RECEIVE_UPLOAD_IMAGE; payload: Image[] }
  | { type: typeof FAILURE_UPLOAD_IMAGE; payload: string }

export function requestImage(): UploadsAction {
  return { type: REQUEST_UPLOAD_IMAGE } as UploadsAction
}

export function receiveImage(images: Image[]): UploadsAction {
  return {
    type: RECEIVE_UPLOAD_IMAGE,
    payload: images,
  }
}

export function failureImage(error: string): UploadsAction {
  return { type: FAILURE_UPLOAD_IMAGE, payload: error }
}

export function fetchUploads(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestImage())
    return getUploads(token)
      .then((res) => {
        dispatch(receiveImage(res))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureImage(err.message))
        } else {
          dispatch(failureImage('An unknown error occurred'))
        }
      })
  }
}
