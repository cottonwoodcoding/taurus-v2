import React from 'react';
import { connect } from 'react-redux';
import { List, Grid, Divider, Header, Form, Button, Modal } from 'semantic-ui-react';
import { setFlash } from '../actions/flash';
import { addPart, updatePart, uploadPartImage } from '../actions/parts';
import FileDrop from './FileDrop';

class PartForm extends React.Component {
  defaults = {
    name: '',
    description: '',
    number: '',
    price: '',
    sale_price: '',
    qty_on_hand: '',
    image: '',
    specifications: [],
    features: [],
    specName: '',
    specValue: '',
    fetature: '',
    onSale: false,
  }

  state = {...this.defaults, part: {} }

  componentDidMount() {
    let { part } = this.props; if (part) {
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

  openModal = (part) => {
    this.setState({ ...this.defaults, part })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { dispatch, part } = this.props;
    let { onSale, feature, specName, specValue, ...rest } = this.state;
    if (rest.category) {
      let { category, ...p } = rest
      if (part) {
        dispatch(updatePart({part_category_id: category, ...p}, part.id))
        this.props.toggleEdit()
      } else {
        dispatch(addPart({part_category_id: category, ...p}, this.openModal))
      }
    } else {
      dispatch(setFlash('Please select a category', 'error'))
      window.scrollTo(0,0)
    }
  }

  render() {
    let { name, description, number, price, sale_price, qty_on_hand, specifications, features, onSale, specName, specValue, feature, category, part } = this.state;
    return (
      <div>
        <Modal
          closeIcon={true}
          onClose={() => { this.setState({ part: {} }) }}
          open={part.id ? true : false}
        >
          <Modal.Header>Add Photo To {part.name}</Modal.Header>
          <Modal.Content>
            <FileDrop
              url={`/api/parts/${part.id}/file_upload`}
              column='image'
              cb={() => { this.setState({ part: {} }) }}
            />
          </Modal.Content>
        </Modal>
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
              <Grid.Column computer={16} tablet={16} mobile={16}>
                <Button fluid basic inverted type="button" onClick={this.addSpec}>Add Spec +</Button>
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
            placholder='Feature Name'
            value={feature || ''}
            onChange={this.handleChange}
          />
          <Button fluid basic inverted type="button" onClick={this.addFeature}>Add Feature +</Button>
          { this.props.part &&
            <div>
              <Divider />
              <FileDrop
                url={`/api/parts/${this.props.part.id}/file_upload`}
                column='image'
                action={uploadPartImage}
                imgSrc={this.props.part.image}
              />
              <Divider />
              <Button fluid onClick={this.props.toggleEdit}>Cancel</Button>
            </div>
          }
          <Button fluid secondary>{this.props.part ? 'Update' : 'Add'} Part</Button>
        </Form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { partCategories: state.partCategories };
}

export default connect(mapStateToProps)(PartForm);
