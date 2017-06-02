import React, { Component } from 'react';

class Loading extends Component {
    state = { isLoading: false };
    destructTimeout;

  componentDidMount() {
    this.setState({ isLoading: true });
  }

  componentWillUnmount() {
    clearTimeout(this.destructTimeout);
  }

  selfDestruct = () => {
    this.destructTimeout = setTimeout( () => {
      this.setState({ isLoading: false });
    }, 3000);
  }

  render() {
    let { info } = this.props;
    info = info === undefined ? '' : info

    if(this.state.isLoading)
      this.selfDestruct();
    return (
      <div>
        { this.state.isLoading ?
          <span className="loading">{`Loading ${info}`}</span>
          :
          <span>{`No ${info} found`}</span>
        }
      </div>
    )
  }
}

export default Loading;
