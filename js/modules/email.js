// Initialize EmailJS
(function () {
    emailjs.init("LTWmHe-fQx5R8YbZj"); // Replace with your EmailJS public key
})();

// Chat functionality
document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.getElementById('chatBody');

    let conversationState = {
        step: 'greeting',
        userData: {
            name: '',
            email: '',
            interest: '',
            message: ''
        }
    };

    // Typing animation for bot messages
    function addBotMessage(message, withTyping = true) {
        if (withTyping) {
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-message bot typing-indicator';
            typingIndicator.innerHTML = `
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            `;
            chatBody.appendChild(typingIndicator);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simulate typing delay (shorter for better UX)
            setTimeout(() => {
                chatBody.removeChild(typingIndicator);
                displayBotMessage(message);
            }, 1000);
        } else {
            displayBotMessage(message);
        }
    }

    function displayBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';

        // Format links in message
        const formattedMessage = message.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" class="chat-link">$1</a>'
        );

        messageDiv.innerHTML = `
            <div class="bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${formattedMessage}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Play notification sound
        playNotificationSound();
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Play a subtle notification sound
    function playNotificationSound() {
        const audio = new Audio('https://cdn.jsdelivr.net/gh/fgilio/mini-notification-sound/notification.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio playback error:', e));
    }

    function validateEmail(email) {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }

    async function submitChatForm(userData) {
        try {
            addBotMessage("Sending your message...", false);

            // Send email to user
            await emailjs.send('service_tlj13aq', 'template_2y4rsbp', {
                email: userData.email,
                name: userData.name
            });

            // Send email to admin
            await emailjs.send('service_tlj13aq', 'template_3u6s00q', {
                admin_email: "chemtechcoating@gmail.com",
                user_name: userData.name,
                user_email: userData.email,
                user_message: userData.message,
                user_service: userData.interest
            });

            addBotMessage(`
                <strong>Thank you, ${userData.name}!</strong> Your message has been sent successfully. 
                Our team will contact you shortly about your interest in ${userData.interest}.
                <div class="chat-buttons">
                    <button class="chat-option-btn" data-value="new-question">Ask another question</button>
                    <button class="chat-option-btn" data-value="end-chat">End chat</button>
                </div>
            `);

            // Reset conversation but keep name and email
            conversationState.step = 'post-submission';

        } catch (error) {
            console.error('Error:', error);
            addBotMessage(`
                Sorry, there was an error sending your message. Please try again or contact us directly at 
                <a href="mailto:chemtechcoating@gmail.com">chemtechcoating@gmail.com</a>.
                <div class="chat-buttons">
                    <button class="chat-option-btn" data-value="retry">Try again</button>
                    <button class="chat-option-btn" data-value="end-chat">End chat</button>
                </div>
            `);
        }
    }

    function showServiceOptions() {
        return `
            What service are you interested in?
            <div class="chat-buttons">
                <button class="chat-option-btn" data-value="Industrial Flooring">Industrial Flooring</button>
                <button class="chat-option-btn" data-value="Commercial Spaces">Commercial Spaces</button>
                <button class="chat-option-btn" data-value="Residential Solutions">Residential Solutions</button>
                <button class="chat-option-btn" data-value="Waterproofing">Waterproofing</button>
                <button class="chat-option-btn" data-value="Other">Other</button>
            </div>
        `;
    }

    function handleUserInput(message) {
        addUserMessage(message);

        switch (conversationState.step) {
            case 'greeting':
                conversationState.userData.name = message;
                conversationState.step = 'email';
                addBotMessage(`
                    Nice to meet you, <strong>${message}</strong>! 
                    Please share your email address so we can stay in touch.
                `);
                break;

            case 'email':
                if (validateEmail(message)) {
                    conversationState.userData.email = message;
                    conversationState.step = 'interest';
                    addBotMessage(showServiceOptions());
                } else {
                    addBotMessage("That doesn't look like a valid email address. Please enter a valid email so we can contact you.");
                }
                break;

            case 'interest':
                conversationState.userData.interest = message;
                conversationState.step = 'message';
                addBotMessage(`
                    Great choice! Please tell me more about your requirements or any questions you have about ${message}.
                `);
                break;

            case 'message':
                conversationState.userData.message = message;
                submitChatForm(conversationState.userData);
                break;

            case 'post-submission':
                if (message.toLowerCase().includes('question') || message.toLowerCase().includes('another') || message === 'new-question') {
                    conversationState.step = 'interest';
                    addBotMessage(showServiceOptions());
                } else if (message.toLowerCase().includes('end') || message.toLowerCase().includes('bye') || message === 'end-chat') {
                    addBotMessage(`
                        Thank you for chatting with us today, ${conversationState.userData.name}! Feel free to reach out anytime. Have a great day!
                    `);
                    setTimeout(() => {
                        chatPopup.classList.remove('show');
                    }, 3000);
                } else if (message === 'retry') {
                    conversationState.step = 'message';
                    addBotMessage("Please tell me again about your requirements or questions.");
                } else {
                    // Handle any other message during post-submission
                    addBotMessage(`
                        Is there anything else I can help you with, ${conversationState.userData.name}?
                        <div class="chat-buttons">
                            <button class="chat-option-btn" data-value="new-question">Ask another question</button>
                            <button class="chat-option-btn" data-value="end-chat">End chat</button>
                        </div>
                    `);
                }
                break;
        }
    }

    // Event Listeners
    chatButton.addEventListener('click', () => {
        chatPopup.classList.toggle('show');
        if (chatBody.children.length === 0) {
            addBotMessage(`
                <strong>👋 Welcome to Chemtech Coating Solutions!</strong> 
                I'm here to help you with your epoxy flooring needs. What's your name?
            `);
        }
    });

    closeChat.addEventListener('click', () => {
        chatPopup.classList.remove('show');
    });

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            handleUserInput(message);
            chatInput.value = '';
        }
    }

    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Event delegation for option buttons
    chatBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-option-btn')) {
            const value = e.target.getAttribute('data-value');
            handleUserInput(value);
        }
    });

    // Add Cookie consent functionality
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show the cookie consent banner
        setTimeout(() => {
            cookieConsent.style.display = 'block';
        }, 2000); // Show after 2 seconds
    }

    // Handle accept button click
    acceptCookies.addEventListener('click', function () {
        // Save acceptance in localStorage
        localStorage.setItem('cookiesAccepted', 'true');

        // Hide the cookie banner
        cookieConsent.style.display = 'none';
    });
});