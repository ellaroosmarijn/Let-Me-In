import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../App'
import { initialiseStore } from '../../store'

describe('<Create />', () => {
  it('should have heading "create your own entry"', async () => {
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )

    const header = await screen.findByRole('heading')
    expect(header).toHaveTextContent('Create your own entry')
  })
  it('should have 2 textbox for name and description', async () => {
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )

    const inputItems = await screen.findAllByRole('textbox')
    expect(inputItems).toHaveLength(2)
  })
  it('should have upload button', async () => {
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    const buttonItem = await screen.findByRole('button', {
      name: 'Upload',
    })
    expect(buttonItem).toHaveTextContent('Upload')
  })
  it.todo(
    'if any of the value of 3 inputs is null, the submit button should be disabled'
  )
})

//findByRole('button', {value: {text: /Upload/i}})
