import React, { Component } from 'react';
import GroupCard from './GroupCard';
import PropTypes from 'prop-types';

export default class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.renderGroups = this.renderGroups.bind(this);
  }

  componentDidUpdate() {
    console.log("GROUP LIST DID UPDATE", this.props.user.id);

  }

  renderGroups() {
    // console.log("GROUP PROPS", typeof this.props.groups);
    // console.log(Array.isArray(this.props.groups));
    if(Array.isArray(this.props.groups)) {
      return (
        <div>{this.props.groups.map((group) => {
          return (

            <GroupCard key={group.id} group={group} user={this.props.user}
              /*addGroup={this.props.addGroup}*/ getCurrentGroup={this.props.getCurrentGroup} />

          )
        })}</div>
      )
    }
    return null
  }

  render() {
    return (
      this.renderGroups()
  )
    // return (
    //   <div>{this.props.groups.map((group) => {
    //     return (
    //       <GroupCard key={group.id} group={group} user={this.props.user} addGroup={this.props.addGroup} getCurrentGroup={this.props.getCurrentGroup}/>
    //     )
    //   })}</div>
    // )
  }
}

GroupList.propTypes = {
  user: PropTypes.object.isRequired,
  // groups: PropTypes.array.isRequired,
  // addGroup: PropTypes.func,
  // games: PropTypes.array
}
