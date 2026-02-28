import React from 'react';

import "./friend_schedule.css";
import { useParams } from 'react-router-dom';
import { Calendar } from '../components/calendar';
import { NotFound } from '../app';

export function FriendSchedule() {
  // Import and hook friends list
  const [friends, setFriends] = React.useState(() => {
    const saved = localStorage.getItem('friends');
    return saved ? JSON.parse(saved) : [];
  });
  React.useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);


  const { friendID } = useParams();

  const friend = friends.find((friend) => friend.user.username === friendID)

  if (friend == undefined) {
    return NotFound();
  }

  return (
    <main>
      <h2>{friend.user.firstName}'{friend.user.firstName.at(-1) == "s" ? "" : "s"} Schedule</h2>
      <div className="center">
        <Calendar year={2026} month={1} events={friend.user.events} />
        <div className="management friend-schedule-management">
          <button className="btn btn-danger btn-lg"><span>✖</span> Remove Friend</button>
        </div>
      </div>
    </main>
  );
}