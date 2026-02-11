import React from 'react';

import "./friends.css";

export function Friends() {
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
        <div className="friend my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Claire Vance<a href="friend_schedule.html" className="btn mx-1 btn-outline-info">View Schedule</a><button className="btn mx-1 btn-outline-success">Send Message</button></div>
        <div className="friend my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Alex Turing<a href="friend_schedule.html" className="btn mx-1 btn-outline-info">View Schedule</a><button className="btn mx-1 btn-outline-success">Send Message</button></div>
        <div className="friend my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Matthew Hart<a href="friend_schedule.html" className="btn mx-1 btn-outline-info">View Schedule</a><button className="btn mx-1 btn-outline-success">Send Message</button></div>
      </div>
    </main>
  );
}