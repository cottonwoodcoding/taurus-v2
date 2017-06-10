import React from 'react'
import { Header, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParts, deletePart } from '../actions/parts';
import { clearSearch } from '../actions/search';

class PartCategory extends React.Component {
  componentDidMount() {
    let { dispatch, category: { id }, query } = this.props;
    if (!query || query.length < 2)
      dispatch(getParts(id))
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearch());
  }

  componentWillReceiveProps(nextProps) {
    let { parts, query, dispatch, category: { id } } = this.props;
    let validQuery = query.length > 2
    if (validQuery && nextProps.query.length <= 2) {
      if (!parts.length)
        dispatch(getParts(id))
    }
  }

  deletePart = (id) => {
    if (confirm('Really delete this part?')) { // eslint-disable-line no-restricted-globals
      this.props.dispatch(deletePart(id))
    }
  }

  render() {
    let { category: { name, id }, parts, admin, search, dispatch, query } = this.props;
    let validQuery = query.length > 2
    let visibleParts = validQuery ? search : parts
    return (
      <div>
        <Header as="h3">{name}</Header>
        { validQuery &&
          <Header
            as="h4"
            textAlign="center"
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              dispatch(getParts(id))
              dispatch(clearSearch())
            }}
          >
            Show All
          </Header>
        }
        <Grid columns={12}>
          <Grid.Row>
            { visibleParts.map( p => {
                return (
                  <Grid.Column computer={3} mobile={12} key={p.id}>
                    <Link to={`/parts/${p.id}`}>{p.name}</Link>
                    { admin &&
                      <Icon
                        color="red"
                        name="trash"
                        style={{ cursor: 'pointer' }}
                        onClick={ () => this.deletePart(p.id) }
                      />
                    }
                  </Grid.Column>
                )
              })
            }
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { admin: state.auth.isAuthenticated, parts: state.parts, search: state.search, query: state.query }
}

export default connect(mapStateToProps)(PartCategory);
