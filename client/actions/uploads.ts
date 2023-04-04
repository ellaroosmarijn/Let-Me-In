import type { ThunkAction } from "../store";
import type {Image} from '../../models/image'
import { getUploads } from "../apis/uploads";


export const REQUEST_IMAGE = 'REQUEST_IMAGE'
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE'
export const FAILURE_IMAGE = 'FAILURE_IMAGE'


export type UploadsAction =
|{type: typeof REQUEST_IMAGE}
|{type: typeof RECEIVE_IMAGE; payload: Image[]}
|{type: typeof FAILURE_IMAGE; payload: string}

export function requestImage() :UploadsAction{
  return{type:REQUEST_IMAGE}
}

export function receiveImage(images: Image[]):UploadsAction{
  return{type: RECEIVE_IMAGE, payload: images.map((image)=>{return image})}
}

export function failureImage(error: string): UploadsAction{
  return{type:FAILURE_IMAGE, payload: error}
}


export function fetchUploads(auth0Id:string): ThunkAction{
return (dispatch)=>{
  dispatch(requestImage())
  return getUploads(auth0Id).then((res)=>{dispatch(receiveImage(res))}).catch((err)=>{
    if (err instanceof Error) {
      dispatch(failureImage(err.message))
    } else {
      dispatch(failureImage('An unknown error occurred'))
    }
  })
}

}