// ============================================
// 📝 ASSIGNMENTS & PRESENTATIONS - EDIT HERE
// ============================================
// Auto-move to history 36 hours after deadline

const assignmentsData = [
    {
        id: "presentation-001",
        type: "Presentation", // "Assignment" or "Presentation"
        title: "Group Presentation Day 1",
        subject: "English II",
        subjectColor: "bg-blue-600", // Customize per subject
        description: "Group presentation of a topic with slides",
        deadline: "2025-10-26T09:00:00",
        categories: {
            "Group Details": [
                { name: "Group list", link: "https://docs.google.com/spreadsheets/d/1sOd1jD-06L4W9RDLFdNcvmYveRphDo3UW0qEzEHLZJQ/edit?gid=0#gid=0" },
            ],
	
                    }
    },

    {
        id: "assignment-001",
        type: "SP Lab", // "Assignment" or "Presentation"
        title: "C Programming Contest",
        subject: "Structured Programming Lab",
        subjectColor: "bg-blue-600", // Customize per subject
        description: "Complete the remaining problems in the contest",
        deadline: "2025-10-19T10:25:00",
        categories: {
            "Links": [
                { name: "Contest Link", link: "https://vjudge.net/contest/757567" },
            ],
	
                    }
    },

    {
        id: "presentation-002",
        type: "Presentation", // "Assignment" or "Presentation"
        title: "Group Presentation Day 2",
        subject: "English II",
        subjectColor: "bg-blue-600", // Customize per subject
        description: "Group presentation of a topic with slides",
        deadline: "2025-10-27T15:30:00",
        categories: {
            "Group Details": [
                { name: "Group list", link: "https://docs.google.com/spreadsheets/d/1sOd1jD-06L4W9RDLFdNcvmYveRphDo3UW0qEzEHLZJQ/edit?gid=0#gid=0" },
            ],
	
                    }
    }
];

// ============================================
// SUBJECT COLORS - CUSTOMIZE HERE
// ============================================
// Match these with your subject colors:
// CSE 63B: "bg-blue-600"
// PHY II: "bg-purple-600"
// SP: "bg-green-600"
// BEE: "bg-orange-600"
// ENG II: "bg-pink-600"
// SP Lab: "bg-green-700"
// BEE Lab: "bg-orange-700"

// ============================================
// HOW TO ADD NEW ASSIGNMENT/PRESENTATION
// ============================================
// 1. Copy this template:
//    {
//        id: "assign-XXX",
//        type: "Assignment",  // or "Presentation"
//        title: "Assignment Title",
//        subject: "Course Code",
//        subjectColor: "bg-blue-600",
//        description: "Description here",
//        deadline: "2025-12-31T23:59:59",
//        categories: {
//            "Category 1": [
//                { name: "File 1", link: "https://drive.google.com/file/d/ID/preview" },
//                { name: "File 2", link: "https://drive.google.com/file/d/ID/preview" }
//            ],
//            "Category 2": [
//                { name: "File 3", link: "https://drive.google.com/file/d/ID/preview" }
//            ]
//        }
//    },
//
// 2. Paste at TOP of assignmentsData array
// 3. Customize categories as needed
// 4. Add/remove categories freely
// 5. Save and refresh!
//
// AUTO-HIDE: Moves to history 36 hours after deadline
