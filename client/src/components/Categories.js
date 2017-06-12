import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  serviceCategories, 
  deleteServiceCategory, 
  addServiceCategory, 
  editServiceCategory,
  uploadServiceImage
} from '../actions/serviceCategories';
import { 
  partCategories, 
  deletePartCategory, 
  addPartCategory, 
  editPartCategory,
  uploadPartImage,
} from '../actions/partCategories';
import { Header, Form, Button, Divider, List, Menu, Modal } from 'semantic-ui-react';
import FileDrop from './FileDrop';

class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = { name: '', editing: [], category: {} };
    if (props.name === 'service') {
      this.add = addServiceCategory;
      this.remove = deleteServiceCategory;
      this.edit = editServiceCategory;
      this.getCategories = serviceCategories;
      this.uploadImage = uploadServiceImage;
    } else {
      this.add = addPartCategory;
      this.remove = deletePartCategory;
      this.edit = editPartCategory;
      this.getCategories = partCategories;
      this.uploadImage = uploadPartImage;
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
    this.props.dispatch(this.getCategories())
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  catAdded = (category) => {
    this.setState({ name: '', category });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { state: { name }, props: { dispatch }, add} = this;
    dispatch(add(name, this.catAdded))
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
        <Menu.Item key={c.id}>
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
              <FileDrop
                url={`/api/${this.props.name}_categories/${c.id}/file_upload`}
                column="image"
                action={this.uploadImage}
                imgSrc={c.image}
              />
              <Divider hidden/>
              <Button type="button" onClick={() => this.toggleEdit(c.id)}>Cancel</Button>
              <Button>Save</Button>
            </Form>
          }
        </Menu.Item>
      )
    });
  }

  render() {
    let { name } = this.props;
    let { category } = this.state;
    let title = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div>
        <Modal
          closeIcon
          onClose={() => { this.setState({ category: {} }) }}
          open={category.id ? true : false }
        >
          <Modal.Header>Add Photo To {category.name}</Modal.Header>
            <FileDrop
              url={`/api/${this.props.name}_categories/${category.id}/file_upload`}
              column="image"
              action={this.uploadImage}
              imgSrc={category.image}
              cb={() => { this.setState({ category: {} }) }}
            />
            <Divider hidden/>
            <Button 
              secondary
              fluid 
              onClick={ () => this.setState({ category: {} }) }
            >
              Use Default Image
            </Button>
        </Modal>
        <Header as="h2">Add A New {title} Category</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            label="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button>Add</Button>
        </Form>
        <Header as='h4'>{title} Categories</Header>
        <Menu vertical fluid>{ this.cats() }</Menu>
        <Divider hidden clearing/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const data = state[`${props.name}Categories`];
  return { data };
}

export default connect(mapStateToProps)(Categories);
