// ============================================
// 🚀 ENHANCED PORTAL ENGINE
// ============================================

// Global State
let currentMonthOffset = 0;
let calendarCache = {};
let currentFilter = 'all';
let allSubjectsData = [];

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    showLoadingState();
    setTimeout(() => {
        renderPortalContent();
        initializeEnhancements();
    }, 500);
});

// ============================================
// LOADING STATE
// ============================================

function showLoadingState() {
    const containers = ['announcements-container', 'assignments-container', 'subjects-container'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        container.innerHTML = Array(3).fill(0).map(() => `
            <div class="skeleton h-48 rounded-xl"></div>
        `).join('');
    });
}

// ============================================
// AUTO-HIDE LOGIC (36 HOURS)
// ============================================

function shouldShowAnnouncement(dateString) {
    const announcementDate = new Date(dateString);
    const now = new Date();
    const hours36Ago = new Date(now.getTime() - (36 * 60 * 60 * 1000));
    return announcementDate >= hours36Ago;
}

function shouldShowAssignment(deadline) {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const hours36AfterDeadline = new Date(deadlineDate.getTime() + (36 * 60 * 60 * 1000));
    return now < hours36AfterDeadline;
}

// ============================================
// COUNTDOWN TIMER WITH URGENT WARNINGS
// ============================================

