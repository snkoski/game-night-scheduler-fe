import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard';

export default class UserEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEvents: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/events`)
    .then(resp => resp.json())
    .then(userEvents => this.setState({
      userEvents
    }))
  }

  render() {
    console.log("USER EVENTS: ", this.state.userEvents);
    return (
      <div>{this.state.userEvents.map((event) => {
        return <EventCard key={event.id} event={event} /*member={this.props.members.find((member) => member.id === event.created_by)}*/ user={this.props.user} /*cancelEvent={this.props.cancelEvent}*//>
      })}</div>
    )
  }
}

UserEventList.propTypes = {
  user: PropTypes.object.isRequired,
  

}
