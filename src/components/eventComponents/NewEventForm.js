import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

export default class NewEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: `${this.props.user.username}'s ${this.props.group.name} Game Night`,
        time: '',
        date: '',
        location: '',
        max_users: '',
        description: '',
        created_by: this.props.user.id,
        group_id: this.props.group.id
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.joinEvent = this.joinEvent.bind(this);
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
    fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/events`, options)
    .then(resp => resp.json())
    .then(() => this.props.goHome())
  }

  render() {
    const { fields } = this.state
    let today = moment().format("YYYY-MM-DD")

    return (
      <div className="NewEventForm container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="text"
              name="name"
              value={fields.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="text"
              name="location"
              placeholder="Location"
              value={fields.location}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input type="number"
              name="max_users"
              placeholder="Max Players"
              value={fields.max_users}
              onChange={this.handleChange}
              required
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
              min={today}
              required
            />
          </div>
          <textarea
            rows="10"
            cols="70"
            name="description"
            placeholder="Event Description"
            value={fields.description}
            onChange={this.handleChange}
          />
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