function calculateTimeRemaining(deadline) {
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const difference = deadlineTime - now;
    
    if (difference <= 0) {
        return { expired: true };
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { expired: false, days, hours, minutes, seconds };
}

function updateCountdown(assignmentId, deadline) {
    const countdownElement = document.getElementById(`countdown-${assignmentId}`);
    if (!countdownElement) return;
    
    const timeData = calculateTimeRemaining(deadline);
    
    if (timeData.expired) {
        countdownElement.innerHTML = `
            <div class="text-red-600 font-bold text-center py-2 flex items-center justify-center gap-2">
                <i data-lucide="alert-circle" class="w-5 h-5"></i>
                <span>Time's Up</span>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    // Determine urgency class
    let urgencyClass = '';
    if (timeData.days === 0) {
        urgencyClass = 'countdown-urgent-red';
    } else if (timeData.days <= 2) {
        urgencyClass = 'countdown-urgent-orange';
    }
    
    countdownElement.innerHTML = `
        <div class="flex justify-center gap-2 text-center ${urgencyClass}">
            <div class="countdown-box bg-gray-100 rounded-lg p-2">
                <div class="text-xl font-bold text-gray-800">${timeData.days}</div>
                <div class="text-xs text-gray-500">Days</div>
            </div>
            <div class="countdown-box bg-gray-100 rounded-lg p-2">
                <div class="text-xl font-bold text-gray-800">${String(timeData.hours).padStart(2, '0')}</div>
                <div class="text-xs text-gray-500">Hours</div>
            </div>
            <div class="countdown-box bg-gray-100 rounded-lg p-2">
                <div class="text-xl font-bold text-gray-800">${String(timeData.minutes).padStart(2, '0')}</div>
                <div class="text-xs text-gray-500">Mins</div>
            </div>
            <div class="countdown-box bg-gray-100 rounded-lg p-2">
                <div class="text-xl font-bold text-gray-800">${String(timeData.seconds).padStart(2, '0')}</div>
                <div class="text-xs text-gray-500">Secs</div>
            </div>
        </div>
    `;
}

// ============================================
// ANNOUNCEMENT CARD GENERATOR
// ============================================

function createAnnouncementCard(announcement) {
    const date = new Date(announcement.date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `
        <div class="p-6 bg-white border border-gray-200 rounded-xl shadow-lg transition hover:shadow-xl">
            <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${announcement.categoryColor}">
                ${announcement.category}
            </span>
            <p class="text-xs text-gray-500 mt-2">${date}</p>
            <h4 class="mt-2 text-lg font-bold text-gray-800">${announcement.title}</h4>
            <p class="mt-2 text-sm text-gray-600">${announcement.description}</p>
        </div>
    `;
}

// ============================================
// ASSIGNMENT CARD GENERATOR (WITH SORTING)
// ============================================

function createAssignmentCard(assignment) {
    const deadlineDate = new Date(assignment.deadline).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Check if recently added (within 7 days)
    const isNew = assignment.isNew || false;
    
    return `
        <div class="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 transition hover:shadow-2xl hover:border-blue-600 relative" data-type="${assignment.type.toLowerCase()}">
            ${isNew ? '<span class="new-badge">NEW</span>' : ''}
            <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-semibold text-white px-3 py-1 rounded-full ${assignment.subjectColor}">
                    ${assignment.subject}
                </span>
                <span class="text-xs font-semibold ${assignment.type === 'Assignment' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'} px-3 py-1 rounded-full">
                    ${assignment.type}
                </span>
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-2">${assignment.title}</h3>
            <p class="text-sm text-gray-600 mb-4">${assignment.description}</p>
            
            <div class="mb-4">
                <div class="flex items-center text-xs text-gray-500 mb-2">
                    <i data-lucide="calendar" class="w-4 h-4 mr-1"></i>
                    Due: ${deadlineDate}
                </div>
                <div id="countdown-${assignment.id}" class="mt-3">
                    <!-- Countdown will be inserted here -->
                </div>
            </div>
            
            <div class="border-t pt-4">
                <button onclick="openAssignmentDetails('${assignment.id}')" 
                   class="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center gap-2">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                    View Details
                </button>
            </div>
        </div>
    `;
}

// ============================================
// ASSIGNMENT QUICK STATS
// ============================================

function renderAssignmentStats(assignments) {
    const statsContainer = document.getElementById('assignment-stats');
    const now = new Date();
    
    const total = assignments.length;
    const dueToday = assignments.filter(a => {
        const deadline = new Date(a.deadline);
        return deadline.toDateString() === now.toDateString();
    }).length;
    
    const dueTomorrow = assignments.filter(a => {
        const deadline = new Date(a.deadline);
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return deadline.toDateString() === tomorrow.toDateString();
    }).length;
    
    statsContainer.innerHTML = `
        <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
                <i data-lucide="clipboard-list" class="w-5 h-5 text-blue-600"></i>
                <span class="font-semibold text-gray-700">${total} Active</span>
            </div>
            ${dueToday > 0 ? `
                <div class="flex items-center gap-2">
                    <i data-lucide="alert-circle" class="w-5 h-5 text-red-600"></i>
                    <span class="font-semibold text-red-600">${dueToday} Due Today</span>
                </div>
            ` : ''}
            ${dueTomorrow > 0 ? `
                <div class="flex items-center gap-2">
                    <i data-lucide="clock" class="w-5 h-5 text-orange-600"></i>
                    <span class="font-semibold text-orange-600">${dueTomorrow} Due Tomorrow</span>
                </div>
            ` : ''}
        </div>
    `;
    lucide.createIcons();
}

// ============================================
// ASSIGNMENT FILTERING
// ============================================

function filterAssignments(type) {
    currentFilter = type;
    
    // Update button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    event.target.classList.remove('bg-gray-200', 'text-gray-700');
    event.target.classList.add('bg-blue-600', 'text-white');
    
    // Filter cards
    const cards = document.querySelectorAll('#assignments-container > div');
    cards.forEach(card => {
        if (type === 'all') {
            card.style.display = '';
        } else {
            const cardType = card.getAttribute('data-type');
            card.style.display = cardType === type ? '' : 'none';
        }
    });
}

// ============================================
// ASSIGNMENT DETAILS MODAL
// ============================================

function openAssignmentDetails(assignmentId) {
    const assignment = assignmentsData.find(a => a.id === assignmentId);
    if (!assignment) return;
    
    const modal = document.getElementById('assignment-details-modal');
    const modalTitle = document.getElementById('assignment-modal-title');
    const modalBody = document.getElementById('assignment-modal-body');
    
    modalTitle.textContent = assignment.title;
    
    // Update page title
    document.title = `${assignment.title} - CSE 63B Portal`;
    
    let categoriesHTML = '';
    Object.keys(assignment.categories).forEach((categoryName, index) => {
        const items = assignment.categories[categoryName];
        categoriesHTML += `
            <div class="mb-6 border rounded-lg overflow-hidden">
                <button class="category-toggle w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                        data-category-index="${index}">
                    <div class="flex items-center gap-3">
                        <i data-lucide="folder" class="w-5 h-5 text-blue-600"></i>
                        <span class="font-bold text-gray-800">${categoryName}</span>
                        <span class="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">${items.length}</span>
                    </div>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500 transition-transform category-arrow"></i>
                </button>
                <div class="dropdown-content bg-white" id="assign-category-${index}">
                    <div class="p-4 space-y-3">
                        ${items.map(item => `
                            <a href="${item.link}" target="_blank"
                               class="block p-3 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition group">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-gray-700 group-hover:text-blue-600">${item.name}</span>
                                    <i data-lucide="external-link" class="w-4 h-4 text-gray-400 group-hover:text-blue-600"></i>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    modalBody.innerHTML = categoriesHTML;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    lucide.createIcons();
    
    // Add dropdown listeners
    document.querySelectorAll('.category-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.categoryIndex;
            const content = document.getElementById(`assign-category-${index}`);
            const arrow = this.querySelector('.category-arrow');
            
            content.classList.toggle('open');
            if (content.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// ============================================
// SCHEDULE TABLE GENERATOR
// ============================================

function renderSchedule() {
    const headerRow = document.getElementById('schedule-header');
    const tbody = document.getElementById('schedule-body');
    
    if (!scheduleData) return;
    
    let headerHTML = '<th class="py-3 px-4 rounded-tl-xl"></th>';
    scheduleData.timeSlots.forEach((slot, index) => {
        const roundClass = index === scheduleData.timeSlots.length - 1 ? 'rounded-tr-xl' : '';
        headerHTML += `<th class="py-3 px-4 ${roundClass}">${slot}</th>`;
    });
    headerRow.innerHTML = headerHTML;
    
    let bodyHTML = '';
    scheduleData.days.forEach(dayData => {
        const bgClass = dayData.bgColor === "blue" ? "bg-blue-50" : "bg-white";
        bodyHTML += `<tr class="${bgClass} rounded-xl shadow-md">`;
        bodyHTML += `<td class="font-bold text-blue-600 py-4 px-3 rounded-l-xl">${dayData.day}</td>`;
        
        let skipNext = 0;
        dayData.classes.forEach((classData, index) => {
            if (skipNext > 0) {
                skipNext--;
                return;
            }
            
            const isLast = index === dayData.classes.length - 1;
            const roundClass = isLast ? 'rounded-r-xl' : '';
            
            if (classData === null) {
                bodyHTML += `<td class="py-3 ${roundClass}"></td>`;
            } else {
                const colspanAttr = classData.colspan > 1 ? `colspan="${classData.colspan}"` : '';
                if (classData.colspan > 1) {
                    skipNext = classData.colspan - 1;
                }
                
                bodyHTML += `<td class="py-3 ${roundClass}" ${colspanAttr}>
                    <div class="bg-white border-2 border-blue-600 rounded-xl shadow-md p-2 w-11/12 mx-auto">
                        <p class="font-bold text-blue-600">${classData.name}</p>
                        <p class="italic text-blue-800 text-xs">${classData.instructor}</p>
                        <p class="text-xs">(${classData.room})</p>
                    </div>
                </td>`;
            }
        });
        
        bodyHTML += '</tr>';
    });
    
    tbody.innerHTML = bodyHTML;
}

// ============================================
// EXPORT SCHEDULE (Using provided image)
// ============================================

function exportSchedule() {
    // When you provide the image URL, replace 'YOUR_SCHEDULE_IMAGE_URL' with the actual URL
    const scheduleImageUrl = 'https://github.com/rahathossainrh00/CSE63B/blob/main/Class-Schedule.jpg';
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = scheduleImageUrl;
    link.download = 'CSE_63B_Schedule.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// SUBJECT CARD GENERATOR
// ============================================

function createSubjectCard(subject) {
    const typeColor = subject.type === 'lab' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700';
    const typeText = subject.type === 'lab' ? 'Lab' : 'Theory';
    
    const categoryCount = Object.keys(subject.categories).length;
    
    return `
        <div class="subject-card cursor-pointer bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl hover:border-blue-600 transform hover:scale-105"
             data-subject-id="${subject.id}"
             data-subject-name="${subject.name.toLowerCase()}"
             data-subject-teacher="${subject.teacher.toLowerCase()}">
            <div class="${subject.color} p-6 text-white relative">
                <div class="absolute top-4 right-4">
                    <span class="text-xs font-semibold px-3 py-1 rounded-full ${typeColor}">
                        ${typeText}
                    </span>
                </div>
                <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                    <i data-lucide="${subject.icon}" class="w-7 h-7"></i>
                </div>
                <h3 class="text-2xl font-bold">${subject.name}</h3>
                <p class="text-sm opacity-90 mt-1">${subject.fullName}</p>
                <p class="text-xs opacity-75 mt-2">${subject.teacher}</p>
            </div>
            <div class="p-4 bg-white">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                        <i data-lucide="folder" class="w-4 h-4"></i>
                        <span class="font-medium">${categoryCount} Categories</span>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-blue-600"></i>
                </div>
                <button onclick="openSubjectModal('${subject.id}'); event.stopPropagation();" 
                        class="w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg transition text-sm flex items-center justify-center gap-2">
                    <i data-lucide="folder-open" class="w-4 h-4"></i>
                    Quick Access to Drive
                </button>
            </div>
        </div>
    `;
}

// ============================================
// SUBJECT SEARCH FUNCTIONALITY
// ============================================

function initSubjectSearch() {
    // Search removed from subjects section
    // Keeping function for compatibility
}

// ============================================
// SUBJECT MODAL WITH RESOURCE SEARCH
// ============================================

function openSubjectModal(subjectId) {
    const subject = subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    
    const modal = document.getElementById('subject-modal');
    const modalIcon = document.getElementById('subject-modal-icon');
    const modalTitle = document.getElementById('subject-modal-title');
    const modalSubtitle = document.getElementById('subject-modal-subtitle');
    const modalBody = document.getElementById('subject-modal-body');
    const driveLink = document.getElementById('drive-folder-link');
    const breadcrumbName = document.getElementById('subject-breadcrumb-name');
    
    modalIcon.className = `w-12 h-12 rounded-full flex items-center justify-center text-white ${subject.color}`;
    modalIcon.innerHTML = `<i data-lucide="${subject.icon}" class="w-6 h-6"></i>`;
    modalTitle.textContent = subject.name;
    modalSubtitle.textContent = subject.fullName;
    driveLink.href = subject.driveFolder;
    breadcrumbName.textContent = subject.name;
    
    // Update page title
    document.title = `${subject.name} - CSE 63B Portal`;
    
    let categoriesHTML = '';
    Object.keys(subject.categories).forEach((categoryName, index) => {
        const items = subject.categories[categoryName];
        categoriesHTML += `
            <div class="mb-6 border rounded-lg overflow-hidden resource-category">
                <button class="category-toggle w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                        data-category-index="${index}">
                    <div class="flex items-center gap-3">
                        <i data-lucide="folder" class="w-5 h-5 text-blue-600"></i>
                        <span class="font-bold text-gray-800">${categoryName}</span>
                        <span class="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">${items.length}</span>
                    </div>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500 transition-transform category-arrow"></i>
                </button>
                <div class="dropdown-content bg-white" id="subject-category-${index}">
                    <div class="p-4 space-y-3">
                        ${items.map(item => `
                            <a href="${item.link}" target="_blank"
                               class="resource-item block p-3 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition group"
                               data-name="${item.name.toLowerCase()}">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium text-gray-700 group-hover:text-blue-600">${item.name}</span>
                                    <i data-lucide="external-link" class="w-4 h-4 text-gray-400 group-hover:text-blue-600"></i>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    modalBody.innerHTML = categoriesHTML;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    lucide.createIcons();
    
    // Initialize resource search
    initModalResourceSearch();
    
    document.querySelectorAll('.category-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.categoryIndex;
            const content = document.getElementById(`subject-category-${index}`);
            const arrow = this.querySelector('.category-arrow');
            
            content.classList.toggle('open');
            if (content.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
}

function initModalResourceSearch() {
    const searchInput = document.getElementById('modal-resource-search');
    searchInput.value = ''; // Reset search
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const categories = document.querySelectorAll('.resource-category');
        
        categories.forEach(category => {
            const items = category.querySelectorAll('.resource-item');
            let hasVisibleItems = false;
            
            items.forEach(item => {
                const name = item.getAttribute('data-name');
                if (name.includes(searchTerm)) {
                    item.style.display = '';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide category based on visible items
            if (searchTerm && hasVisibleItems) {
                category.style.display = '';
                // Auto-expand category if has matches
                const dropdown = category.querySelector('.dropdown-content');
                dropdown.classList.add('open');
                category.querySelector('.category-arrow').style.transform = 'rotate(180deg)';
            } else if (searchTerm && !hasVisibleItems) {
                category.style.display = 'none';
            } else {
                category.style.display = '';
            }
        });
    });
}

// ============================================
// CONTACT CARD GENERATOR
// ============================================

function createContactCard(contact) {
    const hasImage = contact.profileImage && contact.profileImage !== '';
    
    return `
        <div class="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg">
            <div class="flex items-start gap-4">
                <div class="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ${hasImage ? '' : 'bg-blue-100 border-4 border-blue-600'}">
                    ${hasImage 
                        ? `<img src="${contact.profileImage}" alt="${contact.name}" class="w-full h-full rounded-full object-cover" loading="lazy">`
                        : `<i data-lucide="user" class="w-10 h-10 text-blue-600"></i>`
                    }
                </div>
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800">${contact.name}</h3>
                    <p class="text-sm text-blue-600 font-semibold">${contact.designation}</p>
                    <div class="mt-3 space-y-2 text-sm text-gray-600">
                        <p class="flex items-center">
                            <i data-lucide="mail" class="w-4 h-4 mr-2 text-gray-500"></i>
                            <a href="mailto:${contact.email}" class="hover:underline">${contact.email}</a>
                        </p>
                        <p class="flex items-center">
                            <i data-lucide="phone" class="w-4 h-4 mr-2 text-gray-500"></i>
                            <a href="tel:${contact.phone}" class="hover:underline">${contact.phone}</a>
                        </p>
                        ${contact.howToContact ? `
                            <div class="mt-3 pt-3 border-t border-gray-200">
                                <div class="flex items-start gap-2">
                                    <div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <i data-lucide="info" class="w-3 h-3 text-blue-600"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-700 text-xs mb-1">How to Contact</p>
                                        <p class="text-xs text-gray-600 leading-relaxed">${contact.howToContact}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// CALENDAR GENERATOR WITH MONTH NAVIGATION
// ============================================

function generateCalendar(monthOffset = 0) {
    // Check cache
    const cacheKey = `calendar-${monthOffset}`;
    if (calendarCache[cacheKey]) {
        return calendarCache[cacheKey];
    }
    
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    // Update month/year display
    document.getElementById('calendar-month-year').textContent = `${monthNames[month]} ${year}`;
    
    let calendarHTML = `
        <div class="grid grid-cols-7 gap-2 mb-2">
            <div class="text-center font-semibold text-gray-600 py-2">Sun</div>
            <div class="text-center font-semibold text-gray-600 py-2">Mon</div>
            <div class="text-center font-semibold text-gray-600 py-2">Tue</div>
            <div class="text-center font-semibold text-gray-600 py-2">Wed</div>
            <div class="text-center font-semibold text-gray-600 py-2">Thu</div>
            <div class="text-center font-semibold text-gray-600 py-2">Fri</div>
            <div class="text-center font-semibold text-gray-600 py-2">Sat</div>
        </div>
        <div class="grid grid-cols-7 gap-2">
    `;
    
    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += '<div></div>';
    }
    
    // Calendar days
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = calendarEvents[dateStr] && calendarEvents[dateStr].length > 0;
        const isToday = isCurrentMonth && day === today.getDate();
        
        calendarHTML += `
            <div class="calendar-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}" 
                 data-date="${dateStr}"
                 ${hasEvent ? `onmouseenter="showEventTooltip(event, '${dateStr}')" onmouseleave="hideEventTooltip()"` : ''}>
                ${day}
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    
    // Cache the result
    calendarCache[cacheKey] = calendarHTML;
    
    return calendarHTML;
}

function showEventTooltip(event, dateStr) {
    const tooltip = document.getElementById('event-tooltip');
    const events = calendarEvents[dateStr];
    
    if (!events || events.length === 0) return;
    
    let tooltipHTML = '';
    events.forEach(evt => {
        tooltipHTML += `
            <div class="mb-2 last:mb-0">
                <div class="font-bold text-blue-600 text-sm">${evt.title}</div>
                <div class="text-xs text-gray-600">${evt.description}</div>
            </div>
        `;
    });
    
    tooltip.innerHTML = tooltipHTML;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
    tooltip.classList.add('show');
}

function hideEventTooltip() {
    const tooltip = document.getElementById('event-tooltip');
    tooltip.classList.remove('show');
}

// ============================================
// MAIN RENDER FUNCTION
// ============================================

function renderPortalContent() {
    // Render Announcements
    const announcementsContainer = document.getElementById('announcements-container');
    const visibleAnnouncements = announcementsData.filter(a => shouldShowAnnouncement(a.date));
    
    if (visibleAnnouncements.length === 0) {
        announcementsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-lucide="inbox" class="w-16 h-16 mx-auto text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg font-medium">No recent announcements</p>
                <p class="text-gray-400 text-sm mt-2">Check back later for updates</p>
            </div>
        `;
    } else {
        announcementsContainer.innerHTML = visibleAnnouncements
            .slice(0, 3)
            .map(createAnnouncementCard)
            .join('');
    }
    
    // Render Assignments (SORTED BY DEADLINE)
    const assignmentsContainer = document.getElementById('assignments-container');
    const visibleAssignments = assignmentsData
        .filter(a => shouldShowAssignment(a.deadline))
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort by soonest first
    
    if (visibleAssignments.length === 0) {
        assignmentsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-lucide="check-circle" class="w-16 h-16 mx-auto text-green-500 mb-4"></i>
                <p class="text-gray-500 text-lg font-medium">No active assignments</p>
                <p class="text-gray-400 text-sm mt-2">You're all caught up! 🎉</p>
            </div>
        `;
        document.getElementById('assignment-stats').style.display = 'none';
    } else {
        assignmentsContainer.innerHTML = visibleAssignments.map(createAssignmentCard).join('');
        renderAssignmentStats(visibleAssignments);
        
        // Start countdown timers
        visibleAssignments.forEach(assignment => {
            updateCountdown(assignment.id, assignment.deadline);
            setInterval(() => updateCountdown(assignment.id, assignment.deadline), 1000);
        });
    }
    
    // Render Schedule
    renderSchedule();
    
    // Render Subjects
    const subjectsContainer = document.getElementById('subjects-container');
    allSubjectsData = subjectsData; // Store for search
    subjectsContainer.innerHTML = subjectsData.map(createSubjectCard).join('');
    
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            openSubjectModal(this.dataset.subjectId);
        });
    });
    
    // Render Contact
    const contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = contactData.map(createContactCard).join('');
    
    lucide.createIcons();
}

// ============================================
// ENHANCEMENTS INITIALIZATION
// ============================================

function initializeEnhancements() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
    
    // Progress Bar
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });
    
    // Active Section Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                // Update page title
                const sectionName = current.charAt(0).toUpperCase() + current.slice(1);
                document.title = `${sectionName} - CSE 63B Portal`;
            }
        });
    });
    
    // Scroll to Top FAB
    const fab = document.getElementById('scroll-to-top');
    fab.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide FAB based on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            fab.style.opacity = '1';
            fab.style.pointerEvents = 'auto';
        } else {
            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
        }
    });
    
    // Initialize searches
    initSubjectSearch();
    
    // Export Schedule Button
    document.getElementById('export-schedule-btn').addEventListener('click', exportSchedule);
    
    // Swipe to close modals (mobile)
    initSwipeToClose();
}

