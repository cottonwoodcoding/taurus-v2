import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import AdminParts from './AdminParts';
import Search from './Search';
import { connect } from 'react-redux';

class Parts extends Component {
  state = { searching: false }

  toggleSearching = (searching) => {
    this.setState({ searching });
  }

  render() {
    return(
      <div>
        <Search toggleSearching={this.toggleSearching} />
        <Divider />
        <AdminParts hideForm={true} toggleSearching={this.toggleSearching} searching={this.props.validQuery} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { validQuery: state.query.length > 2 }
}

export default connect(mapStateToProps)(Parts);
