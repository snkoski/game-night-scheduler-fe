import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import UserGames from './gameComponents/UserGames';
import SearchBar from './SearchBar';
import GroupList from './groupComponents/GroupList';
import UserEventList from './eventComponents/UserEventList';
import GamesContainer from './gameComponents/GamesContainer';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      userGames: [],
      userGroups: [],
      allGroups: [],
      groupsToogle: true
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getUserGames = this.getUserGames.bind(this);
    this.fetchUserGroups = this.fetchUserGroups.bind(this);
    this.fetchAllGroups = this.fetchAllGroups.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.renderGroups = this.renderGroups.bind(this);
    this.toggleGroups = this.toggleGroups.bind(this);
  }

  componentDidMount() {
    console.log("HOME DID MOUNT", this.props);
    this.getUserGames(this.props.user.id)
    this.fetchUserGroups(this.props.user.id)
    this.fetchAllGroups()
  }

  // getUserGames(id) {
  //   fetch(`http://localhost:3000/api/v1/users/${id}/games`)
  //     .then(resp => resp.json())
  //     .then(games => {this.setState({
  //       userGames: games.sort(function(a,b){
  //       return a.name.localeCompare(b.name);
  //   })
  //     })
  //   })
  // }

  getUserGames(id) {
    fetch(`http://localhost:3000/api/v1/users/${id}/games`)
      .then(resp => resp.json())
      .then(games => {this.setState({
        userGames: games
      })
    })
  }

  componentDidUpdate(prevProps) {
    console.log("USER HOME DID UPDATE", this.props.user.id);
    if (this.props !== prevProps) {
      this.fetchUserGroups(this.props.user.id)
      this.getUserGames(this.props.user.id)
      // this.fetchAllGroups()
    }
  }

  fetchUserGroups(id) {
    console.log("USER ID IN FETCH", id);
    fetch(`http://localhost:3000/api/v1/users/${id}/groups`)
      .then(resp => resp.json())
      .then(userGroups => this.setState({ userGroups }))
  }

  fetchAllGroups() {
    fetch(`http://localhost:3000/api/v1/groups`)
      .then(resp => resp.json())
      .then(allGroups => this.setState({ allGroups }))
  }

  addUserToGroup(group) {
    group.number_of_members += 1
    this.setState({
      userGroups: [...this.state.userGroups, group]
    })
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  toggleGroups() {
    this.setState((prevState, props) => {
      return { groupsToogle: !prevState.groupsToogle }
    })
  }

  renderGroups() {
    if (this.state.groupsToogle) {
      return (
        <React.Fragment>

          <Grid.Column width={4}>
            <Button onClick={this.toggleGroups}>
              All Groups
            </Button>
            <br/>
            Your Groups
            <GroupList user={this.props.user}
              groups={this.state.userGroups}
              getCurrentGroup={this.props.getCurrentGroup}
              games={this.state.userGames}
            />
          </Grid.Column>
        </React.Fragment>
      )
    }
    return (
      <Grid.Column width={4}>
        <Button onClick={this.toggleGroups}>
          Your Groups
        </Button>
        <br/>
        All Groups
        <GroupList user={this.props.user}
          groups={this.state.allGroups}
          addGroup={this.addUserToGroup}
        />
      </Grid.Column>
    )
  }

  render() {
    console.log("HOME RENDER Props", this.props);
    console.log("HOME RENDER STATE", this.state);
    // let games = this.state.userGames.length > 1
    // debugger
    return (
      <div className="UserHome container">
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={8}>
              <SearchBar handleSearch={this.handleSearch} search={this.state.search}/>
              {this.state.userGames && <UserGames user={this.props.user}
                gameSearch={this.state.search}
                games={this.state.userGames}
                                       />}
              {/* <GamesContainer id={this.props.user.id} /> */}
            </Grid.Column>
            <Grid.Column width={4}>
              GAME NIGHTS
              {/* <UserEventList user={this.props.user} /> */}
            </Grid.Column>
            {/* {this.renderGroups()} */}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
