import React from 'react';

import "./friend_schedule.css";
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from '../components/calendar';
import { NotFound } from '../app';
import { Dropdown } from 'react-bootstrap';
import { useToast } from '../components/toast';

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

  const { showToast } = useToast();
  const navigate = useNavigate();

  function removeFriend() {
    navigate("/friends");
    showToast({
      title: 'Friend Removed',
      message: `You and ${friend.user.firstName} are no longer friends`,
      bg: 'danger',
    });
    setFriends((prev) => prev.filter((f) => f.user.username !== friendID));
  }

  const friend = friends.find((friend) => friend.user.username === friendID)
  if (friend == undefined) {
    return <NotFound />;
  }

  return (
    <main>
      <div className="management friend-schedule-management">
        <h2>{friend.user.firstName}'{friend.user.firstName.at(-1) == "s" ? "" : "s"} Schedule</h2>
        <Dropdown align="end">
          <Dropdown.Toggle id="profile-menu" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={removeFriend}><span>✖ </span>Remove Friend</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="center">
        <Calendar year={2026} month={1} events={friend.user.events} />
      </div>
    </main>
  );
}