import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log("EVENT CARD PROPS:", this.props);
    return (
      <div>
        <p>{this.props.event.name}</p>
        <p>{this.props.event.date}</p>
        <p>{this.props.event.time}</p>
        <p>{this.props.member.username}</p>
      </div>
    )
  }
}
