import React from 'react';
import Button from 'react-bootstrap/Button';

import { NavLink } from 'react-router-dom';
import { useToast } from '../components/toast';

import "./friends.css";

export function Friends() {
  const [friendRequestUsername, setFriendRequestUsername] = React.useState('');
  const [friends, setFriends] = React.useState(() => {
    const saved = localStorage.getItem('friends');
    return saved ? JSON.parse(saved) : [];
  });
  const [friendRequests, setFriendRequests] = React.useState(() => {
    const saved = localStorage.getItem('friendRequests');
    return saved ? JSON.parse(saved) : [];
  });

  const { showToast } = useToast();

  // Save whenever state changes
  React.useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);
  React.useEffect(() => {
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  async function respondToFriendRequest(request, accepted) {
    if (accepted) {
      setFriends((prev) => [...prev, request]);
      showToast({
        title: 'Accepted Friend Request!',
        message: `You and ${request.user.firstName} are now friends!`,
        bg: 'success',
      });
    } else {
      showToast({
        title: 'Declined Friend Request',
        message: `Request from ${request.user.firstName} has been removed`,
        bg: 'danger',
      });
    }
    setFriendRequests((prev) => prev.filter((req) => req !== request));
  }

  async function sendFriendRequest() {
    showToast({
      title: 'Friend Request Sent!',
      message: `Friend Request successfully sent to ${friendRequestUsername}!`,
      bg: 'info',
    });
    setFriendRequestUsername('');
  }


  return (
    <main>
      <h3>Pending Invites</h3>
      <div className="pending-friend-invites">
        {friendRequests.length == 0 ? <div><i>There are no pending friend requests</i></div> :
          friendRequests.map((request) => (
            <div key={request.user.username} className="friend-invite my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{request.user.firstName + " " + request.user.lastName}<br /><button onClick={() => respondToFriendRequest(request, true)} className="btn mx-1 btn-outline-primary">Accept</button><button onClick={() => respondToFriendRequest(request, false)} className="btn mx-1 btn-outline-danger">Decline</button></div>
          ))
        }
      </div>
      <hr />

      <h3>Send Friend Request</h3>
      <form method="get">
        <div className="m-3">
          <input className="form-control w-auto" type="text" placeholder="Username" value={friendRequestUsername} onChange={(e) => setFriendRequestUsername(e.target.value)} required />
        </div>
        <Button variant="primary" className="m-2 px-4" onClick={sendFriendRequest} disabled={!friendRequestUsername}>Send</Button>
      </form>
      <hr />

      <h3>Friends</h3>
      <div className="friends">
        {friends.length == 0 ? <div><i>It's looking a little empty here... why don't you invite some friends?</i></div> :
          friends.map((friend) => (
            <div key={friend.user.username} className="friend my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{friend.user.firstName + " " + friend.user.lastName}<NavLink to={friend.user.username} className="btn mx-1 btn-outline-info">View Schedule</NavLink></div>
          ))
        }
      </div>
    </main>
  );
}