import { smoothScroll } from './utils.js';
import { TESTIMONIAL_SLIDER_INTERVAL, STICKY_HEADER_THRESHOLD, SCROLL_POSITION_OFFSET } from './constants.js';
import { initContactForm } from './form-handler.js';
import { initTestimonialSlider, initProductSlider } from './sliders.js';
import { 
    initColorSelector, 
    initCostCalculator, 
    initBeforeAfterSlider, 
    initFaqAccordion,
    initPortfolioFilter,
    initBackToTop,
    initAnimationOnScroll,
    initProductCarousel
} from './features.js';

// Initialize EmailJS only if not already initialized
if (window.emailjs && !window.emailjs.isInitialized()) {
    emailjs.init("LTWmHe-fQx5R8YbZj");
}

// Main initialization function
function initializeApp() {
    console.log('Initializing Chemtech application...');
    
    // Initialize components
    initMobileNavigation();
    initScrollHandlers();
    initTestimonialSlider();
    initProductSlider();
    initContactForm();
    initProductGallery();
    
    // Initialize features
    initColorSelector();
    initCostCalculator();
    initBeforeAfterSlider();
    initFaqAccordion();
    initPortfolioFilter();
    initBackToTop();
    initAnimationOnScroll();
    initProductCarousel();
    
    // UI enhancements
    initStickyHeader();
    initScrollAnimation();
    initCookieConsent();
    enhanceScrollAnimations();
    initParallaxEffect();
    initChat();
    
    // Utility functions
    handleImageErrors();
    
    // Product functionality
    initProductCategories();
    
    // Services Section Interactions
    initializeServices();
    
    console.log('Application initialization complete');
}

// Document ready function - entry point
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization slightly to ensure DOM is fully ready
    setTimeout(initializeApp, 100);
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
        
    if (!menuBtn || !navLinks) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    
    // Toggle menu when menu button is clicked
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent document click from firing
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        console.log('Menu button clicked, navLinks active:', navLinks.classList.contains('active')); // Debug
    });

    // Close mobile menu when clicking on a nav link
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
            
            // Use smooth scroll for navigation links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'));
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !menuBtn.contains(e.target) && 
            !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Clicked outside, closing menu'); // Debug
        }
    });

    // Prevent clicks inside the menu from closing it
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Scroll event handlers
function initScrollHandlers() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        // Sticky header
        if (window.scrollY > STICKY_HEADER_THRESHOLD) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Highlight active nav item based on scroll position
        const scrollPosition = window.scrollY + SCROLL_POSITION_OFFSET;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
}

// Product gallery functionality
function initProductGallery() {
    const productImages = document.querySelectorAll('.product-gallery-item');
    const productModal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    if (!productImages.length || !productModal) return;
    
    productImages.forEach(image => {
        image.addEventListener('click', function() {
            modalImage.src = this.getAttribute('data-full-img');
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Scroll Animation
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        observer.observe(element);
    });
}

function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    const customizeCookies = document.getElementById('customizeCookies');
    
    if (!cookieConsent) return;
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieChoice')) {
        // Show the cookie consent banner after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Handle accept button click
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookieChoice', 'accepted');
            cookieConsent.classList.remove('show');
            console.log('Cookies accepted by user');
        });
    }
    
    // Handle decline button click
    if (declineCookies) {
        declineCookies.addEventListener('click', function() {
            localStorage.setItem('cookieChoice', 'declined');
            cookieConsent.classList.remove('show');
            console.log('Cookies declined by user');
        });
    }
    
    // Handle customize button click
    if (customizeCookies) {
        customizeCookies.addEventListener('click', function() {
            // Implement customize cookies functionality
            console.log('User wants to customize cookies');
            // For now, just accept all
            localStorage.setItem('cookieChoice', 'customized');
            cookieConsent.classList.remove('show');
        });
    }
}

// Enhanced scroll animations
function enhanceScrollAnimations() {
    // Elements that will animate when scrolled into view
    const animatedSections = document.querySelectorAll('.services-grid, .process-steps, .testimonial-slider, .portfolio-grid');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a staggered animation to child elements
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, 150 * index);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

// Add parallax effect to hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (!heroSection || !heroImage) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < heroSection.offsetHeight) {
            // Move the image slightly slower than the scroll speed
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    });
}

