// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality
    const dropdownButtons = document.querySelectorAll('[data-dropdown]');
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdownId = button.getAttribute('data-dropdown');
            const dropdown = document.getElementById(`${dropdownId}-dropdown`);
            
            // Close all other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Change icon based on menu state
            if (mobileMenu.classList.contains('active')) {
                mobileMenuToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
            } else {
                mobileMenuToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        });
    }

    // Mobile dropdown functionality
    const mobileDropdownButtons = document.querySelectorAll('[data-mobile-dropdown]');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    mobileDropdownButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdownId = button.getAttribute('data-mobile-dropdown');
            const dropdown = document.getElementById(`${dropdownId}-dropdown`);
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        // For desktop dropdowns
        if (!event.target.closest('[data-dropdown]')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        let currentSlide = 0;
        let slideInterval;

        // Initialize carousel
        function startCarousel() {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        }

        // Show a specific slide
        function showSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }

        // Next slide function
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }

        // Previous slide function
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            showSlide(prevIndex);
        }

        // Event listeners for carousel controls
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                startCarousel();
            });

            nextButton.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                startCarousel();
            });
        }

        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startCarousel();
            });
        });

        // Start the carousel
        startCarousel();
    }

    // Job search functionality
    const jobSearchForm = document.getElementById('job-search-form');
    if (jobSearchForm) {
        jobSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const jobQuery = document.getElementById('job-search-input').value;
            const locationQuery = document.getElementById('location-search-input').value;
            
            // Redirect to jobs page with search parameters
            window.location.href = `jobs.html?query=${encodeURIComponent(jobQuery)}&location=${encodeURIComponent(locationQuery)}`;
        });
    }

    // Jobs page functionality
    const jobsContainer = document.getElementById('jobs-container');
    if (jobsContainer) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query') || '';
        const location = urlParams.get('location') || '';
        const category = urlParams.get('category') || '';
        const type = urlParams.get('type') || '';
        
        // Set filter form values based on URL parameters
        const jobsSearchInput = document.getElementById('jobs-search-input');
        const jobsLocationInput = document.getElementById('jobs-location-input');
        const jobsCategorySelect = document.getElementById('jobs-category-select');
        const jobsTypeSelect = document.getElementById('jobs-type-select');
        
        if (jobsSearchInput) jobsSearchInput.value = query;
        if (jobsLocationInput) jobsLocationInput.value = location;
        if (jobsCategorySelect && category) jobsCategorySelect.value = category;
        if (jobsTypeSelect && type) jobsTypeSelect.value = type;
        
        // Load jobs from JSON file
        loadJobs(query, location, category, type);
        
        // Filter form submission
        const jobsFilterForm = document.getElementById('jobs-filter-form');
        if (jobsFilterForm) {
            jobsFilterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const newQuery = jobsSearchInput.value;
                const newLocation = jobsLocationInput.value;
                const newCategory = jobsCategorySelect.value;
                const newType = jobsTypeSelect.value;
                
                // Update URL with new parameters
                const newUrl = `jobs.html?query=${encodeURIComponent(newQuery)}&location=${encodeURIComponent(newLocation)}&category=${encodeURIComponent(newCategory)}&type=${encodeURIComponent(newType)}`;
                window.history.pushState({}, '', newUrl);
                
                // Load jobs with new filters
                loadJobs(newQuery, newLocation, newCategory, newType);
            });
        }
        
        // Reset filters button
        const resetFiltersBtn = document.getElementById('reset-filters-btn');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                window.location.href = 'jobs.html';
            });
        }
        
        // Sort jobs
        const jobsSortSelect = document.getElementById('jobs-sort-select');
        if (jobsSortSelect) {
            jobsSortSelect.addEventListener('change', function() {
                const sortValue = this.value;
                const jobCards = document.querySelectorAll('.job-card');
                const jobsArray = Array.from(jobCards);
                
                jobsArray.sort((a, b) => {
                    if (sortValue === 'newest') {
                        return new Date(b.dataset.date) - new Date(a.dataset.date);
                    } else if (sortValue === 'oldest') {
                        return new Date(a.dataset.date) - new Date(b.dataset.date);
                    } else if (sortValue === 'title-asc') {
                        return a.dataset.title.localeCompare(b.dataset.title);
                    } else if (sortValue === 'title-desc') {
                        return b.dataset.title.localeCompare(a.dataset.title);
                    }
                    return 0;
                });
                
                // Clear container and append sorted jobs
                jobsContainer.innerHTML = '';
                jobsArray.forEach(job => {
                    jobsContainer.appendChild(job);
                });
            });
        }
    }

    // Job details modal
    const jobDetailsModal = document.getElementById('job-details-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            jobDetailsModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === jobDetailsModal) {
            jobDetailsModal.style.display = 'none';
        }
    });
});

