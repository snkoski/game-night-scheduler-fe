import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  state = {
    fields: {
      username: '',
      password: ''
    }
  };

  handleChange = (e) => {
    const newFields = {...this.state.fields, [e.target.name]: e.target.value}
    this.setState({
      fields: newFields
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.fields)
    }
    fetch("http://localhost:3000/api/v1/login", options)
      .then(resp => resp.json())
      .then(user => {
        this.props.onLogin(user)
      })
      // If login works do this
      .then(() => this.props.showWelcome())
  };

  render() {
    const { fields } = this.state
    return (
      <div className="LoginForm container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-input username-input">
            <input type="text"
              name="username"
              placeholder="Username"
              value={fields.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input password-input">
            <input type="password"
              name="password"
              placeholder="Password"
              value={fields.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="button login-button">
            <button type="submit">Submit</button>
          </div>
        </form>
        <h3 id="signup" onClick={this.props.onNavBarClick}>Not a member? Click here to sign up</h3>
      </div>
    )
  }
}

export default LoginForm;
