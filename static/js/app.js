// Global state
let isDarkMode = false;
let isSidebarCollapsed = false;
let currentModel = 'default';

// DOM elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarTitle = document.getElementById('sidebar-title');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = document.getElementById('dark-mode-icon');
const darkModeText = document.getElementById('dark-mode-text');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const newChatBtn = document.getElementById('new-chat-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderWelcomeMessage();

    // Insert logo to the left side (top of sidebar)
    const logoUrl = 'static/img/my-prompt-logo.png'; // Save your logo as PNG in static/img/
    const logoImg = document.createElement('img');
    logoImg.src = logoUrl;
    logoImg.alt = 'My.Prompt Logo';
    logoImg.style.width = '32px';
    logoImg.style.height = '32px';
    logoImg.style.margin = '8px 0 8px 8px';
    logoImg.style.display = 'block';

    if (sidebar) {
        sidebar.insertBefore(logoImg, sidebar.firstChild);
    }
});

function initializeApp() {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        toggleDarkMode();
    }
    
    // Load sidebar state
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState === 'true') {
        toggleSidebar();
    }
    

}

function setupEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);

    // Dark mode toggle
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);

    // Send message
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // New chat
    if (newChatBtn) newChatBtn.addEventListener('click', startNewChat);

    // Action buttons
    const attachBtn = document.getElementById('attach-btn');
    if (attachBtn) {
        attachBtn.addEventListener('click', function() {
            alert('File attachment feature coming soon!');
        });
    }

    const voiceBtn = document.getElementById('voice-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            alert('Voice input feature coming soon!');
        });
    }

    // Sidebar buttons
    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            const helpModal = document.getElementById('help-modal');
            if (helpModal) helpModal.style.display = 'block';
        });
    }

    const toolsBtn = document.getElementById('tools-btn');
    if (toolsBtn) {
        toolsBtn.addEventListener('click', function() {
            alert('Explore Tools coming soon!');
        });
    }

    // Modal functionality
    const helpModalClose = document.getElementById('help-modal-close');
    if (helpModalClose) {
        helpModalClose.addEventListener('click', function() {
            const helpModal = document.getElementById('help-modal');
            if (helpModal) helpModal.style.display = 'none';
        });
    }

    const helpModal = document.getElementById('help-modal');
    if (helpModal) {
        helpModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }

    // Enquiry form functionality
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Here you would typically send the data to your backend
            console.log('Enquiry submitted:', data);
            alert('Thank you for your enquiry! I will get back to you soon.');

            // Reset form
            this.reset();
        });
    }

    // Resume download functionality
    const downloadResume = document.getElementById('download-resume');
    if (downloadResume) {
        downloadResume.addEventListener('click', function() {
            // You can replace this with your actual resume file
            const resumeUrl = 'path/to/your/resume.pdf'; // Replace with actual path

            // Create a temporary link to download the file
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Vineet_Singh_Resume.pdf';
            link.target = '_blank';

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            alert('Resume download started!');
        });
    }

    // About the Creator modal logic
    const aboutBtn = document.getElementById('about-btn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            const aboutModal = document.getElementById('about-modal');
            if (aboutModal) aboutModal.style.display = 'block';
        });
    }

    const aboutModalClose = document.getElementById('about-modal-close');
    if (aboutModalClose) {
        aboutModalClose.addEventListener('click', function() {
            const aboutModal = document.getElementById('about-modal');
            if (aboutModal) aboutModal.style.display = 'none';
        });
    }

    const aboutModal = document.getElementById('about-modal');
    if (aboutModal) {
        aboutModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
}

function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    sidebar.classList.toggle('collapsed', isSidebarCollapsed);
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Update icon and text
    darkModeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
    
    // Send to backend
    fetch('/api/toggle-dark-mode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ darkMode: isDarkMode })
    }).catch(error => console.error('Error toggling dark mode:', error));
}

// Render only the welcome message
function renderWelcomeMessage() {
    chatMessages.innerHTML = '';
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message fade-in';
    welcomeMessage.innerHTML = `
        <div class="welcome-emoji">🔥</div>
        <h1 class="welcome-title">Let's break the ice</h1>
        <p class="welcome-subtitle">How can I help you today?</p>
    `;
    chatMessages.appendChild(welcomeMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add a single message to the UI
function addMessageToUI(type, content, timestamp = null, scroll = true) {
    // Remove welcome message if it exists
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} fade-in`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-timestamp';
    timeDiv.textContent = timestamp ? formatTimestamp(timestamp) : new Date().toLocaleTimeString();
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timeDiv);
    
    // Add to chat area
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom if needed
    if (scroll) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Update sendMessage to only show current messages
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Clear input
    messageInput.value = '';
    
    // Add user message to UI
    addMessageToUI('user', message, new Date().toISOString());
    
    // Show loading state
    sendBtn.classList.add('loading');
    
    try {
        // Send to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Add AI response to UI
            addMessageToUI('ai', data.response, new Date().toISOString());
        } else {
            addMessageToUI('ai', 'Sorry, there was an error processing your message.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        addMessageToUI('ai', 'Sorry, there was an error connecting to the server.');
    } finally {
        // Remove loading state
        sendBtn.classList.remove('loading');
    }
}

function startNewChat() {
    // Clear chat messages and show welcome message
    renderWelcomeMessage();
    // Reset model to default
    currentModel = 'default';
}

// Utility functions
function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleTimeString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Auto-resize textarea (if we add one later)
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Mobile sidebar toggle
if (window.innerWidth <= 768) {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}