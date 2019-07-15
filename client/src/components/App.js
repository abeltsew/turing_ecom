import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Products from './Products/Products';
import Product from './Products/Product';
import Cart from './Cart';
import Header from './Header';

import Login from './auth/Login';
import Register from './auth/Register';
import CheckoutForm from './checkout/CheckoutForm';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path='/' exact component={Products} />
      <Route path='/products/:id' component={Product} />
      <Route path='/cart' component={Cart} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/checkout' component={CheckoutForm} />
    </BrowserRouter>
  )
}
export default App
