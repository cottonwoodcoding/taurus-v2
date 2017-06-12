import React from 'react';
import { serviceCategories } from '../actions/serviceCategories';
import { addService, services } from '../actions/services';
import { connect } from 'react-redux';
import { Grid, Form, Button, Divider, Header } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import ServiceCategory from './ServiceCategory';

class AdminServices extends React.Component {
  defaults = { name: '', description: '' }
  state = { ...this.defaults }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(serviceCategories())
    dispatch(services())
  }

  handleChange = (e) => {
    let { target: { id, value } } = e;
    this.setState({ [id]: value });
  }

  options = () => {
    let { serviceCategories } = this.props;
    return serviceCategories.map( c => {
      return { key: c.id, value: c.id, text: c.name }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, description, category } = this.state;
    let { dispatch } = this.props;
    if (category) {
      dispatch(addService(category, name, description))
      this.setState({ ...this.defaults })
    } else {
      dispatch(setFlash('Please select a category', 'error'))
    }

  }

  render() {
    let { name, description, category } = this.state;
    let { serviceCategories, hideForm } = this.props;
    return (
      <Grid.Row>
        { hideForm ?
          <Divider hidden /> :
          <Grid.Column computer={6} tablet={16} mobile={16}>
            <Header as='h3'>Add A New Service</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Select
                label="Category"
                placeholder="Select a category"
                options={this.options()}
                onChange={(e, { value }) => this.setState({ category: value }) }
              />
              <Form.Input
                required
                label="Name"
                id="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="Description"
                id="description"
                value={description}
                onChange={this.handleChange}
              />
              <Button>Add Service</Button>
            </Form>
            <Divider clearing hidden />
          </Grid.Column>
        }
        <Grid.Column computer={10} tablet={10} mobile={16}>
          <Header as='h1' textAlign='center'>Our Services</Header>
          <Divider clearing />
          <Grid columns={16}>
            <Grid.Row>
              { !serviceCategories.length && <Header as='h1'>No Services Added</Header> }
              { serviceCategories.map( sc => {
                  return (
                    <Grid.Column computer={16} key={sc.id}>
                      <ServiceCategory
                        catId={sc.id}
                        name={sc.name}
                        image={sc.image}
                      />
                      <Divider hidden/>
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

const mapStateToProps = (state) => {
  return { serviceCategories: state.serviceCategories }
}

export default connect(mapStateToProps)(AdminServices);
