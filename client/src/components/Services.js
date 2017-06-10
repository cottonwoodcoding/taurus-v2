import React, { Component } from 'react';
import AdminServices from './AdminServices';

class Services extends Component {
  render() {
    return(
      <AdminServices hideForm={true} />
    );
  }
}

export default Services;
