import React from 'react';
import { connect } from 'react-redux';
import PartForm from './PartForm';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';

class Part extends React.Component {
  state = { edit: false }

  componentDidMount() {
    let { dispatch, match: { params: { id }}} = this.props;
    $.ajax({
      url: `/api/parts/${id}`,
      type: 'GET'
    }).done( part => {
      dispatch({ type: 'PART', part });
    });
  }

  toggleEdit = () => {
    this.setState( (state) => {
      return { edit: !state.edit }
    });
  }

  edit() {
    return (
      <PartForm part={this.props.part} toggleEdit={this.toggleEdit} />
    )
  }

  show() {
    let { admin } = this.props;
    return (
      <div>
        Part
        { admin && 
            <Button 
              fluid 
              basic 
              color="blue" 
              type="button" 
              onClick={this.toggleEdit}
            >
              Edit
            </Button>
        }
      </div>
    )
  }

  render() {
    return this.state.edit ? this.edit() : this.show()
  }
}

const mapStateToProps = (state) => {
  return { admin: state.auth.isAuthenticated, part: state.part }
}

export default connect(mapStateToProps)(Part);
