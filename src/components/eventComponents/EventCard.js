import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.formatDate = this.formatDate.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  formatDate(date) {
    return moment(date).format("dddd, MMMM Do YYYY");
  }

  formatTime(time) {
    return moment(time).format("h:mm a");
  }

  render() {
    return (
      <div>
        <p>{this.props.event.name}</p>
        <p>{this.formatDate(this.props.event.date)}</p>
        <p>{this.formatTime(this.props.event.time)}</p>
        <p>Created By: {this.props.member.username}</p>
      </div>
    )
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired
}
