import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import GroupCard from './GroupCard';
import GroupList from './GroupList';
import GroupMembersContainer from './GroupMembersContainer';
import GroupEventsContainer from './GroupEventsContainer';
import UserGroupsList from './UserGroupsList';


class GroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroups: false
    }
    this.getCurrentGroup = this.getCurrentGroup.bind(this);
    this.toggleGroups = this.toggleGroups.bind(this);
  }

  toggleGroups() {
    this.setState((prevState) => {
      return { allGroups: !prevState.allGroups }
    })
  }

  getCurrentGroup(e) {
    let currentGroup = this.props.allGroups.find((group) => {
      return group.id = e.target.dataset.eventId
    })
    this.setState({
      currentGroup: currentGroup
    })
  }

  render() {
    console.log("Groups Con", this.state);
    let selectedGroup = this.state.allGroups ? this.props.allGroups : this.props.userGroups
    return (
<Grid divided>
  <Grid.Row>
    <Grid.Column width={8}>
      <button type="button" onClick={this.toggleGroups}>Toggle Groups</button>

      {this.props.userGroups && <UserGroupsList groups={selectedGroup} getGroup={this.getCurrentGroup} />}
      <p>testing paragraph</p>
    </Grid.Column>
    <Grid.Column width={8}>
      Group
      {this.state.currentGroup && <div> <GroupMembersContainer group={this.state.currentGroup} />
        <GroupEventsContainer user={this.props.user} group={this.state.currentGroup} /> </div>}
    </Grid.Column>
  </Grid.Row>
</Grid>)
  }
}

export default GroupsContainer

{/* <GroupList user={this.props.user}
  groups={selectedGroup}
  getCurrentGroup={this.getCurrentGroup}
  games={this.state.userGames}/> */}
