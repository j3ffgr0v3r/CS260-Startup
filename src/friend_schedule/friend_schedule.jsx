import React from 'react';

import "./friend_schedule.css";

export function FriendSchedule() {
  return (
    <main>
      <h2>Claire Vance's Schedule</h2>
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
          <div className="day day-top day-right">7<br /><span className="event event-timed">9:00pm Karaoke</span></div>
          <div className="day day-left">8</div>
          <div className="day">9</div>
          <div className="day">10</div>
          <div className="day">11<br /><span className="event event-timed">8:00pm Mission Prep</span></div>
          <div className="day">12</div>
          <div className="day">13</div>
          <div className="day day-right">14</div>
          <div className="day day-left">15</div>
          <div className="day">16</div>
          <div className="day">17</div>
          <div className="day">18</div>
          <div className="day">19</div>
          <div className="day">20</div>
          <div className="day day-right">21</div>
          <div className="day day-left">22</div>
          <div className="day">23<br /><span className="event event-timed">10:00am Service Project</span></div>
          <div className="day">24</div>
          <div className="day">25</div>
          <div className="day">26</div>
          <div className="day">27<br /><span className="event event-all-day">Ski Trip</span></div>
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
          <button className="btn btn-lg btn-primary"><span>💬</span> Send Message</button>
          <button className="btn btn-danger btn-lg"><span>✖</span> Remove Friend</button>
        </div>
      </div>
    </main>
  );
}