// ============================================
// 📅 CALENDAR EVENTS - EDIT HERE
// ============================================

const calendarEvents = {
    "2025-10-26": [
        {
            title: "Presentation",
            description: "English II group presentation"
        },
    ],
	"2025-10-27": [
        {
            title: "Presentation",
            description: "English II group presentation"
        },
    ],

    "2025-01-25": [
        {
            title: "Final Project Presentation",
            description: "Present your web development project"
        }
    ],
    "2025-01-18": [
        {
            title: "Physics Lab Report Due",
            description: "Submit electromagnetic induction lab report by 5 PM"
        }
    ],
    "2025-01-10": [
        {
            title: "Final Exam",
            description: "Final exam at 10:00 AM in Room 301"
        }
    ]
};

// ============================================
// HOW TO ADD/EDIT CALENDAR EVENTS
// ============================================
// FORMAT: "YYYY-MM-DD": [ { events } ]
//
// TO ADD AN EVENT:
// 1. Find the date or create new date entry:
//    "2025-01-20": [
//
// 2. Add event object:
//        {
//            title: "Event Title",
//            description: "Event details here"
//        }
//    ],
//
// MULTIPLE EVENTS ON SAME DAY:
//    "2025-01-20": [
//        {
//            title: "Event 1",
//            description: "Details 1"
//        },
//        {
//            title: "Event 2",
//            description: "Details 2"
//        }
//    ],
//
// TO REMOVE AN EVENT:
// Delete the event object or the entire date entry
//
// EXAMPLE:
// "2025-02-14": [
//     {
//         title: "Mid-term Exam",
//         description: "CSE 63B mid-term at 10 AM"
//     }
// ],