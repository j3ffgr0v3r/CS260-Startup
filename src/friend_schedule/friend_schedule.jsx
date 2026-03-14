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


  const { friendID } = useParams();
  const [friend, setFriend] = React.useState(null);
  try {
    React.useEffect(() => {
      fetch(`/api/users/${friendID}`)
        .then((response) => response.json())
        .then((response) => { if (response.status === 401) response = null })
        .then((currentFriend) => {
          setFriend(currentFriend);
        });
    }, []);
  } catch {
    return <NotFound />;
  }
  

  const [friendEvents, setFriendEvents] = React.useState([]);
  React.useEffect(() => {
    fetch(`/api/events?username=${friendID}`)
      .then((response) => response.json())
      .then((events) => {
        setFriendEvents(events);
      });
  }, []);

  if (!(friendID in friends) || !friend) {
    return <NotFound />;
  }


  function removeFriend() {
    navigate("/friends");
    showToast({
      title: 'Friend Removed',
      message: `You and ${friend.firstName} are no longer friends`,
      bg: 'danger',
    });
    setFriends((prev) => prev.filter((f) => f.username !== friendID));
  }

  return (
    <main>
      <div className="management friend-schedule-management">
        <h2>{friend?.firstName}'{friend?.firstName.at(-1) == "s" ? "" : "s"} Schedule</h2>
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