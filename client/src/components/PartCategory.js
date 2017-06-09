import React from 'react'
import { Header, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParts, deletePart } from '../actions/parts';

class PartCategory extends React.Component {
  state = { parts: [] }

  componentDidMount() {
    let { dispatch, category: { id }} = this.props;
    dispatch(getParts(id))
  }

  deletePart = (id) => {
    if (confirm('Really delete this part?')) { // eslint-disable-line no-restricted-globals
      this.props.dispatch(deletePart(id))
    }
  }

  render() {
    let { category: { name }, parts, admin } = this.props;
    return (
      <div>
        <Header as="h3">{name}</Header>
        <Grid columns={12}>
          <Grid.Row>
            { parts.map( p => {
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
  return { admin: state.auth.isAuthenticated, parts: state.parts }
}

export default connect(mapStateToProps)(PartCategory);
