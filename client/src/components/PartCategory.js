import React from 'react'
import { Header, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParts } from '../actions/parts';

class PartCategory extends React.Component {
  state = { parts: [] }

  componentDidMount() {
    let { dispatch, category: { id }} = this.props;
    dispatch(getParts(id))
  }

  render() {
    let { category: { name }, parts } = this.props;
    return (
      <div>
        <Header as="h3">{name}</Header>
        <Grid columns={12}>
          <Grid.Row>
            { parts.map( p => {
                return (
                  <Grid.Column computer={3} mobile={12} key={p.id}>
                    <Link to={`/parts/${p.id}`}>{p.name}</Link>
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
  return { parts: state.parts }
}

export default connect(mapStateToProps)(PartCategory);
