import React, { Component } from 'react';
import { Header, Form, Button, Segment } from 'semantic-ui-react';
import { handleLogin } from '../actions/auth';
import { connect } from 'react-redux';

class Login extends Component {
  defaults = { email: '', password: '' }
  state = { ...this.defaults }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { history, dispatch } = this.props;
    let { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    let { title } = this.props;
    let { email, password } = this.state;
    return (
      <div>
        <Header as="h1" textAlign='center'>Admin {title}</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            id="email"
            label="email"
            required
            type="email"
            onChange={this.handleChange}
            value={email}
          />
          <Form.Input
            id="password"
            label="password"
            required
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          <Segment basic textAlign='center'>
            <Button secondary>Submit</Button>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default connect()(Login);
