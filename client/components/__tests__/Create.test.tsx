import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, within, act, fireEvent } from '@testing-library/react'
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
})

describe('Form validation', () => {
  it('if all fields are empty the submit button should be disabled', async () => {
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
    expect(buttonItem).toHaveAttribute('data-disabled', 'true')
  })

  it('if all fields are filled the submit button should be enabled', async () => {
    render(
      <MemoryRouter initialEntries={['/Create']}>
        <Provider store={initialiseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const nameInput = await screen.getByRole('textbox', { name: 'Title' })
    const descriptionInput = await screen.getByRole('textbox', {
      name: 'Description',
    })

    const buttonItem = await screen.findByRole('button', {
      name: 'Upload',
    })
    const fileUpload = await screen.getByRole('button', {
      name: 'fileUpload',
    })
    console.log(fileUpload)
    act(() => {
      userEvent.type(nameInput, 'Test')
      userEvent.type(descriptionInput, 'Test')
      fireEvent.change(fileUpload, { target: { value: file } })
    })

    expect(buttonItem).toHaveAttribute('data-disabled', 'false')
  })
})

//fireEvent.change(inputVariable, {target: {value: 'a'}})
//userEvent.type(screen.getByRole('textbox'), 'Hello,{enter}World!')