// Initialize chat functionality
function initChat() {
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const endChatHeaderButton = document.getElementById('endChat'); // Renamed
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.querySelector('.chat-body');
    const chatContactForm = document.getElementById('chatContactForm');
    const inChatContactForm = document.getElementById('inChatContactForm');

    // Basic check for essential elements
    if (!chatButton || !chatPopup || !chatBody || !chatInput) {
        console.warn('Essential chat elements not found, chat functionality disabled.');
        return;
    }

    const responses = {
        default: "Thank you for your message. Our team will get back to you shortly. If you have urgent inquiries, please call us at +91 9834094310.",
        greeting: [
            "Hello! How can I assist you with your epoxy coating needs?",
            "Hi there! Welcome to Chemtech Coating Solutions. How may I help you?",
            "Greetings! What can I help you with today?"
        ],
        pricing: "Our epoxy flooring prices start from ₹85 per sq. ft. for basic applications and can go up to ₹150 per sq. ft. for industrial heavy-duty flooring. For an accurate quote, please provide your area size and specific requirements.",
        durability: "With proper installation and maintenance, our epoxy flooring can last 10-20 years in residential settings and 5-10 years in high-traffic commercial or industrial environments.",
        benefits: "Epoxy flooring offers superior durability, chemical resistance, easy maintenance, seamless application, customizable aesthetics, and cost-effectiveness over time. It's also moisture-resistant and can be applied over existing concrete floors.",
        installation: "The installation process typically takes 3-7 days depending on the area size, condition of the existing floor, and the type of epoxy system being installed. This includes surface preparation, application of multiple coats, and curing time.",
        maintenance: "Epoxy floors are very easy to maintain. Regular sweeping and occasional mopping with a pH-neutral cleaner is usually sufficient. Avoid harsh chemicals, abrasive cleaners, and steel wool.",
        contact: "You can reach us at +91 9834094310 or email us at chemtechcoating@gmail.com. Our office is located at Plot no. 182/2, near MSEB office, karjat - murbad highway, ware villege, Maharashtra.",
        quote: "To provide you with an accurate quote, we need some information. Please fill out our contact form or provide details about your project area size, intended use, and current floor condition."
    };
    const keywords = {
        greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
        pricing: ['price', 'cost', 'rate', 'charges', 'fee', 'how much', 'pricing'],
        durability: ['last', 'duration', 'lifespan', 'how long', 'durable', 'durability'],
        benefits: ['benefits', 'advantage', 'why should', 'better than', 'pros', 'good for'],
        installation: ['install', 'process', 'how to apply', 'application', 'procedure', 'how long take'],
        maintenance: ['maintain', 'clean', 'care', 'maintenance', 'cleaning'],
        contact: ['contact', 'reach', 'phone', 'call', 'email', 'location', 'address', 'office'],
        quote: ['quote', 'estimate', 'quotation', 'consultation', 'survey', 'assessment']
    };

    // --- Helper Functions ---
    function resetChatConversation() {
        const allMessages = chatBody.querySelectorAll('.chat-message');
        // Start from 2 to keep the initial two bot messages
        for (let i = 2; i < allMessages.length; i++) {
            if (allMessages[i].parentNode === chatBody) {
                chatBody.removeChild(allMessages[i]);
            }
        }
        if (chatContactForm) chatContactForm.style.display = 'none';
        chatBody.scrollTop = 0;
        addBotMessage("The conversation has been reset. How can I help you today?");
    }

    function confirmAndResetChat() {
        if (confirm("Are you sure you want to end this chat? The conversation will be reset.")) {
            resetChatConversation();
        }
    }

    function addUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        userMessage.innerHTML = `
            <div class="user-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">Just now</span>
            </div>`;
        chatBody.appendChild(userMessage);
        if(chatInput) chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addBotMessage(message, addDefaultEndButton = true) {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-message', 'bot', 'typing-indicator');
        typingIndicator.innerHTML = `
            <div class="bot-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content"><div class="typing-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>`;
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            if (typingIndicator.parentNode === chatBody) {
                chatBody.removeChild(typingIndicator);
            }

            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('chat-message', 'bot');

            let messageContent = message;
            let buttonsContainer = null;

            // Check if message already contains a button container
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = message;
            const existingButtons = tempDiv.querySelector('.chat-buttons');

            if (existingButtons) {
                // If buttons exist, extract message part and the button container
                buttonsContainer = existingButtons;
                messageContent = '';
                // Reconstruct message content from nodes before the button container
                let currentNode = tempDiv.firstChild;
                while(currentNode && currentNode !== existingButtons.parentElement) {
                    if(currentNode.outerHTML) messageContent += currentNode.outerHTML;
                    else if (currentNode.textContent) messageContent += currentNode.textContent;
                    currentNode = currentNode.nextSibling;
                }
                 // Sometimes the <p> tag might wrap the button container, adjust if needed
                if (!messageContent.trim() && tempDiv.querySelector('p')) {
                     messageContent = tempDiv.querySelector('p').innerHTML.split('<div class="chat-buttons">')[0];
                }
            } else {
                 // If no buttons provided in the message string, create a new container
                 buttonsContainer = document.createElement('div');
                 buttonsContainer.className = 'chat-buttons';
            }

             // Always add the "End Chat" button if requested
             if (addDefaultEndButton) {
                 const endChatButton = document.createElement('button');
                 endChatButton.className = 'chat-option-btn end-chat-option';
                 endChatButton.dataset.action = 'end-chat';
                 endChatButton.textContent = 'End Chat';
                 buttonsContainer.appendChild(endChatButton);
             }

            // Construct the final message structure
            botMessageDiv.innerHTML = `
                <div class="bot-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <p>${messageContent}</p>
                    <span class="message-time">Just now</span>
                </div>`;

             // Append the buttons container if it has buttons
             if (buttonsContainer && buttonsContainer.hasChildNodes()) {
                 botMessageDiv.querySelector('.message-content').insertBefore(buttonsContainer, botMessageDiv.querySelector('.message-time'));
             }

            chatBody.appendChild(botMessageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1200);
    }

     function processUserMessage(message) {
        const lowerCaseMessage = message.toLowerCase();
        let responseType = 'default';

        for (let type in keywords) {
            if (keywords[type].some(keyword => lowerCaseMessage.includes(keyword))) {
                responseType = type;
                break;
            }
        }

        if (lowerCaseMessage === 'end chat') { confirmAndResetChat(); return; }
        if (lowerCaseMessage === 'contact form' || (lowerCaseMessage.includes('contact') && (lowerCaseMessage.includes('form') || lowerCaseMessage.includes('us')))) { showContactForm(); return; }
        if (lowerCaseMessage.includes('call sales team') || lowerCaseMessage.includes('call now')) {
            addBotMessage('You can call our sales team at <a href="tel:+919834094310" class="chat-link">+91 9834094310</a>');
            return;
         }

        let response = (responseType === 'greeting')
            ? responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
            : responses[responseType];

        let buttonsHTML = '';
        if (responseType === 'pricing') {
            buttonsHTML = `<div class="chat-buttons"><button class="chat-option-btn" data-message="Request a quote">Request Quote</button><button class="chat-option-btn" data-message="Tell me about benefits">Benefits</button></div>`;
        } else if (responseType === 'quote') {
            buttonsHTML = `<div class="chat-buttons"><button class="chat-option-btn" data-message="Contact form">Fill Out Form</button><button class="chat-option-btn" data-message="Call sales team">Call Now</button></div>`;
        } else if (responseType === 'contact') {
             buttonsHTML = `<div class="chat-buttons"><button class="chat-option-btn" data-message="Contact form">Contact Form</button><button class="chat-option-btn" data-message="Call sales team">Call Now</button></div>`;
        } else if (responseType === 'default' && !lowerCaseMessage.includes('call')) {
             buttonsHTML = `<div class="chat-buttons"><button class="chat-option-btn" data-message="Tell me about pricing">Pricing</button><button class="chat-option-btn" data-message="How durable is epoxy?">Durability</button><button class="chat-option-btn" data-message="Contact form">Contact Us</button></div>`;
        }

        addBotMessage(response + buttonsHTML);
    }

    function showContactForm() {
        if (chatContactForm) {
             addBotMessage("Please fill out this quick form and we'll get back to you soon:", false); // Don't add end button here
             setTimeout(() => {
                 chatContactForm.style.display = 'block';
                 chatBody.scrollTop = chatBody.scrollHeight;
                 const firstInput = chatContactForm.querySelector('input, select, textarea');
                 if(firstInput) try { firstInput.focus(); } catch(e){ console.warn("Could not focus form input", e); }
             }, 150);
        }
    }

    function handleInChatFormSubmit(e) {
        e.preventDefault();
        if (!inChatContactForm) return;

        const formData = new FormData(inChatContactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || 'N/A';
        const service = formData.get('service') || 'N/A';
        const message = formData.get('message');

        if (chatContactForm) chatContactForm.style.display = 'none';
        addBotMessage(`Thank you, ${name}! We've received your inquiry about ${service} services. Our team will contact you at ${email} shortly.`);

        // EmailJS integration (optional chaining for safety)
        window.emailjs?.send('service_tlj13aq', 'template_3u6s00q', { admin_email: "chemtechcoating@gmail.com", user_name: name, user_email: email, user_phone: phone, user_message: message, user_service: service })
            .then(() => console.log('Admin email sent.'))
            .catch(err => console.error('Admin email failed:', err));
        window.emailjs?.send('service_tlj13aq', 'template_2y4rsbp', { email: email, name: name })
            .then(() => console.log('User email sent.'))
            .catch(err => console.error('User email failed:', err));

        inChatContactForm.reset();
    }

    function sendChatMessage() {
        if (!chatInput) return;
        const message = chatInput.value.trim();
        if (message === '') return;
        addUserMessage(message);
        setTimeout(() => processUserMessage(message), 500);
    }

    // --- Event Listeners ---
    if (chatButton) chatButton.addEventListener('click', () => {
        chatPopup.classList.toggle('show');
        chatButton.classList.toggle('active');
        if (chatPopup.classList.contains('show')) {
            chatBody.scrollTop = chatBody.scrollHeight;
            if(chatInput) try { chatInput.focus(); } catch(e){ console.warn("Could not focus chat input", e); }
        }
    });

    if (closeChat) closeChat.addEventListener('click', () => {
        if (chatPopup) chatPopup.classList.remove('show');
        if (chatButton) chatButton.classList.remove('active');
    });

    if (endChatHeaderButton) endChatHeaderButton.addEventListener('click', confirmAndResetChat);
    if (sendMessage) sendMessage.addEventListener('click', sendChatMessage);
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });
    if (inChatContactForm) inChatContactForm.addEventListener('submit', handleInChatFormSubmit);

    // Event Delegation for buttons inside chatBody
    chatBody.addEventListener('click', (event) => {
        const button = event.target.closest('.chat-option-btn');
        if (!button) return;

        const messageData = button.dataset.message;
        const actionData = button.dataset.action;

        if (messageData) {
            // Prevent processing if button is inside the hidden contact form template
            if(button.closest('#chatContactForm')) return;
            addUserMessage(messageData);
            setTimeout(() => processUserMessage(messageData), 500);
        } else if (actionData === 'end-chat') {
            confirmAndResetChat();
        }
    });

}

