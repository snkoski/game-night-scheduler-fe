import React, { Component } from 'react';
import GroupMembersList from './GroupMembersList';

class GroupMembersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    // this.fetchGroupMembers = this.fetchGroupMembers.bind(this);
  }

  componentDidMount() {
    // this.fetchGroupMembers()
  }

  componentDidUpdate(prevProps) {
    // if (this.props !== prevProps) {
    //   this.fetchGroupMembers()
    // }
  }

  // fetchGroupMembers() {
  //   fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/users`)
  //   .then(resp => resp.json())
  //   .then(members => this.setState({
  //     members
  //   }))
  // }

  render() {
    return (
      <div>
        {this.props.members && <GroupMembersList members={this.props.members}/>}
      </div>
        )
  }
}

export default GroupMembersContainer;
