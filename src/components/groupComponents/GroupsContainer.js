import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import GroupCard from './GroupCard';
import GroupList from './GroupList';
import GroupMembersContainer from './GroupMembersContainer';
import GroupEventsContainer from './GroupEventsContainer';
import UserGroupsList from './UserGroupsList';


class GroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroups: false,

    }
    this.getCurrentGroup = this.getCurrentGroup.bind(this);
    this.toggleGroups = this.toggleGroups.bind(this);
    this.filterGroups = this.filterGroups.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.filterGroups()
    }
  }


  toggleGroups() {
    this.setState((prevState) => {
      return { allGroups: !prevState.allGroups }
    })
  }

  getCurrentGroup(e) {
    let currentGroup = this.props.allGroups.find((group) => {
      return group.id === parseInt(e.target.dataset.eventId, 10)
    })
    console.log("GET CURRENT GROUP", typeof e.target.dataset.eventId);
    this.setState({
      currentGroup: currentGroup
    })
  }

  filterGroups() {
    let notIn = []
    let inGroup = false
    if (this.props.allGroups.length > 0 && Array.isArray(this.props.userGroups)){
      for (let i = 0; i < this.props.allGroups.length; i++) {
        for (let j = 0; j < this.props.userGroups.length; j++) {
          if (_.isEqual(this.props.allGroups[i], this.props.userGroups[j])) {
            inGroup = true
          }
        }
        if (inGroup === false) {
          notIn.push(this.props.allGroups[i])
        }
        inGroup = false
      }
      this.setState({
        notIn: notIn
      })}
  }

  render() {
    console.log("Groups Con", this.state);
    let text = this.state.allGroups ? "Other" : "Your"
    let selectedGroup = this.state.allGroups ? this.state.notIn : this.props.userGroups
    console.log('SELECTed gROUP', selectedGroup);
    return (
<Grid divided>
  <Grid.Row>
    <Grid.Column width={8}>
      <button type="button" onClick={this.toggleGroups}>{this.state.allGroups? "See Your Groups" : "Join Another Groups"}</button>

      {selectedGroup && <UserGroupsList groups={selectedGroup} getGroup={this.getCurrentGroup} text={text} />}
      <p>testing paragraph</p>
    </Grid.Column>
    <Grid.Column width={8}>
      Group
      {this.state.currentGroup && <div><GroupCard group={this.state.currentGroup} user={this.props.user} addUserToGroup={this.props.addUserToGroup} /> <GroupMembersContainer group={this.state.currentGroup} />
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