// ============================================
// SWIPE TO CLOSE MODALS (MOBILE)
// ============================================

function initSwipeToClose() {
    const modals = document.querySelectorAll('[id$="-modal"]');
    
    modals.forEach(modal => {
        let startY = 0;
        let currentY = 0;
        const modalContent = modal.querySelector('.modal-content-animate');
        
        if (!modalContent) return;
        
        modalContent.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        modalContent.addEventListener('touchmove', function(e) {
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 0) {
                modalContent.style.transform = `translateY(${diff}px)`;
            }
        }, { passive: true });
        
        modalContent.addEventListener('touchend', function() {
            const diff = currentY - startY;
            
            if (diff > 100) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.title = 'CSE 63B - Web Portal';
            }
            
            modalContent.style.transform = '';
            startY = 0;
            currentY = 0;
        });
    });
}

// ============================================
// MODAL HANDLERS
// ============================================

// Calendar Modal
document.getElementById('open-calendar-btn').addEventListener('click', function() {
    const modal = document.getElementById('calendar-modal');
    const calendarView = document.getElementById('calendar-view');
    currentMonthOffset = 0;
    calendarView.innerHTML = generateCalendar(currentMonthOffset);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.title = 'Calendar - CSE 63B Portal';
    lucide.createIcons();
});

