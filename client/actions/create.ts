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
      payload: Image
    }
  | { type: typeof ADD_IMAGE_REJECTED; payload: string }

export function addImagePending(): CreateAction {
  return {
    type: ADD_IMAGE_PENDING,
  } as CreateAction
}
export function addImageFulfilled(imageData: Image): CreateAction {
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
  imageFile: File | null,
  token: string
): ThunkAction {
  return async (dispatch) => {
    dispatch(addImagePending())
    try {
      let imageDataInput: ImageCreate
      if (imageFile) {
        const imageUrl = await imageUpload(imageFile)
        if (imageUrl) {
          imageDataInput = { ...imageData, imageUrl: imageUrl }
          const addedImage = await apiFunction.addImage(imageDataInput, token)
          dispatch(addImageFulfilled(addedImage))
        }
      } else {
        const addedImage = await apiFunction.addImage(imageData, token)
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
