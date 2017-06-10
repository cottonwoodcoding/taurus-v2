import React, { Component } from 'react';
import { Header, Button, Form, Input, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateSite } from '../actions/site';
import FileDrop from './FileDrop';

class AdminSite extends Component {
  defaults = { phone: '', street: '', city: '', state: '', zip: '', main_logo_url: '', nav_logo_url: '' };
  state = { ...this.defaults };

  componentDidMount() {
    this.setState({ ...this.props.site });
  }

  componentDidUpdate(prevProps) {
    if(this.props.site !== prevProps.site)
      this.setState({ ...this.props.site });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(updateSite(this.state));
  }

  setValue = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    let { phone, street, city, state, zip, main_logo_url, nav_logo_url } = this.state;

    return(
      <Segment basic textAlign='center' style={{ width: '100%' }}>
        <Header as='h2'>Site Settings</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Phone</label>
              <Input
                id='phone'
                onChange={ this.setValue }
                placeholder='Phone'
                value={phone}
                required
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Street</label>
              <Input
                id='street'
                onChange={ this.setValue }
                placeholder='Street'
                value={street}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <Input
                id='city'
                onChange={ this.setValue }
                placeholder='City'
                value={city}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>state</label>
              <Input
                id='state'
                onChange={ this.setValue }
                placeholder='State'
                value={state}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Zip</label>
              <Input
                id='zip'
                onChange={ this.setValue }
                placeholder='Zip'
                value={zip}
                required
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Main Logo - <i> Click To Upload A New File </i> </label>
              <FileDrop
                url='/api/site/file_upload?column=main_logo_url'
                column='main_logo_url'
                action={updateSite}
                imgSrc={main_logo_url}
            />
            </Form.Field>
            <Form.Field>
              <label>Navbar Logo - <i> Click To Upload A New File </i> </label>
              <FileDrop
                url='/api/site/file_upload?column=nav_logo_url'
                column='nav_logo_url'
                action={updateSite}
                imgSrc={nav_logo_url}
            />
            </Form.Field>
          </Form.Group>
          <Button secondary type='submit'>Save Site Settings</Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { site: state.site };
}

export default connect(mapStateToProps)(AdminSite);
