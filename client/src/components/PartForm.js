import React from 'react';
import { connect } from 'react-redux';
import { List, Grid, Divider, Header, Form, Button } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { addPart, updatePart } from '../actions/parts';

class PartForm extends React.Component {
  defaults = {
    name: '',
    description: '',
    number: '',
    price: '',
    sale_price: '',
    qty_on_hand: '',
    images: [],
    specifications: [],
    features: [],
    specName: '',
    specValue: '',
    fetature: '',
    onSale: false,
  }

  state = {...this.defaults}

  componentDidMount() {
    let { part } = this.props;
    if (part) {
      let specifications = []
      if (part.specifications) {
        specifications = JSON.parse(part.specifications.replace(/=>/g, ":"))
      }
      let category = part.part_category_id
      let onSale = part.sale_price ? true : false
      this.setState({...part, specifications, category, onSale })
    }
  }

  options = () => {
    let { partCategories } = this.props;
    return partCategories.map( c => {
      return { key: c.id, value: c.id, text: c.name }
    });
  }

  removeSpec = (name) => {
    const specifications = this.state.specifications.filter( s => s.specName !== name )
    this.setState({ specifications })
  }

  toggleSale = () => {
    const onSale = this.state.onSale
    if (onSale)
      this.setState({ onSale: false, sale_price: '' })
    else
      this.setState({ onSale: true });
  }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value })
  }

  addFeature = () => {
    let { feature, features } = this.state;
    if (feature) {
      let list = [...new Set([...features, feature])];
      this.setState({ features: list, feature: '' })
    }
  }

  removeFeature = (name) => {
    this.setState({ features: this.state.features.filter( f => f !== name ) })
  }

  addSpec = () => {
    let { specifications, specValue, specName } = this.state;
    if (specName && specValue) {
      const spec = { specName, specValue }
      this.setState({ specifications: [...specifications, spec], specName: '', specValue: '' });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { dispatch, part, toggleEdit } = this.props;
    let { onSale, feature, specName, specValue, ...rest } = this.state;
    if (rest.category) {
      let { category, ...p } = rest
      if (part) {
        dispatch(updatePart({part_category_id: category, ...p}, part.id))
        this.props.toggleEdit()
      } else {
        dispatch(addPart({part_category_id: category, ...p}))
        this.setState({ ...this.defaults })
      }
    } else {
      dispatch(setFlash('Please select a category', 'error'))
      window.scrollTo(0,0)
    }
  }

  render() {
    let { name, description, number, price, sale_price, qty_on_hand, images, specifications, features, onSale, specName, specValue, feature, category, part_category_id } = this.state;
    return (
      <Form id="form" onSubmit={this.handleSubmit}>
        <Form.Select
          label="Category"
          placeholder="Select a category"
          options={this.options()}
          onChange={(e, { value }) => this.setState({ category: value }) }
          value={category || ''}
        />
        <Form.Input
          required
          label="Name"
          id="name"
          value={name || ''}
          onChange={this.handleChange}
        />
        <Form.Input
          required
          label="Description"
          id="description"
          value={description || ''}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Part Number"
          id="number"
          value={number || ''}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Price"
          id="price"
          type="number"
          value={price || ''}
          onChange={this.handleChange}
        />
        { onSale &&
          <Form.Input
            label="Sale Price"
            id="sale_price"
            type="number"
            value={sale_price || ''}
            onChange={this.handleChange}
          />
        }
        <Form.Checkbox
          label="On Sale?"
          checked={onSale}
          onChange={this.toggleSale}
        />
        <Form.Input
          label="QTY on hand"
          id="qty_on_hand"
          type="number"
          step="1"
          value={qty_on_hand || ''}
          onChange={this.handleChange}
        />
        <Header as="h4">Specification</Header>
        <Divider />
        <List>
          { specifications.map( (s,i) => {
              return (
                <List.Item key={i}>
                  <List.Icon
                    name="delete"
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.removeSpec(s.specName)}
                  />
                  <List.Content>{s.specName}</List.Content>
                </List.Item>
              )
            })
          }
        </List>
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <Form.Input
                id="specName"
                label="Specification Name"
                value={specName || ''}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <Form.Input
                id="specValue"
                label="Specification Value"
                value={specValue || ''}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <Button fluid basic color="blue" type="button" onClick={this.addSpec}>Add Spec +</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Header as="h4">Features</Header>
        <Divider />
        <List>
          { features.map( (f,i) => {
              return (
                <List.Item key={i}>
                  <List.Icon
                    name="delete"
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.removeFeature(f)}
                  />
                  <List.Content>{f}</List.Content>
                </List.Item>
              )
            })
          }
        </List>
        <Form.Input
          id="feature"
          label="Feature"
          value={feature || ''}
          onChange={this.handleChange}
        />
        <Button fluid basic color="blue" type="button" onClick={this.addFeature}>Add Feature +</Button>

        <Header color="red" as="h3">TODO: Add Images</Header>
        { this.props.part &&
          <Button fluid onClick={this.props.toggleEdit}>Cancel</Button>
        }
        <Button fluid primary>{this.props.part ? 'Update' : 'Add'} Part</Button>
      </Form>
    )
  }

}

const mapStateToProps = (state) => {
  return { partCategories: state.partCategories };
}

export default connect(mapStateToProps)(PartForm);
