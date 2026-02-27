import React from 'react';

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
                    <div className={day.classNames.join(" ")}>{day.date.getDate()}</div>
                ))
            
            
            }
            {/* <GenerateDays month={11} year={2026} events={events}/> */}
            {/* <div className="day-label day-left">SUN</div>
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
            <div className="day day-bottom day-right">4</div> */}
        </div>
    )
}


function GenerateDays(year, month, events) {
    // Get Date Range
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSundayOfMonth = new Date(firstDayOfMonth)
    firstSundayOfMonth.setDate(firstDayOfMonth.getDate()-firstDayOfMonth.getDay())

    // Create map of events for more efficient lookup
    const eventsMap = new Map();

    let eventDate;
    for (const event of events) {
        eventDate = event.date
        const key = eventDate.split('T')[0];
        if (!eventsMap.has(key)) {
            eventsMap.set(key, []);
        }
        eventsMap.get(key).push(event);
    }

    // Construct Day objects out of range
    let days = [];
    const currentDate = new Date(firstSundayOfMonth);
    let classNames = [];
    for (let i = 0; i < 35; i++) {
        classNames = ["day"];
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

        days.push({date : new Date(currentDate), classNames: classNames, events: eventsMap.get(currentDate.toISOString().split('T')[0])});
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(days)   

    return days;
}