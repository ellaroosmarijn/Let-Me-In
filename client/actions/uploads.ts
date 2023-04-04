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