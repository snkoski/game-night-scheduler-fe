import React, { Component } from 'react';
import EventList from '../eventComponents/EventList';

class GroupEventsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    // this.fetchGroupEvents = this.fetchGroupEvents.bind(this);
  }

  componentDidMount() {
    // this.fetchGroupEvents()
  }

  componentDidUpdate(prevProps) {
    // if (this.props !== prevProps) {
    //   this.fetchGroupEvents()
    // }
  }

  // fetchGroupEvents() {
  //   fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/events`)
  //   .then(resp => resp.json())
  //   .then(events => this.setState({
  //     events
  //   }))
  // }
render() {
    return (
      <div>
        {this.props.events && <EventList user={this.props.user} events={this.props.events} />}
      </div>
        )
  }
}

export default GroupEventsContainer;
