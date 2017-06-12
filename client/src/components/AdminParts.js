import React, { Component } from 'react';
import PartForm from './PartForm';
import { Grid, Header, Divider, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PartCategory from './PartCategory';
import { clearSearch } from '../actions/search';

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

  visibileCategories = (categories) => {
    if (this.props.searching) {
      let ids = this.props.search.map( c => c.part_category_id )
      return categories.filter( c => ids.includes(c.id) )
    } else { 
      return categories;
    }
  }

  render() {
    let { category } = this.state
    let { categories, hideForm } = this.props;
    let cats = this.visibileCategories(categories).sort(this.alpha)
    if (category.name) {
      return (
        <div>
          <a
            style={{ cursor: 'pointer' }}
            onClick={ () => { 
              this.toggleCategory({ id: 0 }) 
              this.props.dispatch(clearSearch())
            }}
          >
            Back
          </a>
          <Divider hidden />
          <PartCategory category={category} toggleCategory={this.toggleCategory} />
        </div>
      )
    } else {
      return (
        <Grid.Row>
          { !hideForm &&
            <Grid.Column computer={6} tablet={16} mobile={16}>
              <Header as='h3'>Add A New Part</Header>
              <PartForm />
              <Divider clearing hidden />
            </Grid.Column>
          }
          <Grid.Column computer={10} tablet={16} mobile={16}>
            <Header as='h3'>Category</Header>
            { !categories.length && <Header as='h4'>No Parts Added</Header> }
            { cats.length > 0 &&
              <Menu vertical fluid>
                { cats.map( c => {
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
            }
            { cats.length === 0 && this.props.searching &&
              <Header as="h3" textAlign="center">No results found</Header>
            }
          </Grid.Column>
        </Grid.Row>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return { categories: state.partCategories, search: state.search }
}

export default connect(mapStateToProps)(AdminParts);
