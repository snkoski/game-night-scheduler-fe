import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';

import _ from 'lodash';
import GroupCard from './GroupCard';
import GroupList from './GroupList';
import GroupMembersContainer from './GroupMembersContainer';
import GroupEventsContainer from './GroupEventsContainer';
import UserGroupsList from './UserGroupsList';
import NewEventForm from '../eventComponents/NewEventForm';



class GroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroups: false,
      showForm: false
    }
    this.getCurrentGroup = this.getCurrentGroup.bind(this);
    this.toggleGroups = this.toggleGroups.bind(this);
    this.filterGroups = this.filterGroups.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    if (this.props.userGroups.length) {
      this.setState({ currentGroup: this.props.userGroups[0] })
    }
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

  toggleForm() {
    this.setState((prevState) => {
      return { showForm: !prevState.showForm }
    })
  }

  getCurrentGroup(e) {
    let currentGroup = this.props.allGroups.find((group) => {
      return group.id === parseInt(e.target.dataset.eventId, 10)
    })
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
    let text = this.state.allGroups ? "Other" : "Your"
    let selectedGroup = this.state.allGroups ? this.state.notIn : this.props.userGroups
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
      {this.state.currentGroup && <div><GroupCard group={this.state.currentGroup} user={this.props.user} addUserToGroup={this.props.addUserToGroup} /><button type="button" onClick={this.toggleForm}>{this.state.showForm ? "Cancel" : "New Game Night"}</button> {this.state.showForm && <NewEventForm
        closeForm={this.toggleForm}
        user={this.props.user}
        group={this.state.currentGroup} />}
        <GroupMembersContainer group={this.state.currentGroup} />
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

  // {this.state.showForm && <Route path={this.props.match.url + "/new_event"} render={(() => {
  //   return <NewEventForm
  //     user={this.props.user}
  //     group={this.state.currentGroup}
  //          />
  // })} />}
