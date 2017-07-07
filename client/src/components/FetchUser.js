
import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../actions/flash';
import Auth from 'j-toker';
import { setSite } from '../actions/site';

class FetchUser extends React.Component {
  state = { loaded: false }

  loaded = () => {
    this.setState({ loaded: true });
  }

  componentDidMount() {
    let { isAuthenticated, dispatch } = this.props;
    dispatch(setSite());
    if (isAuthenticated) {
      this.loaded();
    } else {
      Auth.configure({ apiUrl: '/api' });
      Auth.validateToken()
        .then( user => { dispatch({ type: 'LOGIN', user }) })
        .then( () => this.loaded() )
        .catch( () => this.loaded() )
    }
  }

  componentDidUpdate() {
    this.props.dispatch(clearFlash());
  }

  componentWillReceiveProps() {
    if (!this.state.loaded)
      this.loaded()
  }

  render() {
    let { loaded } = this.state;
    return this.props.children
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated }
}

export default connect(mapStateToProps)(FetchUser);
