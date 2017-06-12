import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Header, Divider, Segment, Icon } from 'semantic-ui-react'
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import $ from 'jquery';

class Contact extends Component {
  defaults = { firstName: '', lastName: '', email: '', phone: '', message: '' };
  state = { ...this.defaults };

  handleSubmit = (e) => {
    let { dispatch } = this.props;

    e.preventDefault();
    $.ajax({
      url: '/api/contact',
      type: 'POST',
      dataType: 'JSON',
      data: { contact: this.state }
    }).done( data => {
      dispatch(setFlash('Your message has been sent!', 'success'));
      this.setState({ ...this.defaults });
    }).fail( data => {
      dispatch(setFlash('Something went wrong. Please try again.', 'error'));
    });
  }

  setValue = (e) => {
    let { target: { id, value } } = e;
    this.setState({[id]: value })
  }

  render() {
    let { firstName, lastName, email, phone, message } = this.state;

    return(
      <Segment basic>
        <Header as='h1' textAlign='center'>Contact Us!</Header>
        <Segment basic textAlign='center'>
          <Icon name='envelope' size='huge' />
        </Segment>
        <Divider clearing />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
              autoFocus
              required
              id='firstName'
              value={firstName}
              onChange={this.setValue}
              control={Input}
              label='First Name'
              placeholder='First Name'
            />
            <Form.Field
              id='lastName'
              value={lastName}
              onChange={this.setValue}
              required
              control={Input}
              label='Last Name'
              placeholder='Last Name'
          />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              id='email'
              value={email}
              onChange={this.setValue}
              required
              control={Input} label='Email'
              placeholder='Email'
            />
            <Form.Field
              id='phone'
              value={phone}
              onChange={this.setValue}
              required
              control={Input}
              label='Phone'
              placeholder='Phone'
          />
          </Form.Group>
          <Form.Field
            id='message'
            value={message}
            onChange={this.setValue}
            required
            control={TextArea}
            label='Message'
            placeholder='Your Message...'
          />
          <Segment basic textAlign='center'>
            <Form.Field control={Button} secondary>Submit</Form.Field>
          </Segment>
        </Form>
     </Segment>
    );
  }
}

export default connect()(Contact);