// Function to load jobs from JSON file
function loadJobs(query = '', location = '', category = '', type = '') {
    const jobsContainer = document.getElementById('jobs-container');
    const jobsCount = document.getElementById('jobs-count');
    const noJobsMessage = document.getElementById('no-jobs-message');
    
    if (!jobsContainer) return;
    
    // Show loading spinner
    jobsContainer.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading jobs...</p>
        </div>
    `;
    
    // Fetch jobs from JSON file
    fetch('./jobs.json')
        .then(response => response.json())
        .then(data => {
            // Filter jobs based on search parameters
            let filteredJobs = data.jobs;
            
            if (query) {
                const queryLower = query.toLowerCase();
                filteredJobs = filteredJobs.filter(job => 
                    job.title.toLowerCase().includes(queryLower) || 
                    job.description.toLowerCase().includes(queryLower) || 
                    job.company.toLowerCase().includes(queryLower) ||
                    (job.requirements && job.requirements.some(req => req.toLowerCase().includes(queryLower)))
                );
            }
            
            if (location) {
                const locationLower = location.toLowerCase();
                filteredJobs = filteredJobs.filter(job => 
                    job.location.toLowerCase().includes(locationLower)
                );
            }
            
            if (category) {
                filteredJobs = filteredJobs.filter(job => 
                    job.category === category
                );
            }
            
            if (type) {
                filteredJobs = filteredJobs.filter(job => 
                    job.type === type || 
                    (type === 'Remote' && job.location.toLowerCase().includes('remote'))
                );
            }
            
            // Update jobs count
            if (jobsCount) {
                jobsCount.textContent = `Showing ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''}`;
            }
            
            // Clear container
            jobsContainer.innerHTML = '';
            
            // Show no results message if no jobs found
            if (filteredJobs.length === 0) {
                if (noJobsMessage) {
                    noJobsMessage.style.display = 'block';
                }
                return;
            }
            
            // Hide no results message
            if (noJobsMessage) {
                noJobsMessage.style.display = 'none';
            }
            
            // Sort jobs by date (newest first)
            filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
            
            // Render jobs
            filteredJobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.dataset.id = job.id;
                jobCard.dataset.title = job.title;
                jobCard.dataset.date = job.postedDate;
                
                // Format date
                const postedDate = new Date(job.postedDate);
                const formattedDate = postedDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
                
                // Get first 3 requirements
                const requirements = job.requirements ? job.requirements.slice(0, 3) : [];
                
                jobCard.innerHTML = `
                    <div class="job-company">${job.company}</div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-details">
                        <div class="job-detail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${job.location}</span>
                        </div>
                        <div class="job-detail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="roun  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            <span>${job.type}</span>
                        </div>
                        <div class="job-detail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <span>${job.salary}</span>
                        </div>
                    </div>
                    <p class="job-description">${job.description}</p>
                    <div class="job-tags">
                        ${requirements.map(req => `<span class="job-tag">${req}</span>`).join('')}
                    </div>
                    <div class="job-footer">
                        <span class="job-date">Posted on ${formattedDate}</span>
                        <a href="#" class="job-apply" data-id="${job.id}">View Details</a>
                    </div>
                `;
                
                jobsContainer.appendChild(jobCard);
                
                // Add click event to job card
                jobCard.addEventListener('click', function() {
                    showJobDetails(job);
                });
            });
            
            // Add click event to job apply links
            const jobApplyLinks = document.querySelectorAll('.job-apply');
            jobApplyLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const jobId = this.getAttribute('data-id');
                    const job = filteredJobs.find(j => j.id.toString() === jobId);
                    if (job) {
                        showJobDetails(job);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading jobs:', error);
            jobsContainer.innerHTML = `
                <div class="error-message">
                    <p>Error loading jobs. Please try again later.</p>
                </div>
            `;
        });
}

// Function to show job details in modal
function showJobDetails(job) {
    const modal = document.getElementById('job-details-modal');
    const modalTitle = document.getElementById('modal-job-title');
    const modalDetails = document.getElementById('modal-job-details');
    const applyBtn = document.getElementById('apply-job-btn');
    
    if (!modal || !modalTitle || !modalDetails) return;
    
    // Format date
    const postedDate = new Date(job.postedDate);
    const formattedDate = postedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Set modal title
    modalTitle.textContent = job.title;
    
    // Set modal details
    modalDetails.innerHTML = `
        <div class="modal-company">
            <h3>${job.company}</h3>
            <div class="modal-job-details">
                <div class="modal-job-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${job.location}</span>
                </div>
                <div class="modal-job-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>${job.type}</span>
                </div>
                <div class="modal-job-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>${job.salary}</span>
                </div>
                <div class="modal-job-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Posted on ${formattedDate}</span>
                </div>
            </div>
        </div>
        <div class="modal-section">
            <h4>Job Description</h4>
            <p>${job.description}</p>
        </div>
        <div class="modal-section">
            <h4>Requirements</h4>
            <ul class="modal-requirements">
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Set apply button action
    if (applyBtn) {
        applyBtn.onclick = function() {
            window.location.href = `apply.html?id=${job.id}`;
        };
    }
    
    // Show modal
    modal.style.display = 'block';
}


