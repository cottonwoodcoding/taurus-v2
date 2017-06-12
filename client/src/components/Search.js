import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'semantic-ui-react';
import { search, clearSearch } from '../actions/search';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
  handleChange = (e) => {
    let { target: { value }} = e;
    if (value) {
      this.props.dispatch({ type: 'QUERY', query: value })
      if (value.length > 2) {
        this.props.dispatch(search(value))
        this.searchAction(true)
      }
    } else {
      this.props.dispatch(clearSearch());
      this.searchAction(false);
    }
  }

  clear = () => {
    this.props.dispatch(clearSearch());
    this.searchAction(false);
  }

  searchAction = (value) => {
    let { toggleSearching, history } = this.props;
    if (toggleSearching)
      toggleSearching(value)
    else if (value) 
      history.push('/parts')
  }

  render() {
    let { query } = this.props;

    return (
      <Input
        fluid
        placeholder='Search...'
        onChange={this.handleChange}
        value={query}
        action
      >
        <input/>
        <Button
          icon
          onClick={this.clear}
        >
           <Icon name='remove circle' />
        </Button>
      </Input>
    )
  }
}

const mapStateToProps = (state) => {
  return { query: state.query }
}

export default withRouter(connect(mapStateToProps)(Search));
