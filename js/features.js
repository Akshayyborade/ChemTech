// Color Selector functionality
export function initColorSelector() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const colorCollections = document.querySelectorAll('.color-collection');
    const colorItems = document.querySelectorAll('.color-item');
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewImage = document.getElementById('previewImage');
    const colorPreview = document.getElementById('colorPreview');

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
}

// Cost Calculator - DISABLED FOR TESTING
export function initCostCalculator() {
    console.log('Module-based calculator is DISABLED for testing');
    return; // Early return to disable this function
    
    // Find all required elements
    const calculateBtn = document.getElementById('calculate-cost');
    const areaInput = document.getElementById('area');
    const coatingTypeSelect = document.getElementById('coating-type');
    const floorConditionSelect = document.getElementById('floor-condition');
    const estimatedCostElement = document.getElementById('estimated-cost');
    const calculatorResult = document.getElementById('calculator-result');
    
    // Debug element existence
    console.log('Elements found in features.js:', {
        calculateBtn: !!calculateBtn,
        areaInput: !!areaInput,
        coatingTypeSelect: !!coatingTypeSelect,
        floorConditionSelect: !!floorConditionSelect,
        estimatedCostElement: !!estimatedCostElement,
        calculatorResult: !!calculatorResult
    });
    
    // Check if all elements exist
    if (!calculateBtn || !areaInput || !coatingTypeSelect || !floorConditionSelect || !estimatedCostElement) {
        console.error('Cost calculator elements not found in features.js. Check your HTML IDs.');
        return;
    }
    
    // Base rates per square foot (in ₹)
    const baseRates = {
        'standard': 60,
        'metallic': 120,
        'flake': 90,
        'polyurethane': 80
    };
    
    // Condition multipliers
    const conditionMultipliers = {
        'good': 1.0,
        'average': 1.2,
        'poor': 1.5
    };
    
    // Minimum costs
    const minimumCost = 5000;
    
    // Add input validation
    areaInput.addEventListener('input', function() {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Ensure value is not less than 1
        if (this.value && parseInt(this.value) < 1) {
            this.value = '1';
        }
    });
    
    // Calculate cost function
    function calculateCost() {
        console.log('Calculating cost from features.js...');
        
        // Get values
        const area = parseInt(areaInput.value) || 0;
        const coatingType = coatingTypeSelect.value;
        const floorCondition = floorConditionSelect.value;
        
        console.log('Input values in features.js:', { area, coatingType, floorCondition });
        
        // Validate area
        if (area <= 0) {
            alert('Please enter a valid area');
            return;
        }
        
        // Calculate base cost
        const baseRate = baseRates[coatingType] || baseRates['standard'];
        const conditionMultiplier = conditionMultipliers[floorCondition] || conditionMultipliers['good'];
        
        let totalCost = area * baseRate * conditionMultiplier;
        
        // Apply minimum cost
        totalCost = Math.max(totalCost, minimumCost);
        
        // Apply volume discount
        if (area > 1000) {
            totalCost = totalCost * 0.9; // 10% discount for large areas
        } else if (area > 500) {
            totalCost = totalCost * 0.95; // 5% discount for medium areas
        }
        
        // Round to nearest 100
        totalCost = Math.ceil(totalCost / 100) * 100;
        
        console.log('Calculated cost in features.js:', totalCost);
        
        // Display result directly without animation for testing
        estimatedCostElement.textContent = '₹' + totalCost.toLocaleString('en-IN');
        
        // Show result container
        if (calculatorResult) {
            calculatorResult.style.display = 'block';
        }
    }
    
    // Add event listener to calculate button
    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Calculate button clicked in features.js');
        calculateCost();
    });
    
    // Also calculate on Enter key in area input
    areaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateCost();
        }
    });
    
    console.log('Cost calculator initialized successfully in features.js');
}

// Before/After Slider
export function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    const handle = document.querySelector('.slider-handle');
    const beforeImage = document.querySelector('.before-image');
    
    if (!slider || !handle || !beforeImage) return;
    
    let isDragging = false;
    
    // Set initial position
    handle.style.left = '50%';
    beforeImage.style.width = '50%';
    
    // Handle mouse/touch events
    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag() {
        isDragging = true;
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        const sliderRect = slider.getBoundingClientRect();
        let x = (e.clientX || e.touches[0].clientX) - sliderRect.left;
        
        // Constrain to slider width
        if (x < 0) x = 0;
        if (x > sliderRect.width) x = sliderRect.width;
        
        // Convert to percentage
        const percent = (x / sliderRect.width) * 100;
        
        // Update position
        handle.style.left = `${percent}%`;
        beforeImage.style.width = `${percent}%`;
    }
    
    function endDrag() {
        isDragging = false;
    }
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