// Add this function to your scripts.js file
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.onerror = function() {
            // Replace with a placeholder image
            this.src = 'Reso/placeholder.png';
            this.alt = 'Image not available';
            console.warn(`Image failed to load: ${this.getAttribute('src') || 'unknown source'}. Replaced with placeholder.`);
        };
    });
}

// Add this new function to handle product categories
function initProductCategories() {
    const categories = document.querySelectorAll('.product-category');
    
    if (!categories.length) return;
    
    // Set first category as active by default
    categories[0].classList.add('active');
    
    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        
        if (header) {
            header.addEventListener('click', () => {
                // Toggle current category
                category.classList.toggle('active');
            });
        }
    });
}

// Services Section Interactions
function initializeServices() {
    const mainCategories = document.querySelectorAll('.service-category');
    
    if (!mainCategories.length) {
        console.warn('No service categories found');
        return;
    }

    // Ensure all categories are visible by default
    mainCategories.forEach(category => {
        const content = category.querySelector('.category-content');
        if (content) {
            content.style.maxHeight = 'none';
            content.style.display = 'block';
        }
    });
}

// Export functions for use in other modules if needed
export {
    initMobileNavigation,
    initScrollHandlers,
    initProductGallery,
    initStickyHeader,
    initScrollAnimation,
    initCookieConsent,
    enhanceScrollAnimations,
    initParallaxEffect,
    initChat,
    handleImageErrors,
    initProductCategories,
    initializeServices
};
