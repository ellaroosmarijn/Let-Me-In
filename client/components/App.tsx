import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Play from './Play'
import Winner from './Winner'
import Results from './Results'
import Create from './Create'
import Uploads from './Uploads'
import { useAuth0 } from '@auth0/auth0-react'

export default function App() {
  const { getAccessTokenSilently } = useAuth0()
  getAccessTokenSilently().then(token => console.log(token)).catch(console.error)
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/play' element={<Play />} />
        <Route path='/play/winner' element={<Winner />} />
        <Route path='/results' element={<Results />} />
        <Route path='/create' element={<Create />} />
        <Route path='/uploads' element={<Uploads />} />
      </Routes>
    </div>
  )
}
