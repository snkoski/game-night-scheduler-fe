import React, { Component } from 'react';
import _ from 'lodash';

import UserGroupsList from './UserGroupsList';
import GroupCard from './GroupCard';
import GroupMembersContainer from './GroupMembersContainer';
import GroupEventsContainer from './GroupEventsContainer';

class NewGroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroups: [],
      userGroups: [],
      nonUserGroups: [],
      selectedGroup: {},
      // selectedGroupMembers: [],
      // selectedGroupEvents: [],
      showNonUserGroups: false,
      showGroup: false
    }
    this.renderPage = this.renderPage.bind(this)
  }

  componentDidMount() {
    console.log("GROUP CONTAINER DID MOUNT");
    this.fetchUserGroups()
    this.fetchAllGroups()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.allGroups !== nextState.allGroups
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.fetchUserGroups()
      this.fetchAllGroups()
    }
  }

  fetchUserGroups = () => {
    console.log("FETCH USER GROUPS");
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/groups`)
      .then(resp => resp.json())
      .then(userGroups => this.setState({ userGroups }, () => {
        this.filterGroups()}))
  }

  fetchAllGroups = () => {
    fetch(`http://localhost:3000/api/v1/groups`)
      .then(resp => resp.json())
      .then(allGroups => this.setState({ allGroups }, () => {
        this.filterGroups()
      })

    )
  }

  fetchGroupMembers(id) {
    fetch(`http://localhost:3000/api/v1/groups/${id}/users`)
    .then(resp => resp.json())
    .then(selectedGroupMembers => this.setState({
      selectedGroupMembers
    }))
  }

  fetchGroupEvents(id) {
    fetch(`http://localhost:3000/api/v1/groups/${id}/events`)
    .then(resp => resp.json())
    .then(selectedGroupEvents => this.setState({
      selectedGroupEvents
    }))
  }

  getCurrentGroup = (e) => {
    console.log("DATASET", e.target.dataset.eventId);
    let selectedGroup = this.state.allGroups.find((group) => {
      return group.id === parseInt(e.target.dataset.eventId, 10)
    })
    this.setState({
      selectedGroup: selectedGroup,
      showGroup: true
    })
    console.log("SELECTED GROUP", this.state.selectedGroup);
    this.fetchGroupEvents(selectedGroup.id)
    console.log("SELECTED GROUPEVENT", this.state.selectedGroupEvents);
    this.fetchGroupMembers(selectedGroup.id)
    console.log("SELECTED GROUP MEMBERS", this.state.selectedGroupMembers);

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
      return { showNonUserGroups: !prevState.showNonUserGroups}
    })
  }

  toggleShow = () => {
    this.setState((prevState) => {
      return { showGroup: !prevState.showGroup }
    })
  }

  renderPage() {
    if (this.state.showGroup) {
      return (
        <div>
          <GroupCard group={this.state.selectedGroup} user={this.props.user} members={this.state.selectedGroupMembers} events={this.state.selectedGroupEvents} toggleShow={this.toggleShow}/*addUserToGroup={this.props.addUserToGroup}*/ />
          <GroupMembersContainer members={this.state.selectedGroupMembers} />
          <GroupEventsContainer events={this.state.selectedGroupEvents} user={this.props.user} />
        </div>
      )
    }

    return (
      <div>
        <h1>NEW GROUPS CONTAINER</h1>
        <button type="button" onClick={this.showAllToggle}>{this.state.showNonUserGroups ? "Not In" : "USer Groups"}</button>
        {this.state.showNonUserGroups ? (<UserGroupsList groups={this.state.nonUserGroups} getGroup={this.getCurrentGroup}/>) : (<UserGroupsList groups={this.state.userGroups} getGroup={this.getCurrentGroup}/>)}
      </div>
    )
  }

  render() {
    console.log("RENDER", this.state);
    return this.renderPage()
  }
}

export default NewGroupsContainer;
