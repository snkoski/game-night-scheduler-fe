import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import UserGames from './gameComponents/UserGames';
import SearchBar from './SearchBar';
import GroupContainer from './groupComponents/GroupsContainer';
import GroupList from './groupComponents/GroupList';
import UserEventList from './eventComponents/UserEventList';
import GamesContainer from './gameComponents/GamesContainer';
import GameCard from './gameComponents/GameCard';
import NewGroupsContainer from './groupComponents/NewGroupsContainer'

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGames: [],
      userGroups: [],
      allGroups: [],
      // groupsToogle: true
    }
    // this.handleSearch = this.handleSearch.bind(this);
    this.fetchUserGames = this.fetchUserGames.bind(this);
    // this.getCurrentGame = this.getCurrentGame.bind(this);
    // this.renderGames = this.renderGames.bind(this);
    this.fetchUserGroups = this.fetchUserGroups.bind(this);
    this.fetchAllGroups = this.fetchAllGroups.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    // this.renderGroups = this.renderGroups.bind(this);
    // this.toggleGroups = this.toggleGroups.bind(this);
  }

  componentDidMount() {
    console.log("USER HOME DID MOUNT");
    this._isMounted = true;
    this.fetchUserGames(this.props.user.id)
    this.fetchUserGroups(this.props.user.id)
    this.fetchAllGroups()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.fetchUserGames(this.props.user.id)
      this.fetchUserGroups(this.props.user.id)
      this.fetchAllGroups()
    }
  }

  fetchUserGames(id) {
    fetch(`http://localhost:3000/api/v1/users/${id}/games`)
      .then(resp => resp.json())
      .then(games => {this.setState({
        userGames: games
      })
    })
  }

  fetchUserGroups(id) {
    fetch(`http://localhost:3000/api/v1/users/${id}/groups`)
      .then(resp => resp.json())
      .then(userGroups => this.setState({ userGroups }))
  }

  fetchAllGroups() {
    fetch(`http://localhost:3000/api/v1/groups`)
      .then(resp => resp.json())
      .then(allGroups => this.setState({ allGroups }))
  }
  //
  addUserToGroup(group) {
    group.number_of_members += 1
    this.setState({
      userGroups: [...this.state.userGroups, group]
    })
  }

  // handleSearch(e) {
  //   this.setState({
  //     search: e.target.value
  //   })
  // }
  //
  // getCurrentGame(e) {
  //   console.log("GAME CLICK", e.target.id);
  //   let currentGame = this.state.userGames.find((game) => {
  //     return game.bgg_id === e.target.id
  //   })
  //   this.setState({
  //     currentGame: currentGame
  //   })
  // }

  // renderGames() {
  //   return <Grid.Row>
  //     <Grid.Column width={8}>
  //       <SearchBar handleSearch={this.handleSearch} search={this.state.search}/>
  //       {this.state.userGames && <UserGames user={this.props.user}
  //         gameSearch={this.state.search}
  //         games={this.state.userGames}
  //         getCurrentGame={this.getCurrentGame}
  //                                />}
  //     </Grid.Column>
  //     <Grid.Column width={8}>
  //       Game
  //       {this.state.currentGame && <GameCard key={this.state.currentGame.bgg_id} game={this.state.currentGame} />}
  //     </Grid.Column>
  //   </Grid.Row>
  // }

  // toggleGroups() {
  //   this.setState((prevState, props) => {
  //     return { groupsToogle: !prevState.groupsToogle }
  //   })
  // }
  //
  // renderGroups() {
  //   if (this.state.groupsToogle) {
  //     return (
  //       <React.Fragment>
  //
  //         <Grid.Column width={4}>
  //           <Button onClick={this.toggleGroups}>
  //             All Groups
  //           </Button>
  //           <br/>
  //           Your Groups
  //           <GroupList user={this.props.user}
  //             groups={this.state.userGroups}
  //             getCurrentGroup={this.props.getCurrentGroup}
  //             games={this.state.userGames}
  //           />
  //         </Grid.Column>
  //       </React.Fragment>
  //     )
  //   }
  //   return (
  //     <Grid.Column width={4}>
  //       <Button onClick={this.toggleGroups}>
  //         Your Groups
  //       </Button>
  //       <br/>
  //       All Groups
  //       <GroupList user={this.props.user}
  //         groups={this.state.allGroups}
  //         addGroup={this.addUserToGroup}
  //       />
  //     </Grid.Column>
  //   )
  // }

  // render() {
  //   console.log("HOME RENDER Props", this.props);
  //   console.log("HOME RENDER STATE", this.state);
  //
  //   return (
  //     <div className="UserHome container">
  //       <Grid divided>
  //         <Grid.Row>
  //           <Grid.Column width={8}>
  //             <SearchBar handleSearch={this.handleSearch} search={this.state.search}/>
  //             {this.state.userGames && <UserGames user={this.props.user}
  //               gameSearch={this.state.search}
  //               games={this.state.userGames}
  //                                      />}
  //             {/* <GamesContainer id={this.props.user.id} /> */}
  //           </Grid.Column>
  //           <Grid.Column width={4}>
  //             GAME NIGHTS
  //             {/* <UserEventList user={this.props.user} /> */}
  //           </Grid.Column>
  //           {/* {this.renderGroups()} */}
  //         </Grid.Row>
  //       </Grid>
  //     </div>
  //   )
  // }
//   render() {
//
//     return (
//       <div className="UserHome container">
//         <h1>Home</h1>
//
//         {/* <UserGames userGames={this.state.userGames} user={this.props.user}/> */}
//         <Route path={this.props.match.url + "/games"} render={(() => {
//           return <UserGames
//             userGames={this.state.userGames} user={this.props.user}
//                  />
//         })} />
//         <Route path={this.props.match.url + "/groups"} render={((props) => {
//           return <GroupContainer
//             {...props}
//             user={this.props.user}
//             userGroups={this.state.userGroups}
//             allGroups={this.state.allGroups}
//             addUserToGroup={this.addUserToGroup}
//             // getCurrentGroup={this.props.getCurrentGroup}
//             // games={this.state.userGames}
//                  />
//         })} />
//
//
//
//       </div>
//     )
//   }
// }
render() {

  return (
    // <div className="container">
    //   <NewGroupsContainer user={this.props.user}/>
    // </div>
    <div className="container">USER HOME</div>
  )
}
}
