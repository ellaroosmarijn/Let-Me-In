import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../App'
import { initialiseStore } from '../../store'

describe('Test Play Component', ()=> {
  test.todo('display the correct header', ()=> {
      
    const heading = screen.getAllByRole('h1', {name: /-click on a square to find the winning meme!/i})
  

    expect(screen.getByText(heading)).toBeInTheDocument()
  })
  })
  