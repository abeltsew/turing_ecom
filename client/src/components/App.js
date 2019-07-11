import React from 'react'
import Products from './Products/Products';
import Product from './Products/Product';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path='/' exact component={Products} />
      <Route path='/products/:id' component={Product} />
    </BrowserRouter>
  )
}
export default App
