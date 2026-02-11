import React from 'react';

import "./home.css";

export function Home() {
  return (
    <main className="m-1">
      <h2 className="mt-4 mb-3">What's your schedule looking like today, <i>USERNAME</i>?</h2>

      <div className="center">
        <div className="mx-1 bg-white border rounded-4 calendar">
          <div className="day-label day-left">SUN</div>
          <div className="day-label">MON</div>
          <div className="day-label">TUE</div>
          <div className="day-label">WED</div>
          <div className="day-label">THU</div>
          <div className="day-label">FRI</div>
          <div className="day-label day-right">SAT</div>
          <div className="day day-left day-top">1</div>
          <div className="day day-top">2</div>
          <div className="day day-top">3</div>
          <div className="day day-top">4</div>
          <div className="day day-top">5</div>
          <div className="day day-top">6</div>
          <div className="day day-top day-right">7<br /><span className="event event-timed">8:00pm LoTR Marathon</span></div>
          <div className="day day-left">8</div>
          <div className="day">9</div>
          <div className="day">10</div>
          <div className="day">11</div>
          <div className="day">12</div>
          <div className="day">13</div>
          <div className="day day-right">14</div>
          <div className="day day-left">15</div>
          <div className="day">16</div>
          <div className="day">17</div>
          <div className="day">18<br /><span className="event event-all-day">Camping</span></div>
          <div className="day">19</div>
          <div className="day">20</div>
          <div className="day day-right">21</div>
          <div className="day day-left">22</div>
          <div className="day">23<br /><span className="event event-timed">10:00am Service Project</span></div>
          <div className="day">24</div>
          <div className="day">25</div>
          <div className="day">26</div>
          <div className="day">27</div>
          <div className="day day-right">28</div>
          <div className="day day-bottom day-left">29</div>
          <div className="day day-bottom">30</div>
          <div className="day day-bottom">31</div>
          <div className="day day-bottom">1</div>
          <div className="day day-bottom">2</div>
          <div className="day day-bottom">3</div>
          <div className="day day-bottom day-right">4</div>
        </div>
        <div className="management">
          <div className="modal fade" id="eventCreationModal" tabIndex="-1" aria-labelledby="eventCreationModalLabel" style={{display: "none"}} aria-hidden="true">
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
            <div className="event-invite mx-3 my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Skate Night - Friday 6th<br />Claire Vance<br /><button className="btn mx-1 btn-outline-primary">Accept</button><button className="btn mx-1 btn-outline-danger">Decline</button></div>
            <div className="event-invite mx-3 my-1 px-4 py-3 bg-primary bg-opacity-10 border border-primary rounded">Game Night - Thursday 12th<br />Alex Truing<br /><button className="btn mx-1 btn-outline-primary">Accept</button><button className="btn mx-1 btn-outline-danger">Decline</button></div>
          </div>
        </div>
      </div>
    </main>
  );
}