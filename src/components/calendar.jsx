import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Button } from 'react-bootstrap';

export function Calendar({ events }) {
    const today = new Date();
    const [calendarMonth, setMonth] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

    function goToToday() {
        setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }

    function moveCalendar(dir) {
        const newMonth = new Date(calendarMonth);
        newMonth.setMonth(newMonth.getMonth() + dir);
        setMonth(newMonth);
    }

    return (
        <div className='calendar-wrapper'>
            <div className='calendar-cycle-control'>
                <Button variant="primary" onClick={goToToday}>Today</Button>
                <Button variant="secondary" onClick={() => moveCalendar(-1)}>&lt;</Button>
                <Button variant="secondary" onClick={() => moveCalendar(+1)}>&gt;</Button>
                <h3>{calendarMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h3>
            </div>
            <div className="mx-1 bg-white border rounded-4 calendar home-calendar">
                <div className="day-label day-left">SUN</div>
                <div className="day-label">MON</div>
                <div className="day-label">TUE</div>
                <div className="day-label">WED</div>
                <div className="day-label">THU</div>
                <div className="day-label">FRI</div>
                <div className="day-label day-right">SAT</div>
                {
                    GenerateDays(calendarMonth.getFullYear(), calendarMonth.getMonth(), events).map((day) => (
                        <div key={day.date.toISOString()} className={day.classNames.join(" ")}>
                            {day.date.getDate()}<br />
                            {day.events.map((event) => (
                                <EventChip key={event.eventID} event={event} />
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

function EventChip({ event }) {
    const pop = (
        <Popover id={`event-${event.eventid}`}>
            <Popover.Header as="h3">{event.title}</Popover.Header>
            <Popover.Body>
                {!event.allDay && <div><strong>Time:</strong> {event.date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                })}</div>}
                {event.description && <div><strong>Details:</strong> {event.description}</div>}
                {event.host && <div><strong>Host:</strong> {event.hostName}</div>}
                {event.location && <div><strong>Location:</strong> {event.location}</div>}
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger={['click']} placement="auto" overlay={pop} rootClose>
            <button type="button" className={"event " + (event.allDay ? "event-all-day" : "event-timed")}>
                {!event.allDay && event.date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                })} {event.title}
            </button>
        </OverlayTrigger>
    );
}

function GenerateDays(year, month, events) {
    events = events == undefined ? [] : events
    // Get Date Range
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSundayOfMonth = new Date(firstDayOfMonth)
    firstSundayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())

    // Create map of events for more efficient lookup
    const eventsMap = new Map();

    let eventDate;
    for (const event of events) {
        event.date = new Date(event.date)
        eventDate = event.date
        const key = eventDate.toDateString();
        if (!eventsMap.has(key)) {
            eventsMap.set(key, []);
        }
        eventsMap.get(key).push(event);
    }

    // Construct Day objects out of range
    let days = [];
    const currentDate = new Date(firstSundayOfMonth);
    let classNames = [];
    let dayEvents = [];
    for (let i = 0; i < 35; i++) {
        classNames = ["day"];
        dayEvents = [];

        if (i < 7) {
            classNames.push("day-top");
        }
        if (i >= 28) {
            classNames.push("day-bottom");
        }
        if (i % 7 == 0) {
            classNames.push("day-left");
        }
        if (i % 7 == 6) {
            classNames.push("day-right");
        }

        dayEvents = eventsMap.get(currentDate.toDateString());
        dayEvents = !dayEvents ? [] : dayEvents;

        days.push({ date: new Date(currentDate), classNames: classNames, events: dayEvents });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
}