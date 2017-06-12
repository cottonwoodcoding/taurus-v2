import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Header, Divider, Segment, Icon } from 'semantic-ui-react'
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import $ from 'jquery';
import ReCAPTCHA from "react-google-recaptcha";

class Contact extends Component {
  defaults = { firstName: '', lastName: '', email: '', phone: '', message: '' };
  state = { ...this.defaults, recaptchaCompleted: false };

  handleSubmit = (e) => {
    e.preventDefault();
    let { dispatch } = this.props;
    if(this.state.recaptchaCompleted) {
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
      }).always( data => {
        this.refs.recaptcha.reset();
      });
    } else {
      alert('You need to complete the reCAPTCHA!');
    }
  }

  setValue = (e) => {
    let { target: { id, value } } = e;
    this.setState({[id]: value })
  }

  recaptchaSuccess = (e) => {
    this.setState({ recaptchaCompleted: true });
  }

  render() {
    let { firstName, lastName, email, phone, message } = this.state;
    let { site } = this.props;

    return(
      <Segment basic>
        <Header as='h1' textAlign='center'>Contact Us!</Header>
        <a href={`tel:${site.phone.replace(/\D/g,'')}`}>
          <Header as='h1' textAlign='center'>{site.phone}</Header>
        </a>
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
          <ReCAPTCHA
            ref="recaptcha"
            sitekey="6LeUMiUUAAAAALys_LmkIMk-11uyYJPyTz-8DVVm"
            onChange={this.recaptchaSuccess}
            theme='dark'
          />
          <Segment basic textAlign='center'>
            <Form.Field control={Button} secondary>Submit</Form.Field>
          </Segment>
        </Form>
     </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { site: state.site };
}

export default connect(mapStateToProps)(Contact);
