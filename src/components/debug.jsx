export function ResetDatabase() {
    const events = [
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 6, 20),
            title: "LoTR Marathon",
            description: "Bring your swords ;)",
            allDay: false
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 17),
            title: "Camping",
            location: "Tibble Fork",
            allDay: true
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 23, 10),
            title: "Service Project",
            description: "Shovel Snow",
            location: "Nearby Neighborhood",
            allDay: false
        }
    ]
    localStorage.setItem('userEvents', JSON.stringify(events));

    const users = [
        {
            username: "clairevance07",
            password: "password",
            firstName: "Claire",
            lastName: "Vance",
            events: [
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 7, 21),
                    title: "Karaoke",
                    description: "Let's see how good your voice really is",
                    allDay: false
                },
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 11, 20),
                    title: "Mission Prep",
                    description: "Helaman Girls...",
                    allDay: false
                },
                events.at(2),
                {
                    eventID: crypto.randomUUID(),
                    date: new Date(2026, 1, 27),
                    title: "Ski Trip",
                    description: "In what snow???",
                    location: "Somewhere, I suppose",
                    allDay: true
                }
            ]
        },
        {
            username: "turingA113",
            password: "password",
            firstName: "Alex",
            lastName: "Turing",
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
                events.at(2),
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
            password: "password",
            firstName: "Matthew",
            lastName: "Hart",
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
        },
                {
            username: "plarke_",
            password: "password",
            firstName: "Preston",
            lastName: "Clarke",
            events: []
        },
        {
            username: "LMP",
            password: "password",
            firstName: "Layne",
            lastName: "Peterson",
            events: []
        },
        {
            username: "JeffersonBestPres",
            password: "password",
            firstName: "Jessica",
            lastName: "McRae",
            events: []
        }

    ]
    localStorage.setItem('users', JSON.stringify(users));


    const friends = [ 
        {
            user: users.at(0)
        },
        {
            user: users.at(1)
        },
        {
            user: users.at(2)
        }


    ]

    localStorage.setItem('friends', JSON.stringify(friends));


    const friendRequests = [
        {
            user: users.at(3)
        },
        {
            user: users.at(4)
        },
        {
            user: users.at(5)
        }

    ]
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));

    window.location.reload();

    const eventInvites = [
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 6, 18),
            title: "Skate Night",
            allDay: false,
            host: friends.at(0)
        },
        {
            eventID: crypto.randomUUID(),
            date: new Date(2026, 1, 12, 19),
            title: "Game Night",
            allDay: false,
            host: friends.at(1)
        }
    ]
    localStorage.setItem('eventInvites', JSON.stringify(eventInvites));
}

