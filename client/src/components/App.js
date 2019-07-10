import React from 'react'
import Products from './Products/Products';
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    </div>
  )
}
export default App
