import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  About,
  Cart,
  Checkout,
  Error,
  Home,
  PrivateRoute,
  SingleProduct,
  Products,
  AuthWrapper
} from './pages'
import ReactGA from 'react-ga';

function App() {

  useEffect(() => { 
    ReactGA.initialize('G-MFKGSX4MNY');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path="/" exact >
          <Home />
        </Route>
        <Route path="/cart" exact >
          <Cart />
        </Route>
        <Route path="/about" exact >
          <About />
        </Route>
        <PrivateRoute path="/checkout" exact >
          <Checkout />
        </PrivateRoute>
        <Route path="/products" exact >
          <Products />
        </Route>
        <Route path="/product/:id" exact >
          <SingleProduct />
        </Route>
        <Route path="*"  >
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </AuthWrapper>
}

export default App