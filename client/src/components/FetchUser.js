import React from 'react';
import { connect } from 'react-redux';
import Auth from 'j-toker';

class FetchUser extends React.Component {
  state = { loaded: false }

  loaded = () => {
    this.setState({ loaded: true });
  }

  componentDidMount() {
    let { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) {
      this.loaded();
    } else {
      Auth.configure({ apiUrl: '/api' });
      Auth.validateToken()
        .then( user => { this.props.dispatch({ type: 'LOGIN', user }) })
        .then( () => this.loaded() )
        .catch( () => { this.loaded() } )
    }
  }

  render() {
    let { loaded } = this.state;
    return loaded ? this.props.children : null
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated }
}

export default connect(mapStateToProps)(FetchUser);
