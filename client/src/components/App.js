import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Products from './Products/Products';
import Product from './Products/Product';
import Cart from './Cart'
import Header from './Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path='/' exact component={Products} />
      <Route path='/products/:id' component={Product} />
      <Route path='/cart' component={Cart} />
    </BrowserRouter>
  )
}
export default App
