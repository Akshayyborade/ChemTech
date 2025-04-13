// Color Selector functionality
export function initColorSelector() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const colorCollections = document.querySelectorAll('.color-collection');
    const colorItems = document.querySelectorAll('.color-item');
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewImage = document.getElementById('previewImage');
    const colorPreview = document.getElementById('colorPreview');
    
    // If color preview elements don't exist, just handle category switching
    const hasPreview = colorPreview && previewImage && previewBtns.length > 0;

    // Room template images
    const roomTemplates = {
        room: 'Reso/room-templates/default-room.jpg',
        closeup: 'Reso/room-templates/closeup-floor.jpg'
    };

    // Switch between color categories (Solid, Metallic, etc.)
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding collection
            const targetCollection = btn.getAttribute('data-category') + '-colors';
            colorCollections.forEach(collection => {
                collection.classList.remove('active');
                if (collection.id === targetCollection) {
                    collection.classList.add('active');
                }
            });
        });
    });

    // Only set up preview functionality if the elements exist
    if (hasPreview) {
        // Handle color selection
        colorItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                colorItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');

                // Update preview
                if (item.dataset.color) {
                    // For solid colors
                    colorPreview.style.backgroundColor = item.dataset.color;
                    colorPreview.style.backgroundImage = 'none';
                } else {
                    // For textured finishes (metallic, flakes, quartz)
                    const previewDiv = item.querySelector('.color-preview');
                    const computedStyle = window.getComputedStyle(previewDiv);
                    colorPreview.style.backgroundImage = computedStyle.backgroundImage;
                    colorPreview.style.backgroundColor = 'transparent';
                }
            });
        });

        // Handle preview view switching
        previewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                previewBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Update preview image
                const view = btn.getAttribute('data-view');
                if (roomTemplates[view]) {
                    previewImage.src = roomTemplates[view];
                }
            });
        });

        // Initialize with first color selected
        if (colorItems.length > 0) {
            colorItems[0].click();
        }
    } else {
        // Even without preview, we can still handle color selection for styling
        colorItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                colorItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
            });
        });
    }
}

// Import required modules
import { initCalculator } from './calculator.js';

// Export functions for the cost calculator
export function initCostCalculator() {
    // Call the calculator module's initialization function
    initCalculator();
}

// Before After Slider
export function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    const beforeImage = document.querySelector('.before-image');
    const afterImage = document.querySelector('.after-image');
    const sliderButton = document.querySelector('.slider-button');
    const sliderLine = document.querySelector('.slider-line');
    const beforeLabel = document.querySelector('.before-label');
    const afterLabel = document.querySelector('.after-label');
    
    if (!slider || !beforeImage || !afterImage || !sliderButton || !sliderLine) {
        console.warn('Before-after slider elements not found');
        return;
    }

    let isSliding = false;

    function updateSliderPosition(clientY) {
        const sliderRect = slider.getBoundingClientRect();
        const percentage = ((clientY - sliderRect.top) / sliderRect.height) * 100;
        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
        
        afterImage.style.clipPath = `polygon(0 ${clampedPercentage}%, 100% ${clampedPercentage}%, 100% 100%, 0 100%)`;
        sliderLine.style.top = `${clampedPercentage}%`;
        sliderButton.style.top = `${clampedPercentage}%`;

        // Update label visibility
        if (afterLabel) {
            // When sliding down (percentage increases), fade out "Before" label
            afterLabel.style.opacity = clampedPercentage < 40 ? '1' : 
                                      clampedPercentage < 60 ? (60 - clampedPercentage) / 20 : '0';
        }
        if (beforeLabel) {
            // When sliding up (percentage decreases), fade out "After" label
            beforeLabel.style.opacity = clampedPercentage > 60 ? '1' : 
                                     clampedPercentage > 40 ? (clampedPercentage - 40) / 20 : '0';
        }
    }

    function startSliding(e) {
        isSliding = true;
        slider.style.cursor = 'ns-resize';
        updateSliderPosition(e.type === 'touchstart' ? e.touches[0].clientY : e.clientY);
    }

    function stopSliding() {
        isSliding = false;
        slider.style.cursor = 'ns-resize';
    }

    function slide(e) {
        if (!isSliding) return;
        e.preventDefault();
        updateSliderPosition(e.type === 'touchmove' ? e.touches[0].clientY : e.clientY);
    }

    // Mouse events
    slider.addEventListener('mousedown', startSliding);
    document.addEventListener('mousemove', slide);
    document.addEventListener('mouseup', stopSliding);

    // Touch events
    slider.addEventListener('touchstart', startSliding);
    document.addEventListener('touchmove', slide, { passive: false });
    document.addEventListener('touchend', stopSliding);

    // Set initial position to middle
    setTimeout(() => {
        const sliderRect = slider.getBoundingClientRect();
        updateSliderPosition(sliderRect.top + sliderRect.height * 0.5);
    }, 100);
}

// FAQ Accordion
export function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
            
            // Toggle icon
            if (icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
            
            // Toggle answer visibility with smooth animation
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}

