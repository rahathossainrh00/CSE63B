// ============================================
// 📅 CLASS SCHEDULE - EDIT HERE
// ============================================

const scheduleData = {
    // Time slots for the header row
    timeSlots: [
        "09:00 AM - 10:15 AM",
        "10:15 AM - 11:30 AM",
        "11:30 AM - 12:45 PM",
        "01:00 PM - 02:15 PM",
        "02:15 PM - 03:30 PM",
        "03:30 PM - 04:45 PM"
    ],
    
    // Days and their classes
    days: [
        {
            day: "SUNDAY",
            bgColor: "white", // Options: "white" or "blue"
            classes: [
                { name: "ENG II", instructor: "NHS", room: "508", colspan: 1 },
                { name: "BEE", instructor: "FHR", room: "508", colspan: 1 },
                null, // Empty slot
                null,
                null,
                null
            ]
        },
        {
            day: "MONDAY",
            bgColor: "blue",
            classes: [
                null,
                null,
                { name: "PHY II", instructor: "SUA", room: "GL-2", colspan: 1 },
                null,
                { name: "SP", instructor: "GMN", room: "506", colspan: 1 },
                { name: "ENG II", instructor: "NHS", room: "506", colspan: 1 }
            ]
        },
        {
            day: "TUESDAY",
            bgColor: "white",
            classes: [
                { name: "BEE Lab", instructor: "FHR", room: "108", colspan: 2 },
                null, // Skip because lab spans 2 slots
                null,
                null,
                null,
                null
            ]
        },
        {
            day: "WEDNESDAY",
            bgColor: "blue",
            classes: [
                null,
                null,
                { name: "PHY II", instructor: "SUA", room: "GL-1", colspan: 1 },
                { name: "SP", instructor: "GMN", room: "408", colspan: 1 },
                null,
                { name: "BEE", instructor: "FHR", room: "502", colspan: 1 }
            ]
        },
        {
            day: "THURSDAY",
            bgColor: "white",
            classes: [
                { name: "SP Lab", instructor: "GMN", room: "309", colspan: 2 },
                null, // Skip because lab spans 2 slots
                null,
                null,
                null,
                null
            ]
        }
    ]
};

// ============================================
// HOW TO EDIT YOUR SCHEDULE
// ============================================
// 
// TO CHANGE TIME SLOTS:
// Edit the times in the "timeSlots" array above
//
// TO ADD/EDIT A CLASS:
// { name: "CLASS NAME", instructor: "INITIALS", room: "ROOM#", colspan: 1 }
//
// FOR LAB SESSIONS (2 hours):
// { name: "Lab Name", instructor: "XXX", room: "###", colspan: 2 }
// Then put null in the next slot
//
// FOR EMPTY SLOTS:
// Just write: null
//
// TO CHANGE ROW COLORS:
// Set bgColor to "white" or "blue"
//
// IMPORTANT: Each day must have exactly 6 classes/nulls (one for each time slot)