document.addEventListener('DOMContentLoaded', () => {
    let allIssues = [];
    let currentTab = 'all';

    const loginForm = document.getElementById('login-form');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const issuesGrid = document.getElementById('issues-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    const issueCountText = document.getElementById('issue-count');
    const searchInput = document.getElementById('search-input');
    const tabBtns = document.querySelectorAll('.tab-btn');

    const modal = document.getElementById('issue-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalStatus = document.getElementById('modal-status');
    const modalAuthor = document.getElementById('modal-author');
    const modalDate = document.getElementById('modal-date');
    const modalLabels = document.getElementById('modal-labels');
    const modalDescription = document.getElementById('modal-description');
    const modalAssignees = document.getElementById('modal-assignees');
    const modalPriority = document.getElementById('modal-priority');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === 'admin' && password === 'admin123') {
                loginView.classList.add('hidden');
                dashboardView.classList.remove('hidden');
                fetchIssues();
            } else {
                alert('Invalid credentials. Please use admin / admin123');
            }
        });
    }

    async function fetchIssues() {
        showLoading(true);
        try {
            const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
            const json = await response.json();
            allIssues = Array.isArray(json) ? json : (json.data || []);
            renderIssues(allIssues);
        } catch (error) {
            console.error('Error fetching issues:', error);
            issuesGrid.innerHTML = '<p class="text-red-500 col-span-full text-center">Failed to load issues.</p>';
        } finally {
            showLoading(false);
        }
    }

    async function searchIssues(query) {
        showLoading(true);
        try {
            const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(query)}`);
            const json = await response.json();
            allIssues = Array.isArray(json) ? json : (json.data || []);
            currentTab = 'all';
            updateActiveTab();
            renderIssues(allIssues);
        } catch (error) {
            console.error('Error searching issues:', error);
        } finally {
            showLoading(false);
        }
    }

    async function fetchSingleIssue(id) {
        try {
            const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
            const json = await response.json();
            const issueData = json.data || json;
            populateAndShowModal(issueData);
        } catch (error) {
            console.error('Error fetching single issue:', error);
        }
    }

    function showLoading(isLoading) {
        if (isLoading) {
            loadingSpinner.classList.remove('hidden');
            issuesGrid.innerHTML = '';
        } else {
            loadingSpinner.classList.add('hidden');
        }
    }

    function renderIssues(issuesToRender) {
        let filtered = issuesToRender;
        if (currentTab !== 'all') {
            filtered = issuesToRender.filter(issue => issue.status.toLowerCase() === currentTab);
        }

        issueCountText.textContent = `${filtered.length} Issues`;
        issuesGrid.innerHTML = '';

        if (filtered.length === 0) {
            issuesGrid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-8">No issues found.</p>';
            return;
        }

        filtered.forEach(issue => {
            const card = document.createElement('div');
            const isOpen = issue.status.toLowerCase() === 'open';
            
            const borderTopClass = isOpen ? 'border-t-4 border-t-green-500' : 'border-t-4 border-t-purple-500';
            const statusIcon = isOpen ? './assets/Open-Status.png' : './assets/Closed- Status .png';

            card.className = `bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full ${borderTopClass}`;
            card.onclick = () => fetchSingleIssue(issue.id || issue._id);

            let labelsHtml = '';
            if (issue.labels && issue.labels.length > 0) {
                labelsHtml = issue.labels.slice(0, 3).map(label => {
                    const labelName = typeof label === 'string' ? label : label.name;
                    let bg = 'bg-gray-100', text = 'text-gray-700';
                    if (labelName.toLowerCase().includes('bug')) { bg = 'bg-red-50'; text = 'text-red-600 border border-red-200'; }
                    else if (labelName.toLowerCase().includes('help')) { bg = 'bg-orange-50'; text = 'text-orange-600 border border-orange-200'; }
                    else if (labelName.toLowerCase().includes('enhancement')) { bg = 'bg-green-50'; text = 'text-green-600 border border-green-200'; }
                    
                    return `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${bg} ${text}">${labelName}</span>`;
                }).join('');
            }

            let priorityHtml = '';
            if (issue.priority) {
                let pBg = 'bg-gray-100', pText = 'text-gray-600';
                if (issue.priority.toLowerCase() === 'high') { pBg = 'bg-red-50'; pText = 'text-red-600'; }
                else if (issue.priority.toLowerCase() === 'medium') { pBg = 'bg-orange-50'; pText = 'text-orange-600'; }
                else if (issue.priority.toLowerCase() === 'low') { pBg = 'bg-gray-50'; pText = 'text-gray-500'; }
                
                priorityHtml = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${pBg} ${pText}">${issue.priority}</span>`;
            }

            const dateStr = issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'N/A';
            const authorName = issue.author ? (issue.author.name || issue.author) : 'Unknown';
            const issueNumber = issue.id || issue._id ? `#${String(issue.id || issue._id).slice(-4)}` : '#---';

            card.innerHTML = `
                <div class="p-5 flex-grow flex flex-col">
                    <div class="flex justify-between items-start mb-3">
                        <img src="${statusIcon}" alt="${issue.status}" class="w-5 h-5">
                        ${priorityHtml}
                    </div>
                    <h3 class="font-bold text-gray-900 text-sm mb-2 line-clamp-2">${issue.title}</h3>
                    <p class="text-xs text-gray-500 mb-4 line-clamp-3 flex-grow">${issue.description || 'No description available.'}</p>
                    <div class="flex flex-wrap gap-1 mb-4 mt-auto">
                        ${labelsHtml}
                    </div>
                    <div class="border-t border-gray-100 pt-3 mt-auto">
                        <p class="text-[11px] text-gray-400">${issueNumber} by ${authorName}</p>
                        <p class="text-[11px] text-gray-400 mt-0.5">${dateStr}</p>
                    </div>
                </div>
            `;
            issuesGrid.appendChild(card);
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = btn.getAttribute('data-tab');
            updateActiveTab();
            renderIssues(allIssues);
        });
    });

    function updateActiveTab() {
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === currentTab) {
                btn.className = 'tab-btn active px-6 py-2 rounded border border-transparent bg-[#4A00FF] text-white text-sm font-medium';
            } else {
                btn.className = 'tab-btn px-6 py-2 rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors';
            }
        });
    }

    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    searchIssues(query);
                } else {
                    fetchIssues(); // Reload all if empty
                }
            }, 500); // debounce
        });
    }

    function populateAndShowModal(issue) {
        const isOpen = (issue.status || '').toLowerCase() === 'open';
        
        modalTitle.textContent = issue.title || 'Unknown Issue';
        
        modalStatus.textContent = issue.status || 'Unknown';
        modalStatus.className = `px-2 py-0.5 rounded-full text-xs font-medium ${isOpen ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`;
        
        modalAuthor.textContent = issue.author ? (issue.author.name || issue.author) : 'Unknown';
        modalDate.textContent = issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : '';
        modalDescription.textContent = issue.description || 'No description provided.';
        
        if (issue.priority) {
            let pBg = 'bg-gray-100', pText = 'text-gray-600';
            if (issue.priority.toLowerCase() === 'high') { pBg = 'bg-red-100'; pText = 'text-red-700'; }
            else if (issue.priority.toLowerCase() === 'medium') { pBg = 'bg-orange-100'; pText = 'text-orange-700'; }
            else if (issue.priority.toLowerCase() === 'low') { pBg = 'bg-green-100'; pText = 'text-green-700'; }
            modalPriority.textContent = issue.priority.toUpperCase();
            modalPriority.className = `px-2 py-1 rounded text-xs font-bold inline-block ${pBg} ${pText}`;
        } else {
            modalPriority.textContent = 'None';
            modalPriority.className = 'px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold inline-block';
        }

        if (issue.assignee || issue.assignees) {
            const assignees = issue.assignees || [issue.assignee];
            modalAssignees.textContent = assignees.map(a => a.name || a).join(', ');
        } else {
            modalAssignees.textContent = '-';
        }

        modalLabels.innerHTML = '';
        if (issue.labels && issue.labels.length > 0) {
            issue.labels.forEach(label => {
                const labelName = typeof label === 'string' ? label : label.name;
                const span = document.createElement('span');
                
                let bg = 'bg-gray-100', text = 'text-gray-700';
                if (labelName.toLowerCase().includes('bug')) { bg = 'bg-red-50'; text = 'text-red-600 border border-red-200'; }
                else if (labelName.toLowerCase().includes('help')) { bg = 'bg-orange-50'; text = 'text-orange-600 border border-orange-200'; }
                else if (labelName.toLowerCase().includes('enhancement')) { bg = 'bg-green-50'; text = 'text-green-600 border border-green-200'; }
                
                span.className = `px-2 py-0.5 rounded text-[10px] font-bold uppercase ${bg} ${text}`;
                span.textContent = labelName;
                modalLabels.appendChild(span);
            });
        }

        modal.classList.remove('hidden');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

});
