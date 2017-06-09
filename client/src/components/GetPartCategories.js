import React from 'react';
import { partCategories } from '../actions/partCategories';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Parts from './Parts';
import Part from './Part';

class GetPartCategories extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    if (!this.state.loaded) {
      this.props.dispatch(partCategories())
      this.setState({ loaded: true })
    }
  }

  render() {
    if (this.state.loaded)
      return (
        <div>
           <Route exact path="/parts" component={Parts} />
           <Route exact path="/parts/:id" component={Part} />
        </div>
      )
    else 
      return null
  }
}

export default connect()(GetPartCategories);
