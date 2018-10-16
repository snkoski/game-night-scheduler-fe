import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: '',
        password: ''
      },
      redirect: false
    }
  }

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
      .then(() => this.setState({
        redirect: true
      }))
  };

  render() {
    console.log(this.state.redirect);
    const { fields } = this.state

    if (this.state.redirect === true) {
      return (
        <Redirect to="/welcome" />
      )
    }

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
        <h3 id="signup" ><Link to="/signup">Not a member? Click here to sign up</Link></h3>
      </div>
    )
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}
