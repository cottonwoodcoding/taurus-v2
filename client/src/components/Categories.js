import React from 'react';
import { connect } from 'react-redux';
import { 
  serviceCategories, 
  deleteServiceCategory, 
  addServiceCategory, 
  editServiceCategory 
} from '../actions/serviceCategories';

import { 
  partCategories, 
  deletePartCategory, 
  addPartCategory, 
  editPartCategory 
} from '../actions/partCategories';

import { Header, Form, Button, Divider, List } from 'semantic-ui-react';

class Categories extends React.Component {
  state = { name: '', editing: [] }

  constructor(props) {
    super(props);
    if (props.name === 'service') {
      this.add = addServiceCategory;
      this.remove = deleteServiceCategory;
      this.edit = editServiceCategory;
      this.getCategories = serviceCategories;
    } else {
      this.add = addPartCategory;
      this.remove = deletePartCategory;
      this.edit = editPartCategory;
      this.getCategories = partCategories;
    }
  }

  toggleEdit = (id) => {
    let { editing } = this.state;
    let data;
    if (editing.includes(id))
      data = editing.filter( n => n !== id )
    else
      data = [...editing, id]
    this.setState({ editing: data });
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(this.getCategories())
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { state: { name }, props: { dispatch }, add} = this;
    dispatch(add(name))
    this.setState({ name: '' });
  }

  deleteCat = (id) => {
    const choice = confirm('Really delete this category?') // eslint-disable-line no-restricted-globals
    if (choice)
      this.props.dispatch(this.remove(id))
  }

  handleEdit = (e, name, id) => {
    e.preventDefault();
    const value = document.getElementById(`cat-${name}`).value
    this.props.dispatch(this.edit(id, value))
    this.toggleEdit(id);
  }

  cats = () => {
    let { data } = this.props;
    let { editing } = this.state;
    return data.map( c => {
      return (
        <List.Item key={c.id}>
          { !editing.includes(c.id) ?
            <div>
              <List.Content>
                <List.Header>
                  {c.name}
                </List.Header>
              </List.Content>
              <List.Icon 
                onClick={() => this.toggleEdit(c.id)}
                style={{ cursor: 'pointer' }} 
                size='large' 
                color='blue' 
                name='edit' 
              />
              <List.Icon 
                onClick={() => this.deleteCat(c.id)}
                style={{ cursor: 'pointer' }} 
                size='large' 
                color='red' 
                name='delete' 
              />
            </div>
            :
            <Form onSubmit={(e) => this.handleEdit(e, c.name, c.id)}>
              <Form.Input
                id={`cat-${c.name}`}
                required
                label="Name"
                defaultValue={c.name}
              />
              <Button type="button" onClick={() => this.toggleEdit(c.id)}>Cancel</Button>
              <Button>Save</Button>
            </Form>
          }
        </List.Item>
      )
    });
  }

  render() {
    let { name } = this.props;
    let title = name.charAt(0).toUpperCase() + name.slice(1) + ' Categories';
    return (
      <div>
        <Header textAlign="center" as="h3">{title}</Header> 
        <Header as="h2">Add A Category</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input 
            required
            label="Name" 
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button>Add</Button>
        </Form>
        <Divider />
        <List divided>
          { this.cats() }
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const data = state[`${props.name}Categories`]; 
  return { data }
}

export default connect(mapStateToProps)(Categories);
