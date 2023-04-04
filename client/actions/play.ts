
import { ThunkAction } from "../store"
import { getWinningImage } from "../apis/play"
import { Image } from "../../models/image"


export const FETCH_PLAY_CONTENT_PENDING = 'FETCH_PLAY_CONTENT_PENDING'
export const FETCH_PLAY_CONTENT_SUCCESS = 'FETCH_PLAY_CONTENT_SUCCESS'
export const FETCH_PLAY_CONTENT_ERROR = 'FETCH_PLAY_CONTENT_ERROR'

export type PlayAction = {
  type: typeof FETCH_PLAY_CONTENT_PENDING
  payload: null
} | {
  type: typeof FETCH_PLAY_CONTENT_SUCCESS
  payload: Image
}| {
  type: typeof FETCH_PLAY_CONTENT_ERROR
  payload: string
}



export function fetchPlayContentPending(): PlayAction {
  return {
    type: FETCH_PLAY_CONTENT_PENDING,
    payload: null
  } as PlayAction
}

export function fetchPlayContentSuccess(image: Image): PlayAction {
  return {
    type: FETCH_PLAY_CONTENT_SUCCESS,
    payload: image
  } as PlayAction
}
 
export function fetchError(errMessage: string): PlayAction {
  return {
    type: FETCH_PLAY_CONTENT_ERROR,
    payload: errMessage
  }
}