// Auth Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeLoginModal = document.getElementById('close-login-modal');
    const closeSignupModal = document.getElementById('close-signup-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Get login and signup buttons
    const loginButtons = document.querySelectorAll('.login-btn');
    const signupButtons = document.querySelectorAll('.signup-btn');
    
    // Open login modal
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(loginModal);
        });
    });
    
    // Open signup modal
    signupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(signupModal);
        });
    });
    
    // Close login modal
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', function() {
            closeModal(loginModal);
        });
    }
    
    // Close signup modal
    if (closeSignupModal) {
        closeSignupModal.addEventListener('click', function() {
            closeModal(signupModal);
        });
    }
    
    // Switch from login to signup
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            setTimeout(() => {
                openModal(signupModal);
            }, 300);
        });
    }
    
    // Switch from signup to login
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            setTimeout(() => {
                openModal(loginModal);
            }, 300);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === signupModal) {
            closeModal(signupModal);
        }
    });
    
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const eyeIcon = this.querySelector('.eye-icon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                passwordInput.type = 'password';
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    });
    
    // Password strength meter
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    // Form validation
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Validate form
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login (replace with actual login logic)
            console.log('Login submitted:', { email, password, rememberMe });
            
            // Show success message
            alert('Login successful!');
            
            // Close modal
            closeModal(loginModal);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('signup-first-name').value;
            const lastName = document.getElementById('signup-last-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            const termsAgreed = document.getElementById('terms-agree').checked;
            
            // Validate form
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!termsAgreed) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                return;
            }
            
            // Simulate signup (replace with actual signup logic)
            console.log('Signup submitted:', { firstName, lastName, email, password, role });
            
            // Show success message
            alert('Account created successfully!');
            
            // Close modal
            closeModal(signupModal);
        });
    }
});

// Function to open modal
function openModal(modal) {
    if (!modal) return;
    
    // Add active class to show modal
    modal.classList.add('active');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Add active class to modal content for animation
    setTimeout(() => {
        const modalContent = modal.querySelector('.auth-modal-content');
        if (modalContent) {
            modalContent.classList.add('active');
        }
    }, 10);
}

// Function to close modal
function closeModal(modal) {
    if (!modal) return;
    
    // Remove active class from modal content for animation
    const modalContent = modal.querySelector('.auth-modal-content');
    if (modalContent) {
        modalContent.classList.remove('active');
    }
    
    // Remove active class from modal after animation
    setTimeout(() => {
        modal.classList.remove('active');
        
        // Allow body scrolling
        document.body.style.overflow = '';
    }, 300);
}

// Function to update password strength meter
function updatePasswordStrength(password) {
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthSegments.length || !strengthText) return;
    
    // Reset strength meter
    strengthSegments.forEach(segment => {
        segment.classList.remove('active');
        segment.style.backgroundColor = '';
    });
    
    // Calculate password strength
    let strength = 0;
    
    // Length check
    if (password.length >= 8) {
        strength += 1;
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 1;
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 1;
    }
    
    // Number check
    if (/[0-9]/.test(password)) {
        strength += 1;
    }
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += 1;
    }
    
    // Update strength meter
    let strengthColor = '';
    let strengthLabel = '';
    
    if (strength === 0) {
        strengthLabel = 'Password strength';
    } else if (strength <= 2) {
        strengthColor = '#ef4444'; // Red
        strengthLabel = 'Weak';
    } else if (strength <= 3) {
        strengthColor = '#f59e0b'; // Amber
        strengthLabel = 'Medium';
    } else if (strength <= 4) {
        strengthColor = '#10b981'; // Green
        strengthLabel = 'Strong';
    } else {
        strengthColor = '#2563eb'; // Blue
        strengthLabel = 'Very Strong';
    }
    
    // Update segments
    for (let i = 0; i < strength; i++) {
        if (i < strengthSegments.length) {
            strengthSegments[i].classList.add('active');
            strengthSegments[i].style.backgroundColor = strengthColor;
        }
    }
    
    // Update text
    strengthText.textContent = strengthLabel;
    strengthText.style.color = strengthColor;
}