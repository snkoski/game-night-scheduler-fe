import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AllGroupsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    }
    this.fetchAllGroups = this.fetchAllGroups.bind(this);
  }

  componentDidMount() {
    this.fetchAllGroups()
  }

  fetchAllGroups() {
    fetch(`http://localhost:3000/api/v1/groups`)
      .then(resp => resp.json())
      .then(allGroups => this.setState({ allGroups }))
  }

  render() {
    return (
      
    )
  }

}

export default AllGroupsContainer;
