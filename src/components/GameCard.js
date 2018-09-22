import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export default class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true
    }
    this.onGameClick = this.onGameClick.bind(this);
    this.renderGameCard = this.renderGameCard.bind(this);
    // this.removeUnicode = this.removeUnicode.bind(this);
  }

  onGameClick() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  // removeUnicode(string) {
  //   string = string.replace(/&#10;/g, " ")
  //   .replace(/&quot;|&rdquo;|&ldquo;/g, "\"")
  //   .replace(/&rsquo;/g, "'")
  //   .replace(/&#226;&#128;&#147;|&mdash;|&ndash;/g, "-")
  //   .replace(/&#195;&#137;/g, "É")
  //   .replace(/&eacute;|&#195;&#169;/g, "é")
  //   .replace(/&amp;/g, "&")
  //   .replace(/&trade;/g, "™")
  //   .replace(/&#9;/g, "")
  //   .replace(/&gt;/g, ">")
  //   .replace(/&lsquo;/g, "‘")
  //   .replace(/&aacute;/g, "á")
  //   .replace(/&times;/g, "×")
  //   .replace(/&shy;/g, "")
  //   .replace(/&uml;/g, "¨")
  //   .replace(/&reg;/g, "®")
  //   .replace(/&auml;/g, "ä")
  //   .replace(/&uuml;/g, "ü")
  //   .replace(/&plusmn;/g, "±")
  //   .replace(/&bull;/g, "•")
  //   .replace(/&ccedil;/g, "ç")
  //   .replace(/&agrave;/g, "à")
  //   .replace(/&ecirc;/g, "ê")
  //   .replace(/&egrave;/g, "è")
  //   .replace(/&#195;&#156;|&Uuml;/g, "Ü")
  //
  //   return string
  // }

  renderGameCard() {
    // const description = this.removeUnicode(this.props.game.description)
    // debugger
    if (this.state.clicked === true) {
    return (<List.Item /*onClick={this.onGameClick}*/>
      <List.Content>
        <List.Header>
          {this.props.game.name}
        </List.Header>
        <img src={this.props.game.thumbnail} />
        <p>Player Count - Min: {this.props.game.min_players} Max: {this.props.game.max_players}</p>
        <p>Play Time - {this.props.game.play_time} minutes</p>
        <p>Description - {this.props.game.description}</p>
      </List.Content>
    </List.Item>)
    }
  return (<List.Item onClick={this.onGameClick}>
    <List.Content>
      <List.Header>
        {this.props.game.name}
      </List.Header>
    </List.Content>
  </List.Item>)
  }

  render() {
    return (
      this.renderGameCard()
    )
  }
}
