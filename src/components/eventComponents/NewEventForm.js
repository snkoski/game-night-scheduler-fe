import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: `${this.props.user.username}'s Game Night`,
        time: '',
        date: '',
        created_by: this.props.user.id
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const newFields = {...this.state.fields, [e.target.name]: e.target.value}
    this.setState({
      fields: newFields
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
    }
    fetch("http://localhost:3000/api/v1/events", options)
    .then(resp => resp.json())
    .then(() => this.props.goHome())
  }

  render() {
    const { fields } = this.state

    return (
      <div className="NewEventForm container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text"
              name="name"
              // placeholder="Event Name"
              value={fields.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="time"
              name="time"
              placeholder="Time"
              value={fields.time}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input type="date"
              name="date"
              placeholder="Date"
              value={fields.date}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

NewEventForm.propTypes = {
  user: PropTypes.object.isRequired,
  goHome: PropTypes.func.isRequired
}
