import React from 'react';
import { connect } from 'react-redux';

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
      dispatch(tryFetchUser(this.loaded))
    }
  }

  render() {
    let { loaded } = this.state;
    return loaded ? this.props.children : null
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.id }
}

export default connect(mapStateToProps)(FetchUser);
