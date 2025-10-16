// ============================================
// 📚 SUBJECTS & RESOURCES - EDIT HERE
// ============================================

const subjectsData = [
    {
        id: "phy-2",
        name: "PHY II",
        fullName: "Physics II - PHY 123",
        teacher: "Safwan Uddin Ahmed (SUA)",
        icon: "atom",
        color: "bg-blue-600",
        type: "theory",
        driveFolder: "https://drive.google.com/drive/folders/1DqVsq2LyrHEwv38pi9_OQvsZgXXxxqCs?usp=sharing",
        categories: {
            "Lecture Slides": [
                { name: "Interference", link: "https://drive.google.com/file/d/1C1hJ7o0HbJ4YxhgRhwC4iHjUlwCvZ81o/view?usp=drive_link" },
                { name: "Diffraction", link: "https://drive.google.com/file/d/1gKSuYn_41RwCGHJm8L_lW2zFfDiDSDSx/view?usp=drive_link" },
                { name: "Modern Physics", link: "https://drive.google.com/file/d/1uBWfBoZdZhz8NxLir39_5B3_pqAHsoyU/view?usp=drive_link" },
                { name: "Nuclear Physics", link: "https://drive.google.com/file/d/1kgZuckfgGM6IHVSJolkHY-9mli6Zxv2v/view?usp=drive_link" },
                { name: "Radioactive Decay Law", link: "https://drive.google.com/file/d/1O8Aqxgd3eeotuQnphhz7iiCdMKRgHF2O/view?usp=drive_link" }
            ],
            "Books": [
                { name: "Chapter 35 - Interference", link: "https://drive.google.com/file/d/15g-90i0oXkPuTt0ur8L1vFDcGZdGWzZ9/preview" },
                { name: "Chapter 36 - Diffraction", link: "https://drive.google.com/file/d/1QL6lifsfOXSYeTag6zBAz19sQC93ykM1/view?preview" },
                { name: "Chapter 38 - Modern Physics", link: "https://drive.google.com/file/d/19pGW0ns5q_zgBz0v6_LkvXAGg2fHZAjn/view?preview" },
                { name: "Chapter 41 - Nuclear Physics", link: "https://drive.google.com/file/d/19MpExpffpW2rUSZAqVJUOcARaTPVqanH/view?preview" }
            ],
            "Notes": [
                { name: "By Deena", link: "https://drive.google.com/drive/folders/15Nrhuwb1msYKsYR5_YMhYIo7bzC4OJLS?usp=drive_link" }
            ],
            "Questions": [
                { name: "62th Batch Question", link: "https://drive.google.com/file/d/1uBavT1sm-KGIhufjZeahAQp1vKY45XBv/view?usp=drive_link" }
            ]
        }
    },
    {
        id: "sp",
        name: "SP",
        fullName: "Structured Programming - CSE 121",
        teacher: "Golam Mostofa Naeem (GMN)",
        icon: "code",
        color: "bg-blue-600",
        type: "theory",
        driveFolder: "https://drive.google.com/drive/folders/15jmzLzOYm2spJrGkxl5d7JxHx-E-ZN0z?usp=drive_link",
        categories: {
            "Notes": [
                { name: "By Rakib", link: "https://drive.google.com/file/d/1dGIXE3xAvZ1sed5MmzalWjbK3NoY_XqL/view?usp=drive_link" },
                { name: "By Deena", link: "https://drive.google.com/drive/folders/10GNeORiihSQW5XemkBkafS64EJaTsrVw?usp=drive_link" }
            ],
            "Books": [
                { name: "Structured Programming Theory", link: "https://drive.google.com/file/d/194fMc9UMR5aYbHAJCrqQOUy2upFzeAV1/view?usp=drive_link" }
            ],
            "Questions": [
                { name: "62 CT", link: "https://drive.google.com/drive/folders/11aGjbS2-kOHwpdau2MqfngJDA65qHT_2?usp=drive_link" },
                { name: "62 Term Final", link: "https://drive.google.com/file/d/1MYlVIiNtRiEqP3qalR4fBtq3QYi4kUya/view?usp=drive_link" }
            ]
        }
    },
    {
        id: "bee",
        name: "BEE",
        fullName: "Basic Electrical Engineering - CSE 131",
        teacher: "Fahim Ashraf (FHR)",
        icon: "zap",
        color: "bg-blue-600",
        type: "theory",
        driveFolder: "https://drive.google.com/drive/folders/12ACKUgAcNQeEv3drFIhrcpmoCkPkY9ZK?usp=drive_link",
        categories: {
            "Notes": [
                { name: "By Deena", link: "https://drive.google.com/drive/folders/17mUtE4P3hRoIN125DD5Pj2AfjdRYELJJ?usp=drive_link" }
            ],
            "Books": [
                { name: "Fundamentals of Electric Circuits 7th Edition -Charles Alexander", link: "https://drive.google.com/file/d/1x_Rd0QBdasr3hHs7EUJNE2BpKX60OGTr/view?usp=drive_link" }
            ],
            "Questions": [
                { name: "62 Term final", link: "https://drive.google.com/file/d/1v1NU9M4xCKJhmBIgeBxktJyXS882XgDE/view?usp=drive_link" }
            ]
        }
    },
    {
        id: "eng-2",
        name: "ENG II",
        fullName: "English II - ENG 115",
        teacher: "Nahida Sarkar Nijhum (NHS)",
        icon: "book",
        color: "bg-blue-600",
        type: "theory",
        driveFolder: "https://drive.google.com/drive/folders/1jOxdK-1N0zpfBtygkQlifqawxgcKzshY?usp=drive_link",
        categories: {
            "Classworks": [
                { name: "List of heading", link: "https://drive.google.com/file/d/1UgcjQXTJaXdV_3r6tf2b6Ht0FgFzOSJJ/view?usp=drive_link" }, 
                { name: "Subject Verb Agreement practice", link: "https://drive.google.com/file/d/1i7r1MokcFhpSPyNq-a9QGqfyvDMUHSRK/view?usp=drive_link" }
            ],
            "Course Materials": [
                { name: "Right Forms of Verb", link: "https://drive.google.com/file/d/12KoR07CkZwIJf1EiXlK9bkY5-JSBYuU_/view?usp=drive_link" },
                { name: "Idioms", link: "https://drive.google.com/file/d/1lCfLIhGozmu9n_etTwLsBPc0Uoa06vxE/view?usp=drive_link" }
            ],
            "Notes": [
                { name: "By Deena", link: "https://drive.google.com/drive/folders/1IzCXQeFZRtVtkCVFX1hRpAWyHChDABYm?usp=drive_link" }
            ]
        }
    },
    {
        id: "sp-lab",
        name: "SP Lab",
        fullName: "Structured Programming Lab - CSE 122",
        teacher: "Golam Mostofa Naeem (GMN)",
        icon: "terminal",
        color: "bg-blue-600",
        type: "lab",
        driveFolder: "https://drive.google.com/drive/folders/15jmzLzOYm2spJrGkxl5d7JxHx-E-ZN0z?usp=drive_link",
        categories: {
            "Lab Tasks": [
                { name: "Day 1", link: "https://drive.google.com/file/d/1N3UnB4SHUPokq3VnY4ObitzWIFM4IS23/view?usp=drive_link" },
                { name: "Day 2", link: "https://drive.google.com/file/d/1-AA1r-qsy0P33-J-7apsK1e9Y3YRaJq-/view?usp=drive_link" }
            ]
        }
    },
    {
        id: "bee-lab",
        name: "BEE Lab",
        fullName: "Basic Electrical Engineering Lab - CSE 132",
        teacher: "Fahim Ashraf (FHR)",
        icon: "plug-zap",
        color: "bg-blue-600",
        type: "lab",
        driveFolder: "https://drive.google.com/drive/folders/12ACKUgAcNQeEv3drFIhrcpmoCkPkY9ZK?usp=drive_link",
        categories: {
            "Sample Lab Report (Done in Class)": [
                { name: "Day 1", link: "https://drive.google.com/file/d/1O-r_xFe0-xjk5BSYeuH5ZC8Y8qQ-6hXW/view?usp=drive_link" },
                { name: "Day 2", link: "https://drive.google.com/file/d/YOUR_ID/preview" },
                { name: "Day 3", link: "https://drive.google.com/file/d/YOUR_ID/preview" },
                { name: "Day 4", link: "https://drive.google.com/file/d/YOUR_ID/preview" }
            ],
            "Sample of Complete Lab Reports": [
                { name: "Day 1", link: "https://drive.google.com/file/d/YOUR_ID/preview" },
                { name: "Day 2", link: "https://drive.google.com/file/d/YOUR_ID/preview" },
                { name: "Day 3", link: "https://drive.google.com/file/d/YOUR_ID/preview" },
                { name: "Day 4", link: "https://drive.google.com/file/d/YOUR_ID/preview" }
            ],
            "Team List": [
                { name: "List", link: "https://drive.google.com/file/d/1t31KSYFMrxx1JymP9vqaxbZMATNy77k8/view?usp=drive_link" }
            ]
        }
    }
];

// ============================================
// HOW TO ADD/REMOVE SUBJECTS
// ============================================
// TO ADD A NEW SUBJECT:
// 1. Copy this template:
//    {
//        id: "subject-id",
//        name: "Subject Code",
//        fullName: "Full Subject Name",
//        teacher: "Teacher Name (Initials)",
//        icon: "icon-name",
//        color: "bg-blue-600",
//        type: "theory",  // or "lab"
//        driveFolder: "https://drive.google.com/drive/folders/YOUR_ID",
//        categories: {
//            "Category 1": [
//                { name: "File 1", link: "https://drive.google.com/file/d/ID/preview" }
//            ]
//        }
//    },
//
// 2. Paste it in the subjectsData array
// 3. Fill in your information
// 4. Save and refresh!
//
// TO REMOVE A SUBJECT:
// Simply delete the entire subject object from the array
//
// AVAILABLE COLORS:
// bg-blue-600, bg-purple-600, bg-green-600, bg-orange-600,
// bg-pink-600, bg-red-600, bg-indigo-600, bg-teal-600
//
// AVAILABLE ICONS:
// code, atom, activity, zap, book, calculator, flask-conical,
// database, cpu, network, book-open, terminal, plug-zap