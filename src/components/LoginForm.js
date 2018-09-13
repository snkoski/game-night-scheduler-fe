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
    e.preventDefault()
  }

  render() {
    return (
      // const { fields } = this.state
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
          <div className="form-input username-input">
            <input type="text"
              name="username"
              placeholder="Username"
              value={this.state.fields.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input password-input">
            <input type="password"
              name="password"
              placeholder="Password"
              value={this.state.fields.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="button login-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;
