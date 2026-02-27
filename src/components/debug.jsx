export function ResetDatabase() {
    const events = [
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 6, 20),
            title: "LoTR Marathon",
            allDay: false
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 17),
            title: "Camping",
            allDay: true
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 23, 10),
            title: "Service Project",
            allDay: false
        }
    ]
    localStorage.setItem('userEvents', JSON.stringify(events));

    const friends = [
        {
            username: "clairevance07",
            displayName: "Claire Vance",
            events: [
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 7, 21),
                    title: "Karaoke",
                    allDay: false
                },
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 11, 20),
                    title: "Mission Prep",
                    allDay: false
                },
                {
                    eventID: events.at(2),
                    date: new Date(2026, 1, 23, 10),
                    title: "Service Project",
                    allDay: false
                },
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 27),
                    title: "Ski Trip",
                    allDay: true
                }
            ]
        },
        {
            username: "turingA113",
            displayName: "Alex Turing",
            events: [
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 28, 20),
                    title: "Game Night",
                    allDay: false
                },
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 1, 8),
                    title: "Hike",
                    allDay: false
                },
                {
                    eventID: events.at(2),
                    date: new Date(2026, 1, 23, 10),
                    title: "Service Project",
                    allDay: false
                },
                {   
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 13, 12),
                    title: "Luncheon",
                    allDay: false
                }
            ]
        },
        {
            username: "Matt<3",
            displayName: "Matthew Hart",
            events: [
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 2, 19),
                    title: "Club Night",
                    allDay: false
                },
                {   
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 18, 14),
                    title: "Mission Reunion",
                    allDay: false
                },
                {
                    eventID: events.at(2),
                    date: new Date(2026, 1, 23, 10),
                    title: "Service Project",
                    allDay: false
                },
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 20),
                    title: "Salsa Chocolate",
                    allDay: true
                }
            ]
        }
        
    ]
    localStorage.setItem('friends', JSON.stringify(friends));

        const friendRequests = [
        {
            username: "plarke_",
            displayName: "Preston Clarke"
        },
        {
            username: "LMP",
            displayName: "Layne Peterson"
        },
        {
            username: "JeffersonBestPres",
            displayName: "Jessica McRae"
        }
        
    ]
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));

    window.location.reload();
}

