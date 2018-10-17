import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard'

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    // debugger
    return (
      <div>
        {this.props.events && this.props.events.map((event) => {
          return <EventCard key={event.id} user={this.props.user} event={event} /*member={this.props.members.find((member) => member.id === event.created_by)} user={this.props.user} cancelEvent={this.props.cancelEvent}*//>
        })}
      </div>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.array,
  // members: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  // cancelEvent: PropTypes.func.isRequired
}