// Portfolio Filter
export function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterBtns.length || !portfolioItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Back to Top Button
export function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animation on Scroll
export function initAnimationOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in-left, .animate-slide-in-right');
    
    if (!animatedElements.length) return;
    
    // Add initial hidden class
    animatedElements.forEach(el => {
        el.classList.add('animation-hidden');
    });
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(el => {
            const elementHeight = el.offsetHeight;
            const elementTopPosition = el.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                el.classList.remove('animation-hidden');
            }
        });
    }
    
    // Add CSS for hidden elements
    const style = document.createElement('style');
    style.innerHTML = `
        .animation-hidden {
            opacity: 0;
            transform: translateY(20px);
        }
        .animate-slide-in-left.animation-hidden {
            transform: translateX(-30px);
        }
        .animate-slide-in-right.animation-hidden {
            transform: translateX(30px);
        }
    `;
    document.head.appendChild(style);
    
    // Check elements on load
    window.addEventListener('load', checkIfInView);
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);
}

// Product Carousel
export function initProductCarousel() {
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const categories = document.querySelectorAll('.product-category');
    
    // Check if elements exist
    if (!carousel || !categories.length) {
        console.log('Product carousel elements not found');
        return;
    }

    console.log(`Initializing product carousel with ${categories.length} categories`);
    
    // Set up carousel
    let currentSlide = 0;
    const totalSlides = categories.length;
    
    // Set initial width for proper sliding
    categories.forEach(category => {
        category.style.minWidth = '100%';
        
        // Initialize toggle icons explicitly
        const toggleIcon = category.querySelector('.toggle-icon i');
        if (toggleIcon) {
            toggleIcon.className = 'fas fa-chevron-down';
        }
    });
    
    // Handle expanding/collapsing categories when clicking header
    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        const content = category.querySelector('.category-content');
        const toggleIcon = category.querySelector('.toggle-icon i');
        
        if (header && content) {
            header.addEventListener('click', (e) => {
                // Prevent carousel from sliding on header click
                e.stopPropagation();
                
                // Toggle the active class to expand/collapse
                category.classList.toggle('active');
                
                // Debug logging
                console.log('Category clicked:', category.querySelector('h3').textContent);
                console.log('Toggle icon found:', !!toggleIcon);
                
                // Update toggle icon if it exists
                if (toggleIcon) {
                    // Log current classes before toggling
                    console.log('Icon classes before:', toggleIcon.className);
                    
                    // Use classList.remove and add instead of string replacement
                    if (category.classList.contains('active')) {
                        toggleIcon.classList.remove('fa-chevron-down');
                        toggleIcon.classList.add('fa-chevron-up');
                    } else {
                        toggleIcon.classList.remove('fa-chevron-up');
                        toggleIcon.classList.add('fa-chevron-down');
                    }
                    
                    // Log classes after toggling
                    console.log('Icon classes after:', toggleIcon.className);
                }
            });
        }
    });
    
    // Update carousel position
    function updateCarousel() {
        console.log(`Sliding to position ${currentSlide}`);
        
        // Move the carousel to show the current slide
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        if (dots && dots.length) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Auto-expand current category, collapse others
        categories.forEach((category, index) => {
            const toggleIcon = category.querySelector('.toggle-icon i');
            
            if (index === currentSlide) {
                category.classList.add('active');
                if (toggleIcon) {
                    toggleIcon.className = 'fas fa-chevron-up';
                }
            } else {
                category.classList.remove('active');
                if (toggleIcon) {
                    toggleIcon.className = 'fas fa-chevron-down';
                }
            }
        });
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Dot navigation
    if (dots && dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
    }
    
    // Touch/swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        // Prevent default only if we detect a horizontal swipe
        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;
        
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isSwiping = false;
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (diff < -swipeThreshold) {
            // Swipe left (next)
            nextSlide();
        } else if (diff > swipeThreshold) {
            // Swipe right (previous)
            prevSlide();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const productSection = document.getElementById('products');
        
        // Only respond to keyboard if product section is in view
        if (productSection && isElementInViewport(productSection)) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom > 0
        );
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Auto-play functionality (optional)
    let autoplayInterval = null;
    
    function startAutoplay() {
        if (autoplayInterval) return;
        
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 6000); // Change slide every 6 seconds
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Start autoplay on page load
    startAutoplay();
    
    // Pause autoplay on interaction
    carousel.addEventListener('mouseenter', stopAutoplay);
    if (prevBtn) prevBtn.addEventListener('mouseenter', stopAutoplay);
    if (nextBtn) nextBtn.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay);
    
    // Resume autoplay when mouse leaves
    carousel.addEventListener('mouseleave', startAutoplay);
    if (prevBtn) prevBtn.addEventListener('mouseleave', startAutoplay);
    if (nextBtn) nextBtn.addEventListener('mouseleave', startAutoplay);
    
    // Responsive behavior
    function handleResize() {
        // Make sure carousel is properly sized
        updateCarousel();
    }
    
    window.addEventListener('resize', handleResize);
} 