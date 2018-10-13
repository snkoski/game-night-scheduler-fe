import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedEvent: false,
      members: [],
      showMembers: false
    }
    this.formatDate = this.formatDate.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.fetchMembers = this.fetchMembers.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
    this.showMembers = this.showMembers.bind(this);
  }

  componentDidMount() {
    this.fetchMembers()

  }

  formatDate(date) {
    return moment(date).format("dddd, MMMM Do YYYY");
  }

  formatTime(time) {
    return moment(time).utcOffset("Z").format("h:mm a");
  }

  fetchMembers() {
    fetch(`http://localhost:3000/api/v1/events/${this.props.event.id}/users`)
      .then(resp => resp.json())
      .then(members => {
        this.setState({ members })
        if (members.find((member) => member.username === this.props.user.username)) this.setState({ joinedEvent: true })
      })

  }

  joinEvent() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({event_id: this.props.event.id})
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/join_event`, options)
      .then(resp => resp.json())
      .then(member => this.setState({
        members: [...this.state.members, member],
        joinedEvent: true
      }))
  }

  showMembers() {
    this.setState((prevState, props) => {
      return { showMembers: !this.state.showMembers }
    })
  }

  render() {

    return (
      <div>
        <p>{this.props.event.name}</p>
        <p>{this.formatDate(this.props.event.date)}</p>
        <p>{this.formatTime(this.props.event.time)}</p>
        <p>Created By: {this.props.member.username}</p>
        {this.state.joinedEvent ? <p>You're Going</p> : <button type="button" onClick={this.joinEvent}>Join Event</button>}
        <br/>
        <button type="button" onClick={this.showMembers}>{this.state.showMembers ? "Hide Members" : "Show Members" }</button>

        {this.state.showMembers ? <ul>{this.state.members.map((member) => {
          return <li key={member.id}>{member.username}</li>
        })}</ul> : null}

      </div>
    )
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
