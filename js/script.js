// Import the EmailJS library
import emailjs from '@emailjs/browser';

// Mobile Menu Toggle
document.getElementById('menuBtn').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// Hide menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Product Slider
const slides = document.querySelectorAll('.product-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    currentSlide = n;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('#contactForm input[type="text"]').value;
    const email = document.querySelector('#contactForm input[type="email"]').value;
    const phone = document.querySelector('#contactForm input[type="tel"]').value;
    const message = document.querySelector('#contactForm textarea').value;
    const templateParams = {
        to_name: 'Chemtech Coating Solution',
        from_name: name,
        to_email: 'chemtechcoating@gmail.com',
        message_html: message,
        reply_to: email,
    };
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    }, function(err) {
        console.log('FAILED...', err);
    });
});

// Scroll Animation
window.addEventListener('scroll', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
    
    serviceCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top + window.pageYOffset;
        
        if (scrollPosition > cardPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize service cards with opacity 0
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Add event listener to product images
document.querySelectorAll('.product-slide img').forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
