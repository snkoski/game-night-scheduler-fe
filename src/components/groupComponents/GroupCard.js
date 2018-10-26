import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Link, Route, withRouter } from 'react-router-dom';
import NewEventForm from '../eventComponents/NewEventForm';


class GroupCard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   users: []
    // }
    this.joinGroup = this.joinGroup.bind(this);
    // this.fetchMembers = this.fetchMembers.bind(this);
  }

  componentDidMount() {
    // this.fetchMembers()
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("USER HOME DID UPDATE", this.props.user.id);
    // if (this.props !== prevProps) {
    //   this.fetchMembers()
    // }
  }

  joinGroup() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({group_id: this.props.group.id})
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/join_group`, options)
      .then(resp => resp.json())
      .then(user => this.setState({
        users: [...this.state.users, user]
      }))
      .then(() => {
        this.props.addUserToGroup(this.props.group)
      })
  }

  // fetchMembers() {
  //   fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}/users`)
  //     .then(resp => resp.json())
  //     .then(users => this.setState({ users }))
  // }

  render() {
    console.log("GROUp CARD PROPS", this.props);
    console.log("GROUP CARD STATE", this.state);
    // const member = this.state.users.filter((user) => {
    //   return user.id === this.props.user.id
    // }).length
    // console.log("MEMBER", member);
    return (
      <div >
        <h3>{this.props.group.name}</h3>
        <p>Number of members: {this.props.group.number_of_members}</p>
        <p>Meeting day: {this.props.group.regular_meeting_day ? this.props.group.regular_meeting_day : 'TBA'}</p>
        {/* {!member ? <Button className="link" onClick={this.joinGroup}>Join Group</Button> : null } */}

        {/* {this.props.getCurrentGroup ? <Button onClick={() => this.props.getCurrentGroup(this.props.group)}>See Group </Button> : null} */}
        <button onClick={this.props.toggleShow}>Back</button>
      </div>
    )
  }
}

export default withRouter(GroupCard)

// GroupCard.propTypes = {
//   user: PropTypes.object.isRequired,
//   group: PropTypes.object.isRequired,
//   addGroup: PropTypes.func,
//   getCurrentGroup: PropTypes.func
// }
