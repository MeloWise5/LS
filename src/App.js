import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Authentication/context/AuthContext'
import SignUp from './components/Authentication/components/SignUp'
import Login from './components/Authentication/components/Login'
import Logout from './components/Authentication/components/Logout'
import UpdateProfile from './components/Authentication/components/UpdateProfile'
import ForgotPassword from './components/Authentication/components/ForgotPassword'
import PrivateRoute from './components/Authentication/components/PrivateRoute'
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import Ladder from './containers/Ladder/Ladder';
import Graph from './containers/Graph/Graph';
import './App.css';

const App = props => {

  // This is how you switch between pages
  // Check out and the Prices
  let routes = (
    
      <Switch>
        <PrivateRoute exact path="/" component={Ladder} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <PrivateRoute path='/graph' component={Graph} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
  );

  return (
    <React.Fragment>
      <AuthProvider>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
