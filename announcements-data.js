// ============================================
// 📢 ANNOUNCEMENTS - EDIT HERE
// ============================================
// Announcements auto-move to history after 36 HOURS

const announcementsData = [
    {
        id: "ann-001",
        date: "2025-10-14T06:07:00", // Format: YYYY-MM-DDTHH:MM:SS
        category: "Class Cancellation",
        categoryColor: "bg-red-100 text-red-800 border-red-300",
        title: "BEE Class Cancelled",
        description: "THEORY CLASS TOMORROW (15/10/25)  is cancelled"
    },
    {
        id: "ann-002",
        date: "2025-10-15T10:22:00",
        category: "Class Cancellation",
        categoryColor: "bg-red-100 text-red-800 border-red-300",
        title: "Physics II Class Cancelled",
        description: "Today's (15/10/25) Physics II class is cancelled"
    },
];

// ============================================
// CATEGORY COLORS - CUSTOMIZE HERE
// ============================================
// You can create custom categories with custom colors
// Format: "bg-COLOR-100 text-COLOR-800 border-COLOR-300"
//
// Available Tailwind colors:
// red, blue, green, yellow, purple, pink, orange, gray, indigo, teal
//
// Example categories:
// {
//     category: "Quiz",
//     categoryColor: "bg-pink-100 text-pink-800 border-pink-300"
// }
// {
//     category: "Class Test",
//     categoryColor: "bg-purple-100 text-purple-800 border-purple-300"
// }

// ============================================
// HOW TO ADD A NEW ANNOUNCEMENT
// ============================================
// 1. Copy this template:
//    {
//        id: "ann-XXX",
//        date: "2025-01-16T15:00:00",
//        category: "Your Category",
//        categoryColor: "bg-blue-100 text-blue-800 border-blue-300",
//        title: "Announcement Title",
//        description: "Full description here."
//    },
//
// 2. Paste at the TOP of announcementsData array
// 3. Fill in your information
// 4. Use CURRENT date/time to keep visible
// 5. Save and refresh!
//
// AUTO-HIDE: Announcements move to history after 36 hours