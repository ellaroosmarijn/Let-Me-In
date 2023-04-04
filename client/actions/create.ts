import { Image, ImageCreate } from '../../models/image'
import apiFunction from '../apis/create'
import type { ThunkAction } from '../store'
import imageUpload from '../helpers/aws'

export const ADD_IMAGE_PENDING = 'ADD_IMAGE_PENDING'
export const ADD_IMAGE_FULFILLED = 'ADD_IMAGE_FULFILLED'
export const ADD_IMAGE_REJECTED = 'ADD_IMAGE_REJECTED'

export type CreateAction =
  | { type: typeof ADD_IMAGE_PENDING; payload: void }
  | {
      type: typeof ADD_IMAGE_FULFILLED
      payload: Omit<ImageCreate, 'description'>
    }
  | { type: typeof ADD_IMAGE_REJECTED; payload: string }

export function addImagePending(): CreateAction {
  return {
    type: ADD_IMAGE_PENDING,
  } as CreateAction
}
export function addImageFulfilled(
  imageData: Omit<ImageCreate, 'description'>
): CreateAction {
  return {
    type: ADD_IMAGE_FULFILLED,
    payload: imageData,
  }
}

export function addImageRejected(errorMessage: string): CreateAction {
  return {
    type: ADD_IMAGE_REJECTED,
    payload: errorMessage,
  }
}

export function addImage(
  imageData: ImageCreate,
  imageFile: File | undefined
): ThunkAction {
  return async (dispatch) => {
    dispatch(addImagePending())
    try {
      let imageDataInput: ImageCreate
      if (imageFile) {
        const imageUrl = await imageUpload(imageFile)
        if (imageUrl) {
          imageDataInput = { ...imageData, imageUrl: imageUrl }
          const addedImage = await apiFunction.addImage(imageDataInput)
          dispatch(addImageFulfilled(addedImage))
        }
      } else {
        imageDataInput = imageData
        const addedImage = await apiFunction.addImage(imageDataInput)
        dispatch(addImageFulfilled(addedImage))
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(addImageRejected(error.message))
      } else {
        dispatch(addImageRejected('unkown error occured. ask admin'))
      }
    }
  }
}
// action to say that we are uploading the image - which sets isloading to true
// // upload the image to amazon, and get the url back
// // create the image object, with the form fdata and the new image url from amazon
// action to say that the image was uploaded, that will set the redux state
// // update the state for the uploads page
// If anything goes wrong, action to say that there was an error, and what the error was.

// use URL, Upload file to AWS S3
