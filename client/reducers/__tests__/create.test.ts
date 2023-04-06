import reducer from '../create'
import {
  addImageFulfilled,
  addImagePending,
  addImageRejected,
} from '../../actions/create'

const initialState = { data: undefined, error: undefined, loading: false }

describe('addImage reducer', () => {
  it('should add an image', () => {
    const newData = {
      id: 1,
      name: 'test name',
      uploaderId: 'id',
      description: 'test description',
      imageUrl: 'http://test.co.nz',
    }
    const expectedOutput = {
      data: {
        id: 1,
        name: 'test name',
        uploaderId: 'id',
        description: 'test description',
        imageUrl: 'http://test.co.nz',
      },
      error: undefined,
      loading: false,
    }

    expect(reducer(initialState, addImageFulfilled(newData))).toEqual(
      expectedOutput
    )
  })

  it('should return a loading state during the upload', () => {
    const expectedOutput = {
      data: undefined,
      error: undefined,
      loading: true,
    }

    expect(reducer(initialState, addImagePending())).toEqual(expectedOutput)
  })

  it('should return an error if the upload fails', () => {
    const errorMessage = 'Something went wrong'
    const expectedOutput = {
      data: undefined,
      error: 'Something went wrong',
      loading: false,
    }

    expect(reducer(initialState, addImageRejected(errorMessage))).toEqual(
      expectedOutput
    )
  })
})
