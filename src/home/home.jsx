import React from 'react';

import "./home.css";
import { Calendar } from '../components/calendar';

export function Home({ activeUser }) {
  // Import and hook userEvents
  const [userEvents, setEvents] = React.useState(() => {
    const saved = localStorage.getItem('userEvents');
    return saved ? JSON.parse(saved) : [];
  });
  React.useEffect(() => {
    localStorage.setItem('userEvents', JSON.stringify(userEvents));
  }, [userEvents]);

  // Import and hook eventInvites
  const [eventInvites, setEventInvites] = React.useState(() => {
    const saved = localStorage.getItem('eventInvites');
    return saved ? JSON.parse(saved) : [];
  });
  React.useEffect(() => {
    localStorage.setItem('eventInvites', JSON.stringify(eventInvites));
  }, [eventInvites]);


  // Respond to event invite
  async function respondToEventInvite(event, accepted) {
    if (accepted) {
      setEvents((prev) => [...prev, event]);
    }
    setEventInvites((prev) => prev.filter((req) => req !== event));
  }

  return (
    <main className="m-1 bg-light text-dark">
      <h2 className="mt-4 mb-3">What's your schedule looking like today, <i>{activeUser.firstName}</i>?</h2>

      <div className="home-center">
        <Calendar year={2026} month={1} events={userEvents} />
        <div className="management home-management">
          <div className="modal fade" id="eventCreationModal" tabIndex="-1" aria-labelledby="eventCreationModalLabel" style={{ display: "none" }} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="eventCreationModalLabel">New Event</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div>
                      <span>Event Name:</span>
                      <input className="form-control" type="text" placeholder="Super Cool Party" required />
                    </div>
                    <div>
                      <span>Event Description</span>
                      <textarea className="form-control" placeholder="Description"></textarea>
                    </div>
                    <div>
                      <span>Friends</span>
                      <select className="form-select" multiple size="8">
                        <option>Claire Vance</option>
                        <option>Alex Turing</option>
                        <option>Matthew Hart</option>
                        <option>Jessica McRae</option>
                      </select>
                    </div>
                    <div>
                      <span>Date</span>
                      <input className="form-control" type="date" required></input>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary">Save Event</button>
                </div>
              </div>
            </div>
          </div>


          <button type="button" className="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#eventCreationModal"><span>+</span> Create Event</button>
          <button className="btn btn-secondary btn-lg"><span>✎</span> Edit Availability</button>
          <h3>Pending Invites</h3>
          <div className="pending-event-invites">
            { eventInvites.length == 0 ? <div><i>There are no pending invites</i></div> :
              eventInvites.map((event) => (
                <div key={event.eventID} className="event-invite mx-3 my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">{event.title} - {new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(event.date))}<br />
                  {event.host.user.firstName + " " + event.host.user.lastName}<br /><button onClick={() => respondToEventInvite(event, true)} className="btn mx-1 btn-outline-primary">Accept</button><button onClick={() => respondToEventInvite(event, false)} className="btn mx-1 btn-outline-danger">Decline</button></div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}