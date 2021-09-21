import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import { Fragment } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Header } from './components/layout/Header';
import { Banner } from './components/layout/Banner';
import { Footer } from './components/layout/Footer';
import { FootBanner } from './components/layout/FootBanner';
import { Features } from './components/feature/Features';
import { FeatureItem } from './components/feature/FeatureItem';
import NotFound from './components/layout/NotFound';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { AllProducts } from './components/feature/AllProducts';
import { Alert } from './components/layout/Alert';
import { AlertState } from './context/alert/AlertState';
import { UserState } from './context/user/UserState';
import { ProductState } from './context/product/ProductState';
import setAuthToken from './utils/setAuthToken';
import { Checkout } from './components/feature/Checkout';
import { Payment } from './components/feature/Payment';
import { About } from './components/layout/About';
import { Orders } from './components/feature/Orders';
import { PrivateRoute } from './components/routing/PrivateRoute';

if(localStorage.token) {
  setAuthToken(localStorage.token); 
}

const App = () => {
  return (
    <UserState>
      <ProductState>
        <AlertState>
          <Router>
            <Fragment>
              <Header />
              <Navbar />
              <Alert />
              <Switch>
                <Route exact path="/" render={() =>
                  <>
                    <Banner />
                    <Features />
                  </>
                } />
                <Route exact path="/single-item/:id" component={FeatureItem} >
                </ Route>
                <Route exact path="/products" component={AllProducts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path='/checkout' component={Checkout} />
                <PrivateRoute exact path='/confirm-order' component={Payment} />
                <PrivateRoute exact path='/my-orders' component={Orders} />
                <Route component={NotFound} />
              </Switch>
              <FootBanner />
              <Footer />
            </Fragment>
          </Router>
        </AlertState>
      </ProductState>
    </UserState>
  );
}

export default App;
