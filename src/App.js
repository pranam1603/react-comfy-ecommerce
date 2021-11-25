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
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

ReactGA.initialize('G-YRNR517VPP');
    history.listen((location, action) => {
		ReactGA.pageview(location.pathname + location.search);
	})


function App() {

  useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);		
	}, [])
	

  return <AuthWrapper>
    <Router  history={history}>
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