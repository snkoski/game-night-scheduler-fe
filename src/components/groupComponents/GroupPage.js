import React, { Component } from 'react';
import EventList from '../eventComponents/EventList';
// import UserGames from '../gameComponents/UserGames';

export default class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      events: []
      // showGames: false
    }
    this.renderMembers = this.renderMembers.bind(this);
    this.fetchGroupMembers = this.fetchGroupMembers.bind(this);
    this.fetchGroupEvents = this.fetchGroupEvents.bind(this);
    // this.showMemberGames = this.showMemberGames.bind(this);
    // this.toggleShowGames = this.toggleShowGames.bind(this);
  }

  componentDidMount() {
    this.fetchGroupMembers()
    this.fetchGroupEvents()
  }

  fetchGroupEvents() {
    fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/events`)
    .then(resp => resp.json())
    .then(events => this.setState({
      events
    }))
  }

  fetchGroupMembers() {
    fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/users`)
    .then(resp => resp.json())
    .then(members => this.setState({
      members
    }))
  }

  renderMembers() {
    if (this.state.members.length > 0) {
      return (
        <div>
          <EventList events={this.state.events} members={this.state.members}/>
          <ul>
            {this.state.members.map((member) => {
              return <li key={member.id} onClick={this.toggleShowGames}>
                {member.username} - {member.email}
                {/* {this.showMemberGames()} */}
              </li>
            })}
          </ul>
          <button type="button" onClick={this.props.newEvent}>Make New Event</button>
        </div>
      )
    }
    return (
      <p>no members</p>
    )
  }

  // toggleShowGames() {
  //   this.setState((prevState, props) => {
  //     return { showGames: !prevState.showGames }
  //   })
  // }
  //
  // showMemberGames() {
  //   if (this.state.showGames === true) {
  //     return (
  //       <UserGames user={this.props.user} /*gameSearch={this.state.search}*/ games={this.state.userGames}/>
  //     )
  //   }
  //   return (
  //     <h3>no</h3>
  //   )
  //
  // }

  render() {
    return (
      <div className="GroupPage container">
        <h1>{this.props.group.name}</h1>
        {this.renderMembers()}
      </div>
    )
  }
}
