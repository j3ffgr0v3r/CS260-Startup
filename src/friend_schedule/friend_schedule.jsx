import React from 'react';

import "./friend_schedule.css";
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from '../components/calendar';
import { NotFound } from '../app';
import { Dropdown } from 'react-bootstrap';
import { useToast } from '../components/toast';

export function FriendSchedule({ friends, setFriends }) {
  const { showToast } = useToast();
  const navigate = useNavigate();


  const { friendID: friendUsername } = useParams();
  const [friend, setFriend] = React.useState(true);
    React.useEffect(() => {
      fetch(`/api/users/${friendUsername}`)
        .then((response) => response.json())
        .then((currentFriend) => {
          setFriend(currentFriend);
        });
    }, []);

  const [friendEvents, setFriendEvents] = React.useState([]);
  React.useEffect(() => {
    fetch(`/api/events?username=${friendUsername}`)
      .then((response) => response.json())
      .then((events) => {
        setFriendEvents(events);
      });
  }, []);

  if (!(friends.find((u) => u.user["username"] === friendUsername)) || !friend) {
    return <NotFound />;
  }


  function removeFriend() {
    navigate("/friends");
    showToast({
      title: 'Friend Removed',
      message: `You and ${friend.firstName} are no longer friends`,
      bg: 'danger',
    });
    setFriends((prev) => prev.filter((f) => f.username !== friendUsername));
  }

  return (
    <main>
      <div className="management friend-schedule-management">
        <h2>{friend?.firstName}'{friend?.firstName?.at(-1) == "s" ? "" : "s"} Schedule</h2>
        <Dropdown align="end">
          <Dropdown.Toggle id="profile-menu" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={removeFriend}><span>✖ </span>Remove Friend</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="center">
        <Calendar events={friendEvents} />
      </div>
    </main>
  );
}