import React from 'react';

import "./home.css";
import { Calendar } from '../components/calendar';
import { useToast } from '../components/toast';
import { Modal, Button, Form } from 'react-bootstrap';

export function Home({ activeUser, friends }) {
  // Import and hook userEvents
  const [userEvents, setEvents] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((events) => {
        setEvents(Array.isArray(events) ? events : []);
      });
  }, []);

  // Import and hook eventInvites
  const [eventInvites, setEventInvites] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/eventInvites')
      .then((response) => response.json())
      .then((invites) => {
        setEventInvites(Array.isArray(invites) ? invites : []);
      });
  }, []);

  // Import and hook BYUEvents
  const [BYUEvents, setBYUEvents] = React.useState([]);
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 28);
  React.useEffect(() => {
    fetch(`/api/BYUEvents?start=${today.toISOString().split('T')[0]}&end=${maxDate.toISOString().split('T')[0]}`)
      .then((response) => response.json())
      .then((events) => {
        setBYUEvents(Array.isArray(events) ? events : []);
      });
  }, []);

  const { showToast } = useToast();

  // Respond to event invite
  async function respondToEventInvite(event, accepted) {
    fetch(`/api/eventInvites/${event.eventID}`, {
      method: 'put',
      body: JSON.stringify({ action: accepted ? "accept" : "decline" }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (accepted) {
      setEvents((prev) => [...prev, event]);
      showToast({
        title: 'Accepted Event Invite!',
        message: `Event "${event.title}" has been added to your calendar!`,
        bg: 'success',
      });
    } else {
      showToast({
        title: 'Declined Event Invite',
        message: `Event "${event.title}" has been removed from your invites.`,
        bg: 'warning',
      });
    }
    setEventInvites((prev) => prev.filter((req) => req !== event));
  }

  // Add BYU Event to calendar
  async function addBYUEventToCalendar(event) {
    fetch(`/api/BYUEvents/${event.eventID}`, {
      method: 'put',
    });
    setBYUEvents((prev) => prev.filter((req) => req !== event));
    setEvents(prev => [...prev, event]);
    showToast({
      title: 'Added BYU Event!',
      message: `Event "${event.title}" has been added to your calendar!`,
      bg: 'success',
    });
  }

  // Create Event
  const [showCreateEventModal, setShowCreateEventModal] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState('');
  const [newEventDescription, setNewEventDescription] = React.useState('');
  const [newEventDate, setNewEventDate] = React.useState('');
  const [newEventAllDay, setNewEventAllDay] = React.useState(false);
  const [newEventTime, setNewEventTime] = React.useState('');
  const [newEventInvitees, setNewEventInvitees] = React.useState([]);
  function toggleInvitee(username) {
    setNewEventInvitees((prev) =>
      prev.includes(username)
        ? prev.filter((u) => u !== username)
        : [...prev, username]
    );
  }

  function openEventCreationModal() {
    setShowCreateEventModal(true);
  }

  function closeEventCreationModal() {
    setShowCreateEventModal(false);
  }

  function createDate(date, time) {
    let [year, month, day] = date.split('-').map(Number);
    let [hour, minute] = time.split(':').map(Number);

    month = month - 1;

    return new Date(year, month, day, hour, minute)
  }

  function submitEvent() {
    const newEvent = saveEvent();
    setEvents(prev => [...prev, newEvent]);
    closeEventCreationModal();
    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventDate('');
    setNewEventAllDay(false);
    setNewEventTime('');
    setNewEventInvitees([]);
  }

  async function saveEvent() {
    const newEvent = {
      date: createDate(newEventDate, !newEventAllDay ? newEventTime : "00:00"),
      title: newEventTitle,
      description: newEventDescription,
      allDay: newEventAllDay,
      host: activeUser.username,
      hostName: activeUser.displayName,
    };
    const response = await fetch("/api/events", {
      method: 'post',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const body = await response.json();
    if (response?.status === 200) {
      showToast({
        title: 'New Event Created!',
        message: `${newEvent.title} has been added to your calendar!`,
        bg: 'success',
      });
      return newEvent;
    } else {
      showToast({
        title: 'Error!',
        message: body.msg,
        bg: 'warning',
      });
    }
  }

  return (
    <main className="m-1 bg-light text-dark">
      <h2 className="mt-4 mb-3">What's your schedule looking like today, <i>{activeUser?.firstName}</i>?</h2>

      <div className="home-center">
        <Calendar events={userEvents} />
        <div className="management home-management">
          <Button variant="primary" className="btn-lg" onClick={openEventCreationModal}><span>+</span> Create Event</Button>
          <Modal show={showCreateEventModal} onHide={closeEventCreationModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>New Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Event Name"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className='create-event-time-wrapper'>
                  <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={newEventTime}
                      onChange={(e) => setNewEventTime(e.target.value)}
                      required
                      disabled={newEventAllDay}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>All Day Event</Form.Label>
                    <Form.Check value={newEventAllDay} onChange={(e) => setNewEventAllDay(e.target.checked)} type="checkbox" />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Invite Friends</Form.Label>

                  <div className="border rounded p-2" style={{ maxHeight: 180, overflowY: 'auto' }}>
                    {friends.length > 0 && friends.map((friend) => (
                      <Form.Check
                        key={friend.user.username}
                        type="checkbox"
                        id={`invite-${friend.user.username}`}
                        label={friend.user.firstName + " " + friend.user.lastName}
                        checked={newEventInvitees.includes(friend.user.username)}
                        onChange={() => toggleInvitee(friend.user.username)}
                        className="mb-1"
                      />
                    ))}
                  </div>
                </Form.Group>

              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeEventCreationModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={submitEvent} disabled={!newEventTitle || !newEventDate || !(newEventAllDay || newEventTime)}>
                Save Event
              </Button>
            </Modal.Footer>
          </Modal>

          <h3>Pending Invites</h3>
          <div className="pending-event-invites">
            {eventInvites.length == 0 ? <div><i>There are no pending invites</i></div> :
              eventInvites.map((event) => (
                <div key={event.eventID} className="event-invite mx-3 my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{event.title} - {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(event.date))}<br />
                  {event.hostName}<br /><button onClick={() => respondToEventInvite(event, true)} className="btn mx-1 btn-outline-primary">Accept</button><button onClick={() => respondToEventInvite(event, false)} className="btn mx-1 btn-outline-danger">Decline</button></div>
              ))
            }
          </div>
          <h3>BYU Events</h3>
          <div>
            <div className="pending-event-invites">
              {BYUEvents.length == 0 ? <div><i>There are no pending BYU Events... somehow</i></div> :
                BYUEvents.map((event) => (
                  <div key={event.eventID} className="event-invite mx-3 my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{event.title} - {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(event.date))}<br />
                    {event.hostName}<br /><button onClick={() => addBYUEventToCalendar(event)} className="btn mx-1 btn-outline-primary">Add to Calendar</button></div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}