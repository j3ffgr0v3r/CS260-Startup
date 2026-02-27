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
            date: new Date(2026, 1, 22, 10),
            title: "Service Project",
            allDay: false
        }
    ]
    
    
    localStorage.setItem('userEvents', JSON.stringify(events));
}

