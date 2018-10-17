import React from 'react';

// class UserGroupsList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//     this.renderGroups = this.renderGroups.bind(this);
//   }
//   renderGroups() {
//     if (Array.isArray(this.props.groups)) {
//       return (
//         <div>
//           <h1>Your Groups</h1>
//           <ul>
//             {this.props.groups.map((group) => {
//               return <li>{group.name}</li>
//             })}
//           </ul>
//         </div>
//       )}
//       return <h3>Loading Groups</h3>
//     }
//     render() {
//       return (
//         this.renderGroups()
//       )
//     }
//   }
const UserGroupsList = (props) => (
  Array.isArray(props.groups) ?
  <div>
    <h1>Your Groups</h1>
    <ul>
      {props.groups.map((group) => {
        return <li>
          {group.name}
          <button type="button" onClick={props.getGroup} data-event-id={group.id}>See Group</button>
        </li>
      })}
    </ul>
  </div>
 :
  <h3>Loading Groups</h3>

)

export default UserGroupsList
