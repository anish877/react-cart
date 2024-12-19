import React, { useEffect, useState } from 'react'
import Wishlist from './components/Wishlist'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AmazonCart from './components/AmazonCart'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wishlist/>} />
        <Route path='/cart' element={<AmazonCart/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App