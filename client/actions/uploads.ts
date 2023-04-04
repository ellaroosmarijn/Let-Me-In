import type { ThunkAction } from "../store";
import type {Image} from '../../models/image'
import { getUploads } from "../apis/uploads";


export const REQUEST_IMAGE = 'REQUEST_IMAGE'
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE'
export const FAILURE_IMAGE = 'FAILURE_IMAGE'


export type ImageAction =
|{type: typeof REQUEST_IMAGE}
|{type: typeof RECEIVE_IMAGE; payload: Image[]}
|{type: typeof FAILURE_IMAGE; payload: string}

export function requestImage() :ImageAction{
  return{type:REQUEST_IMAGE}
}

export function receiveImage(images: Image[]):ImageAction{
  return{type: RECEIVE_IMAGE, payload: images.map((image)=>{return image})}
}

export function failureImage(error: string): ImageAction{
  return{type:FAILURE_IMAGE, payload: error}
}


export function fetchUploads(): ThunkAction{
return (dispatch)=>{
  dispatch(requestImage())
  return getUploads().then((res)=>{dispatch(receiveImage(res))}).catch((err)=>{
    if (err instanceof Error) {
      dispatch(failureImage(err.message))
    } else {
      dispatch(failureImage('An unknown error occurred'))
    }
  })
}

}