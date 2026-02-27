import React from 'react';
import { data } from 'react-router-dom';

export function Calendar({ year, month, events }) {
    return (
        <div className="mx-1 bg-white border rounded-4 calendar home-calendar">
            <div className="day-label day-left">SUN</div>
            <div className="day-label">MON</div>
            <div className="day-label">TUE</div>
            <div className="day-label">WED</div>
            <div className="day-label">THU</div>
            <div className="day-label">FRI</div>
            <div className="day-label day-right">SAT</div>
            {
                GenerateDays(year, month, events).map((day) => (
                    <div className={day.classNames.join(" ")}>
                        {day.date.getDate()}<br />
                        {day.events.map((event) => (
                            <span className={"event " + (event.allDay ? "event-all-day" : "event-timed")}>{!event.allDay && event.date.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })} {event.title}</span>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}


function GenerateDays(year, month, events) {
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
        const key = eventDate.toISOString().split('T')[0];
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

        dayEvents = eventsMap.get(currentDate.toISOString().split('T')[0]);
        dayEvents = !dayEvents ? [] : dayEvents;

        days.push({ date: new Date(currentDate), classNames: classNames, events: dayEvents });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(days)

    return days;
}