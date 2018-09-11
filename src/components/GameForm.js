import React from 'react';

class GameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: '',
    }
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      gameName: e.target.value
    })
  }

  handleSubmit = (e) => {
    console.log("Submitted", );
    e.preventDefault()
    this.props.addGameToList(this.state.gameName)
    this.setState({ gameName: '' })
  }

  render () {
    return (
      <div className="GameForm">
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.gameName} placeholder="Game Name" />
          <button type="submit" >Submit</button>
        </form>
      </div>
    )
  }
}

export default GameForm;
