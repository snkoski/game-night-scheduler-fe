import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom';
import Welcome from '../Welcome';

export default class AddGamesToVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventGames: []
    }
  }

  render() {
    return (
      <div>You can Add Games to vote on Here
        <Link to="/home">Add</Link>
        <Route path="/home" component={Welcome} />
      </div>
    )
  }
}

AddGamesToVote.propTypes = {
  // userGames: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired
}
