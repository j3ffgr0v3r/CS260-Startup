export function ResetDatabase() {
    const events = [
        {
            date: new Date(2026, 1, 7, 20),
            title: "LoTR Marathon"
        }
    ]
    
    
    localStorage.setItem('userEvents', JSON.stringify(events));
}

