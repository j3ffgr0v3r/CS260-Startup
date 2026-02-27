export function ResetDatabase() {
    const events = [
        {
            date: new Date(2026, 1, 6, 20),
            title: "LoTR Marathon",
            allDay: false
        },
        {
            date: new Date(2026, 1, 17),
            title: "Camping",
            allDay: true
        },
        {
            date: new Date(2026, 1, 23, 10),
            title: "Service Project",
            allDay: false
        }
    ]
    localStorage.setItem('userEvents', JSON.stringify(events));

    const friends = [
        {
            name: "Claire Vance",
            events: [
                {
                    date: new Date(2026, 1, 7, 21),
                    title: "Karaoke",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 11, 20),
                    title: "Mission Prep",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 23, 10),
                    title: "Service Project",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 27),
                    title: "Ski Trip",
                    allDay: true
                }
            ]
        },
        {
            name: "Alex Turing",
            events: [
                {
                    date: new Date(2026, 1, 7, 21),
                    title: "Karaoke",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 11, 20),
                    title: "Mission Prep",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 23, 10),
                    title: "Service Project",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 27),
                    title: "Ski Trip",
                    allDay: true
                }
            ]
        },
        {
            name: "Matthew Hart",
            events: [
                {
                    date: new Date(2026, 1, 7, 21),
                    title: "Karaoke",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 11, 20),
                    title: "Mission Prep",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 23, 10),
                    title: "Service Project",
                    allDay: false
                },
                {
                    date: new Date(2026, 1, 27),
                    title: "Ski Trip",
                    allDay: true
                }
            ]
        }
        
    ]
    localStorage.setItem('friends', JSON.stringify(friends));
}

