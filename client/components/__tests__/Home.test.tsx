import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../App'
import { initialiseStore } from '../../store'

const homeImageMockData = {
  id: 111,
  uploaderId: 'MockUploaderId',
  name: 'MockName',
  description: 'MockDescription',
  imageUrl: 'MockImageUrl',
}

describe('<Home />', () => {
  it('successfully shows a image from server', async () => {
    // Arrange
    expect.assertions(3)

    const scope = nock('http://localhost')
      .get('/api/v1/home')
      .reply(200, homeImageMockData)

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const homeImage = screen.getByAltText(homeImageMockData.description)

    // Assert
    expect(homeImage).toHaveAttribute('src', homeImageMockData.imageUrl)
  })
  it('fails to show an image from server', async () => {
    // Arrange
    expect.assertions(3)

    const scope = nock('http://localhost').get('/api/v1/home').reply(500)

    // Act
    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const errorMessage = screen.getByRole('paragraph')

    // Assert
    expect(errorMessage).toHaveTextContent('Internal Server Error')
  })
  it('successfully shows a new image from server when current image is clicked', async () => {
    // Arrange
    expect.assertions(5)

    const scope1 = nock('http://localhost')
      .get('/api/v1/home')
      .reply(200, homeImageMockData)

    render(
      <Provider store={initialiseStore()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )

    await waitFor(() => expect(scope1.isDone()).toBeTruthy())

    const homeImageMockDataTwo = {
      id: 222,
      uploaderId: 'MockUploaderIdTwo',
      name: 'MockNameTwo',
      description: 'MockDescriptionTwo',
      imageUrl: 'MockImageUrlTwo',
    }

    const scope2 = nock('http://localhost')
      .get('/api/v1/home')
      .reply(200, homeImageMockDataTwo)

    // Act
    const homeImageFirst = screen.getByAltText(homeImageMockData.description)

    act(() => {
      userEvent.click(homeImageFirst)
    })

    await waitFor(() => expect(scope2.isDone()).toBeTruthy())

    const homeImageSecond = screen.getByAltText(
      homeImageMockDataTwo.description
    )

    // Assert
    expect(homeImageSecond).toHaveAttribute(
      'src',
      homeImageMockDataTwo.imageUrl
    )
  })
})
