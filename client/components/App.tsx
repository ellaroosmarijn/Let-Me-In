// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Play from './Play'
import Winner from './Winner'
import Results from './Results'
import Create from './Create'
import Uploads from './Uploads'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/winner" element={<Winner />} />
        <Route path="/results" element={<Results />} />
        <Route path="/create" element={<Create />} />
        <Route path="/uploads" element={<Uploads />} />
      </Routes>
    </>
  )
}
