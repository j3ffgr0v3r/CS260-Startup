import React from 'react';
import Button from 'react-bootstrap/Button';

import { NavLink } from 'react-router-dom';
import { useToast } from '../components/toast';

import "./friends.css";

export function Friends({ friends, setFriends, friendRequests, setFriendRequests }) {
  const [friendRequestUsername, setFriendRequestUsername] = React.useState('');

  const { showToast } = useToast();

  async function respondToFriendRequest(request, accepted) {
    fetch(`/api/friendRequests/${request.user.username}`, {
      method: 'put',
      body: JSON.stringify({ action: accepted ? "accept" : "decline" }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
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
    const response = await fetch(`/api/friendRequests/${friendRequestUsername}`, {
      method: 'post',
    });
    const body = await response.json();
    if (response?.status === 200) {
      if (body.action_taken == "invite_accepted") {
        const newFriend = friendRequests.find((req) => req.user.username === friendRequestUsername);
        setFriendRequests((prev) => prev.filter((req) => req !== newFriend));
        setFriends((prev) => [...prev, newFriend]);
                showToast({
          title: 'Accepted Friend Request!',
          message: `You and ${newFriend.user.firstName} are now friends!`,
          bg: 'success',
        });
      } else {
        showToast({
          title: 'Friend Request Sent!',
          message: `Friend Request successfully sent to ${friendRequestUsername}!`,
          bg: 'success',
        });
      }
      setFriendRequestUsername('');
    } else if (response?.status === 409) {
      showToast({
        title: 'Do you not know your friends?',
        message: `You are already friends with ${friendRequestUsername}!`,
        bg: 'info',
      });
      setFriendRequestUsername('');
    } else if (response?.status === 429) {
      showToast({
        title: 'Calm down now!',
        message: `You've already sent a friend request to ${friendRequestUsername}. Please wait for them to respond.`,
        bg: 'warning',
      });
      setFriendRequestUsername('');
    } else if (response?.status === 404) {
      showToast({
        title: 'User not found!',
        message: `Unable to send Friend Request to ${friendRequestUsername}. Please check the username and try again.`,
        bg: 'danger',
      });
    }
  }

  return (
    <main>
      <h3>Pending Invites</h3>
      <div className="pending-friend-invites">
        {friendRequests?.length == 0 ? <div><i>There are no pending friend requests</i></div> :
          friendRequests && friendRequests.map((request) => (
            <div key={request.user.username} className="friend-invite my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{request.user.displayName}<br /><button onClick={() => respondToFriendRequest(request, true)} className="btn mx-1 btn-outline-primary">Accept</button><button onClick={() => respondToFriendRequest(request, false)} className="btn mx-1 btn-outline-danger">Decline</button></div>
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
        {friends?.length == 0 ? <div><i>It's looking a little empty here... why don't you invite some friends?</i></div> :
          friends && friends.map((friend) => (
            <div key={friend.user.username} className="friend my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{friend.user.firstName + " " + friend.user.lastName}<NavLink to={friend.user.username} className="btn mx-1 btn-outline-info">View Schedule</NavLink></div>
          ))
        }
      </div>
    </main>
  );
}