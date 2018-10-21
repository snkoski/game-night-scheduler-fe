import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { Route, Link } from 'react-router-dom';
import AddGamesToVote from '../voteComponents/AddGamesToVote';
import VotePage from '../voteComponents/VotePage';

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
        // if (members.find((member) => member.username === this.props.user.username)) this.setState({ joinedEvent: true })
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
    const onGroupPage = this.props.cancelEvent && this.props.event.created_by === this.props.user.id
    return (
      <div className="EventCard">
        <p>{this.props.event.name}</p>
        <p>Location: {this.props.event.location}</p>
        <p>{this.formatDate(this.props.event.date)}</p>
        <p>{this.formatTime(this.props.event.time)}</p>
        <p>Max Players: {this.props.event.max_users}</p>
        {this.props.member && <p> Created By: {this.props.member.username}</p>}
        <p>{this.props.event.description}</p>

        {this.state.joinedEvent ? <p>You're Going</p> : this.props.event.current_users >= this.props.event.max_users ? <p>Event Is Full</p> : <button type="button" onClick={this.joinEvent}>Join Event</button>}
        <br/>
        {/* <button type="button">Add games to vote</button> */}
        <Link to="/add">Add</Link>
        <button type="button">Vote for games</button>
        <button type="button" onClick={this.showMembers}>{this.state.showMembers ? "Hide Members" : "Show Members" }</button>

        {this.state.showMembers ? <ul>{this.state.members.map((member) => {
          return <li key={member.id}>{member.username}</li>
        })}</ul> : null}

        {onGroupPage && <button type="button" onClick={() => this.props.cancelEvent(this.props.event.id)}>Cancel Event</button>}


        {/* <Route path="/add" render={(() => {
          return <VotePage
            // user={this.props.user}
            // event={this.props.event}
            // games={this.state.userGames}
          />
        })} /> */}
      </div>
    )
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  // member: PropTypes.object,
  user: PropTypes.object.isRequired,
  cancelEvent: PropTypes.func
}