document.getElementById('close-calendar-btn').addEventListener('click', function() {
    document.getElementById('calendar-modal').classList.add('hidden');
    document.getElementById('calendar-modal').classList.remove('flex');
    document.title = 'CSE 63B - Web Portal';
});

// Month Navigation
document.getElementById('prev-month-btn').addEventListener('click', function() {
    currentMonthOffset--;
    document.getElementById('calendar-view').innerHTML = generateCalendar(currentMonthOffset);
    lucide.createIcons();
});

document.getElementById('next-month-btn').addEventListener('click', function() {
    currentMonthOffset++;
    document.getElementById('calendar-view').innerHTML = generateCalendar(currentMonthOffset);
    lucide.createIcons();
});

// Announcement History Modal
document.getElementById('open-announcement-history-btn').addEventListener('click', function() {
    const modal = document.getElementById('announcement-history-modal');
    const body = document.getElementById('announcement-history-body');
    const allAnnouncements = announcementsData.filter(a => !shouldShowAnnouncement(a.date));
    
    if (allAnnouncements.length === 0) {
        body.innerHTML = `
            <div class="text-center py-12">
                <i data-lucide="inbox" class="w-16 h-16 mx-auto text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg font-medium">No announcement history yet</p>
                <p class="text-gray-400 text-sm mt-2">Past announcements will appear here</p>
            </div>
        `;
    } else {
        body.innerHTML = '<div class="grid md:grid-cols-2 gap-6">' + 
            allAnnouncements.map(createAnnouncementCard).join('') + 
            '</div>';
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.title = 'Announcement History - CSE 63B Portal';
    lucide.createIcons();
});

document.getElementById('close-announcement-history-btn').addEventListener('click', function() {
    document.getElementById('announcement-history-modal').classList.add('hidden');
    document.getElementById('announcement-history-modal').classList.remove('flex');
    document.title = 'CSE 63B - Web Portal';
});

// Assignment History Modal
document.getElementById('open-assignment-history-btn').addEventListener('click', function() {
    const modal = document.getElementById('assignment-history-modal');
    const body = document.getElementById('assignment-history-body');
    const allAssignments = assignmentsData.filter(a => !shouldShowAssignment(a.deadline));
    
    if (allAssignments.length === 0) {
        body.innerHTML = `
            <div class="text-center py-12">
                <i data-lucide="inbox" class="w-16 h-16 mx-auto text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg font-medium">No assignment history yet</p>
                <p class="text-gray-400 text-sm mt-2">Completed assignments will appear here</p>
            </div>
        `;
    } else {
        body.innerHTML = '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">' + 
            allAssignments.map(createAssignmentCard).join('') + 
            '</div>';
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.title = 'Assignment History - CSE 63B Portal';
    lucide.createIcons();
});

document.getElementById('close-assignment-history-btn').addEventListener('click', function() {
    document.getElementById('assignment-history-modal').classList.add('hidden');
    document.getElementById('assignment-history-modal').classList.remove('flex');
    document.title = 'CSE 63B - Web Portal';
});

// Assignment Details Modal
document.getElementById('close-assignment-details-btn').addEventListener('click', function() {
    document.getElementById('assignment-details-modal').classList.add('hidden');
    document.getElementById('assignment-details-modal').classList.remove('flex');
    document.title = 'CSE 63B - Web Portal';
});

// Subject Modal
document.getElementById('close-subject-modal-btn').addEventListener('click', function() {
    document.getElementById('subject-modal').classList.add('hidden');
    document.getElementById('subject-modal').classList.remove('flex');
    document.title = 'CSE 63B - Web Portal';
});

// Close modals on outside click
[
    'calendar-modal',
    'announcement-history-modal',
    'assignment-history-modal',
    'assignment-details-modal',
    'subject-modal'
].forEach(modalId => {
    document.getElementById(modalId).addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
            this.classList.remove('flex');
            document.title = 'CSE 63B - Web Portal';
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('[id$="-modal"]').forEach(modal => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
        document.title = 'CSE 63B - Web Portal';
    }
});

// Auto-refresh every hour

setInterval(renderPortalContent, 3600000);
