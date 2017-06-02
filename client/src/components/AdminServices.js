import React from 'react';
import { serviceCategories } from '../actions/serviceCategories';
import { addService, services } from '../actions/services';
import { connect } from 'react-redux';
import { Grid, Form, Button, Divider } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import ServiceCategory from './ServiceCategory';

class AdminServices extends React.Component {
  defaults = { name: '', description: '' }
  state = { ...this.defaults }

  componentDidMount() {
    this.props.dispatch(serviceCategories())
    this.props.dispatch(services())
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
    let { serviceCategories } = this.props;
    return (
      <Grid.Row>
        <Grid.Column computer={6} tablet={6} mobile={16}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Select
              label="category"
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
        </Grid.Column>
        <Grid.Column computer={10} tablet={10} mobile={16}>
          <Grid columns={16}>
            <Grid.Row>
              { serviceCategories.map( sc => {
                  return (
                    <Grid.Column computer={16} key={sc.id}>
                      <ServiceCategory
                        catId={sc.id}
                        name={sc.name}
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
