import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Icon } from 'semantic-ui-react';
import { search, clearSearch } from '../actions/search';

class Search extends React.Component {
  handleChange = (e) => {
    let { target: { value }} = e;
    if (value) {
      this.props.dispatch({ type: 'QUERY', query: value })
      if (value.length > 2) {
        this.props.dispatch(search(value))
        this.props.toggleSearching(true);
      }
    } else {
      this.props.dispatch(clearSearch());
      this.props.toggleSearching(false);
    }
  }

  clear = () => {
    this.props.dispatch(clearSearch());
    this.props.toggleSearching(false);
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

export default connect(mapStateToProps)(Search);
