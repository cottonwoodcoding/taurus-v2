import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearFlash } from './actions/flash';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Admin from './components/Admin';
import NoMatch from './components/NoMatch';
import Services from './components/Services';
import Parts from './components/Parts';
import Contact from './components/Contact';
import Login from './components/Login';
import Auth from 'j-toker';
import Flash from './components/Flash';
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  componentDidMount() {
    Auth.configure({ apiUrl: '/api' });
    Auth.validateToken()
          .then( user => { this.props.dispatch({ type: 'LOGIN', user }) })
  }

  componentDidUpdate() {
    this.props.dispatch(clearFlash());
  }

  render() {
    return(
      <div>
        <NavBar />
        <Flash />
        <Container textAlign='center'>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/parts" component={Parts} />
            <Route exact path="/contact" component={Contact} />
            <Route path="/login" render={ (props) => <Login {...props} title="Login" /> } />
            <ProtectedRoute path='/admin' component={Admin} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(connect()(App));
