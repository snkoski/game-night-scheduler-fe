import React from 'react';

const GroupMembersList = ({ members }) => {
  return <div>{members && <ul>
    {members.map((member) => {
      return <li key={member.id} /*onClick={this.toggleShowGames}*/>
        {member.username} - {member.email}
        {/* {this.showMemberGames()} */}
      </li>
    })}
  </ul>}</div>
}

export default GroupMembersList
