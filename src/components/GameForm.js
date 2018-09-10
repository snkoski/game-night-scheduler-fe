import React from 'react';

class GameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      gameName: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
  }
  render () {
    return (
      <div className="GameForm">
        <form>
          <input type="text" onChange={this.handleChange} value={this.state.gameName} placeholder="Game Name" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default GameForm;
