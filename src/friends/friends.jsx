import React from 'react';
import { NavLink } from 'react-router-dom';

import "./friends.css";

export function Friends() {
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    const friendsText = localStorage.getItem('friends');
    if (friendsText) {
      setFriends(JSON.parse(friendsText));
    }
  }, []);

  return (
    <main>
      <h3>Pending Invites</h3>
      <div className="pending-friend-invites">
        <div className="friend-invite my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Preston Clarke<br /><button className="btn mx-1 btn-outline-primary">Accept</button><button className="btn mx-1 btn-outline-danger">Decline</button></div>
        <div className="friend-invite my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Layne Peterson<br /><button className="btn mx-1 btn-outline-primary">Accept</button><button className="btn mx-1 btn-outline-danger">Decline</button></div>
        <div className="friend-invite my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Jessica McRae<br /><button className="btn mx-1 btn-outline-primary">Accept</button><button className="btn mx-1 btn-outline-danger">Decline</button></div>
      </div>
      <hr />

      <h3>Send Friend Request</h3>
      <form method="get">
        <div className="m-3">
          <input className="form-control w-auto" type="text" placeholder="their@email.com" required />
        </div>
        <button className="m-2 px-4 btn btn-primary" type="submit">Send</button>
      </form>
      <hr />

      <h3>Friends</h3>
      <div className="friends">
        {
          friends.map((friend) => (
            <div key={friend.name} className="friend my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{friend.name}<NavLink to="../friend_schedule" className="btn mx-1 btn-outline-info">View Schedule</NavLink></div>
          ))
        }
      </div>
    </main>
  );
}