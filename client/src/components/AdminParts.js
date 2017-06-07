import React, { Component } from 'react';
import PartForm from './PartForm';
import { Grid, Header, Divider, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PartCategory from './PartCategory';

class AdminParts extends Component {
  state = { category: { id: 0 }};

  toggleCategory = (id, name) => {
    this.setState({ category: { id, name }});
  }

  alpha = (a, b) => {
    if (a.name < b.name)
      return -1
    if (a.name > b.name)
      return 1
    return 0
  }

  render() {
    let { category } = this.state
    let { categories } = this.props;
    if (category.name) {
      return (
        <div>
          <a
            style={{ cursor: 'pointer' }}
            onClick={ () => this.toggleCategory({ id: 0 }) }
          >
            Back
          </a>
          <PartCategory category={category} />
        </div>
      )
    } else {
      return (
        <Grid.Row>
          <Grid.Column computer={6} tablet={16} mobile={16}>
            <Header as='h3'>Add A New Part</Header>
            <PartForm />
            <Divider clearing hidden />
          </Grid.Column>
          <Grid.Column computer={10} tablet={16} mobile={16}>
            <Header as='h3'>Parts</Header>
            { !categories.length && <Header as='h4'>No Parts Added</Header> }
            <Menu vertical fluid>
              { categories.sort(this.alpha).map( c => {
                  return (
                    <Menu.Item key={c.id}>
                      <a
                        key={c.id}
                        style={{ cursor: 'pointer' }}
                        onClick={ () => this.toggleCategory(c.id, c.name) }
                      >
                        {c.name}
                      </a>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Grid.Column>
        </Grid.Row>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return { categories: state.partCategories }
}

export default connect(mapStateToProps)(AdminParts);
