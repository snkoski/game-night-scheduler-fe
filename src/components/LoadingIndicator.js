import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadingIndicator extends Component {
  state = {
    isPastDelay: false
  };

  componentWillMount() {
    this._delayTimer = setTimeout(() => this.setState({ isPastDelay: true }), 200
    )
  }

  componentWillUnmount() {
    clearTimeout(this._delayTimer);
  }

  render() {
    if (this.props.isLoading) {
      if (!this.state.isPastDelay) {
        return null;
      }
      return <div>loading...</div>
    }
    return this.props.children
  }
}

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
