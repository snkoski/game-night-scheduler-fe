import React, { Component } from 'react'

class VotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: []
    }
  }

  componentDidMount() {
    console.log("VOTE PAGE");
    fetch(`http://localhost:3000/api/v1/events/6/votes`)
    .then(resp => resp.json())
    .then(votes => this.setState({ votes }))
  }

  render() {
    return (
      <div className="container">
        <h1>VotePage</h1>
      </div>
    )
  }
}

export default VotePage
