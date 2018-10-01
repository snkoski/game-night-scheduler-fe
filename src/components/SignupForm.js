import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // signedUp: false,
      fields: {
        username: '',
        email: '',
        password: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    console.log(e.target);
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.state.fields)
      };
      fetch('http://localhost:3000/api/v1/users', options)
        .then(resp => resp.json())
        .then(user => {
          this.props.onLogin(user);
        })
  }

  render() {
    return (
      <Form className="SignupForm container" onSubmit={this.handleSubmit}>
        <h1>SIGN UP</h1>
        <Form.Field>
          <label>Username</label>
          <input type="text"
            placeholder="Username"
            name="username"
            value={this.state.fields.username}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input type="text"
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password"
            placeholder="Password"
            name="password"
            value={this.state.fields.password}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

SignupForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}
