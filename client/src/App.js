import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Admin from './components/Admin';
import NoMatch from './components/NoMatch';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Auth from 'j-toker';
import Flash from './components/Flash';
import ProtectedRoute from './components/ProtectedRoute';
import FetchUser from './components/FetchUser';
import GetPartCategories from './components/GetPartCategories';

class App extends Component {
  componentDidMount() {
    Auth.configure({ apiUrl: '/api' });
  }

  render() {
    return(
      <div>
        <NavBar />
        <Flash />
        <Container>
          <FetchUser>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/services" component={Services} />
              <Route path="/parts" component={GetPartCategories} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/login" render={ (props) => <Login {...props} title="Login" /> } />
              <ProtectedRoute exact path='/admin' component={Admin} />
              <Route component={NoMatch} />
            </Switch>
          </FetchUser>
        </Container>
      </div>
    );
  }
}

export default App;
