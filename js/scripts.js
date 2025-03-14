// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
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
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Product Slider Functionality
const productSlides = document.querySelectorAll('.product-slide');
const productDots = document.querySelectorAll('.slider-dot');

if (productDots.length > 0) {
    productDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            
            // Remove active class from all slides and dots
            productSlides.forEach(slide => slide.classList.remove('active'));
            productDots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            productSlides[slideIndex].classList.add('active');
            this.classList.add('active');
            productSlides[slideIndex].style.display = 'grid';
        });
    });
    
    // Auto-rotate product slides every 5 seconds
    let productCurrentSlide = 0;
    setInterval(() => {
        productCurrentSlide = (productCurrentSlide + 1) % productSlides.length;
        
        // Remove active class from all slides and dots
        productSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        productDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        productSlides[productCurrentSlide].classList.add('active');
        productDots[productCurrentSlide].classList.add('active');
        productSlides[productCurrentSlide].style.display = 'grid';
    }, 5000);
    
    // Initialize the first slide
    productSlides[0].style.display = 'grid';
}
    
    // Testimonial Slider Functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialDots.length > 0) {
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                
                // Remove active class from all slides and dots
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                testimonialDots.forEach(dot => dot.classList.remove('active'));
                
                // Add active class to current slide and dot
                testimonialSlides[slideIndex].classList.add('active');
                this.classList.add('active');
            });
        });
        
        // Auto-rotate testimonial slides every 4 seconds
        let testimonialCurrentSlide = 0;
        setInterval(() => {
            testimonialCurrentSlide = (testimonialCurrentSlide + 1) % testimonialSlides.length;
            
            // Remove active class from all slides and dots
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            testimonialSlides[testimonialCurrentSlide].classList.add('active');
            testimonialDots[testimonialCurrentSlide].classList.add('active');
        }, 4000);
    }
    
    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formElements = this.elements;
            const formData = {
                name: formElements[0].value,
                email: formElements[1].value,
                phone: formElements[2].value,
                service: formElements[3].value,
                message: formElements[4].value
            };
            
            // Form validation
            let isValid = true;
            let errorMessage = '';
            
            if (!formData.name.trim()) {
                isValid = false;
                errorMessage = 'Please enter your name';
            } else if (!isValidEmail(formData.email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else if (formData.phone && !isValidPhone(formData.phone)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            } else if (!formData.message.trim()) {
                isValid = false;
                errorMessage = 'Please enter your message';
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // Show success message (in a real implementation, this would be an AJAX request)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
        return phoneRegex.test(phone);
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
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
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .process-step, .about-content, .product-slide, .testimonial-slide');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});
