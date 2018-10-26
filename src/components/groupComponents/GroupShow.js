import React from 'react';
import GroupCard from './GroupCard';
import GroupMembersContainer from './GroupMembersContainer';
import GroupEventsContainer from './GroupEventsContainer';

const GroupShow =(props) => {

    return (
      <div className="container">
        <button type="button" onClick={() => {
          props.history.push('/groups')
          props.toggleShow()
        }}>GoBACK</button>
        <GroupCard group={props.group} user={props.user} members={props.members} events={props.events} toggleShow={props.toggleShow}/*addUserToGroup={props.addUserToGroup}*/ />
        <GroupMembersContainer members={props.members} />
        <GroupEventsContainer events={props.events} user={props.user} />
      </div>
    )

}

export default GroupShow;
