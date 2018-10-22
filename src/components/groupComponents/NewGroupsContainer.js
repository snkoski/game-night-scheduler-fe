import React, { Component } from 'react';
import _ from 'lodash';

import UserGroupsList from './UserGroupsList';

class NewGroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroups: [],
      userGroups: [],
      nonUserGroups: [],
      selectedGroup: {},
      selectedGroupMembers: [],
      selectedGroupEvents: [],
      showAllGroups: false
    }
  }

  componentDidMount() {
    this.fetchUserGroups()
    this.fetchAllGroups()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.fetchUserGroups()
      this.fetchAllGroups()
    }
  }

  fetchUserGroups = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/groups`)
      .then(resp => resp.json())
      .then(userGroups => this.setState({ userGroups }))
  }

  fetchAllGroups = () => {
    fetch(`http://localhost:3000/api/v1/groups`)
      .then(resp => resp.json())
      .then(allGroups => this.setState({ allGroups }, () => {
        this.filterGroups()
      })

    )
  }

  fetchGroupMembers() {
    fetch(`http://localhost:3000/api/v1/groups/${this.state.selectedGroup.id}/users`)
    .then(resp => resp.json())
    .then(members => this.setState({
      members
    }))
  }

  fetchGroupEvents() {
    fetch(`http://localhost:3000/api/v1/groups/${this.state.selectedGroup.id}/events`)
    .then(resp => resp.json())
    .then(events => this.setState({
      events
    }))
  }

  getCurrentGroup = (e) => {
    console.log("DATASET", e.target.dataset.eventId);
    let selectedGroup = this.state.allGroups.find((group) => {
      return group.id === parseInt(e.target.dataset.eventId, 10)
    })
    this.setState({
      selectedGroup: selectedGroup
    })
    console.log(this.state.selectedGroup);
  }

  filterGroups = () => {
    console.log("FILTER");
    let nonUserGroups = []
    let inGroup = false
    if (this.state.allGroups.length > 0 && Array.isArray(this.state.userGroups)){
      for (let i = 0; i < this.state.allGroups.length; i++) {
        for (let j = 0; j < this.state.userGroups.length; j++) {
          if (_.isEqual(this.state.allGroups[i], this.state.userGroups[j])) {
            inGroup = true
          }
        }
        if (inGroup === false) {
          nonUserGroups.push(this.state.allGroups[i])
        }
        inGroup = false
      }
      this.setState({
        nonUserGroups: nonUserGroups
      })}
  }

  showAllToggle = () => {
    this.setState((prevState) => {
      return { showAllGroups: !prevState.showAllGroups}
    })
  }

  render() {
    console.log("RENDER", this.state);
    return (
      <div>
        <h1>NEW GROUPS CONTAINER</h1>
        <button type="button" onClick={this.showAllToggle}>Switch</button>
        {this.state.showAllGroups ? (<UserGroupsList groups={this.state.nonUserGroups} getGroup={this.getCurrentGroup}/>) : (<UserGroupsList groups={this.state.userGroups} getGroup={this.getCurrentGroup}/>)}
      </div>
    )
  }
}

export default NewGroupsContainer;
