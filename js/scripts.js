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
    initAnimationOnScroll
} from './features.js';

// Initialize EmailJS
emailjs.init("LTWmHe-fQx5R8YbZj");

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileNavigation();
    initScrollHandlers();
    initTestimonialSlider();
    initProductSlider();
    initContactForm();
    initProductGallery();
    
    // Initialize new features
    initColorSelector();
    initCostCalculator();
    initBeforeAfterSlider();
    initFaqAccordion();
    initPortfolioFilter();
    initBackToTop();
    initAnimationOnScroll();
    
    // New initializations
    initStickyHeader();
    initScrollAnimation();
    
    // Add cookie consent
    initCookieConsent();
    
    // Enhanced animations
    enhanceScrollAnimations();
    
    // Parallax effect
    initParallaxEffect();
    
    // Chat functionality
    initChat();
    
    // Preloader
    initPreloader();
    
    // Handle image errors
    handleImageErrors();
    
    // Mobile Menu Functionality
    initMobileMenu();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
        
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            
            // Use smooth scroll for navigation links
            if (this.getAttribute('href').startsWith('#')) {
                smoothScroll(this.getAttribute('href'));
            }
        });
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
    
    if (!cookieConsent) return;
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });
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
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.querySelector('.chat-body');
    
    if (!chatButton || !chatPopup) return;
    
    chatButton.addEventListener('click', () => {
        chatPopup.classList.add('active');
    });
    
    closeChat.addEventListener('click', () => {
        chatPopup.classList.remove('active');
    });
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        userMessage.innerHTML = `
            <p>${message}</p>
            <span class="message-time">Just now</span>
        `;
        chatBody.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Simulate bot response after 1 second
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('chat-message', 'bot');
            botMessage.innerHTML = `
                <p>Thanks for your message! Our team will get back to you soon.</p>
                <span class="message-time">Just now</span>
            `;
            chatBody.appendChild(botMessage);
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
    
    sendMessage.addEventListener('click', sendChatMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Initialize preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Hide preloader after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
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
    };
  });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    if (!menuBtn || !navLinks) return;
    
    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && 
            !navLinks.contains(e.target) && 
            navLinks.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Hamburger menu functionality
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});
