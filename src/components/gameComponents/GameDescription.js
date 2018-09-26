import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

export default class GameDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      short_description: true
    }
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  toggleDescription() {
    this.setState((prevState, props) => {
      return {short_description: !prevState.short_description}
    })
  }

  render() {
    const { description } = this.props;
    if (this.state.short_description) {
      return (<List.Content>
        {description.substr(0, 200)}...
        <a className="game-description" onClick={this.toggleDescription}>Show full description</a>
      </List.Content>)
    }
    return (<List.Content>
      {description}
      <br/>
      <a className="game-description" onClick={this.toggleDescription}>Show less</a>
    </List.Content>)
  }
}

GameDescription.propTypes = {
  description: PropTypes.string.isRequired
}
