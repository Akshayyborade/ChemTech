import { TESTIMONIAL_SLIDER_INTERVAL } from './constants.js';

// Testimonial slider functionality
export function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (!testimonialSlides.length) return;
    
    let testimonialCurrentSlide = 0;
    let testimonialLastFrameTime = 0;

    function showTestimonialSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonialSlide(currentTime) {
        if (currentTime - testimonialLastFrameTime >= TESTIMONIAL_SLIDER_INTERVAL) {
            testimonialLastFrameTime = currentTime;
            testimonialCurrentSlide = (testimonialCurrentSlide + 1) % testimonialSlides.length;
            showTestimonialSlide(testimonialCurrentSlide);
        }
        requestAnimationFrame(nextTestimonialSlide);
    }

    // Initialize testimonial slider
    requestAnimationFrame(nextTestimonialSlide);

    // Add click handlers for testimonial dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            testimonialCurrentSlide = index;
            showTestimonialSlide(index);
        });
    });
}

// Product slider functionality
export function initProductSlider() {
    const productSlides = document.querySelectorAll('.product-slide');
    const productDots = document.querySelectorAll('.slider-dot');
    
    if (!productSlides.length || !productDots.length) return;

    productDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            productSlides.forEach(slide => slide.classList.remove('active'));
            productDots.forEach(dot => dot.classList.remove('active'));
            
            productSlides[index].classList.add('active');
            dot.classList.add('active');
        });
    });
} 