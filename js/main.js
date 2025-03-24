// Intersection Observer for animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all service categories and industry cards
    document.querySelectorAll('.service-category, .industry-card').forEach(el => {
        observer.observe(el);
    });
};

// Cost Calculator Enhancement
const calculateCost = () => {
    const area = parseFloat(document.getElementById('area').value);
    const applicationType = document.getElementById('application-type').value;
    const usageArea = document.getElementById('usage-area').value;
    const floorCondition = document.getElementById('floor-condition').value;

    // Base rates per square foot (₹)
    const applicationRates = {
        antistatic: 150,
        selflevelling: 120,
        industrial: 180,
        protective: 130,
        crack: 100,
        concrete: 90,
        machinery: 200,
        waterproofing: 140,
        chemical: 220,
        clear: 160,
        pu: 170
    };

    // Industry-specific multipliers
    const usageMultipliers = {
        automotive: 1.3,
        power: 1.4,
        food: 1.35,
        pharma: 1.4,
        industrial: 1.25,
        paper: 1.2,
        warehouse: 1.15,
        hydraulic: 1.3,
        commercial: 1.1,
        water: 1.25,
        treatment: 1.35,
        retail: 1.2,
        healthcare: 1.3
    };

    // Floor condition multipliers
    const conditionMultipliers = {
        good: 1.0,
        average: 1.2,
        poor: 1.5
    };

    // Calculate base cost
    let baseRate = applicationRates[applicationType] || 100;
    let usageMultiplier = usageMultipliers[usageArea] || 1.0;
    let conditionMultiplier = conditionMultipliers[floorCondition];
    
    let totalCost = area * baseRate * usageMultiplier * conditionMultiplier;

    // Apply minimum cost threshold
    const minimumCost = 5000;
    totalCost = Math.max(totalCost, minimumCost);

    // Apply volume discounts
    if (area > 2000) {
        totalCost *= 0.85; // 15% discount
    } else if (area > 1000) {
        totalCost *= 0.9; // 10% discount
    } else if (area > 500) {
        totalCost *= 0.95; // 5% discount
    }

    // Round to nearest hundred
    totalCost = Math.ceil(totalCost / 100) * 100;

    // Display result
    const resultElement = document.getElementById('calculator-result');
    const costElement = document.getElementById('estimated-cost');
    
    if (resultElement && costElement) {
        costElement.textContent = '₹' + totalCost.toLocaleString('en-IN');
        resultElement.style.display = 'block';
        
        // Animate the result display
        resultElement.classList.add('animate-fadeIn');
    }
};

// Filter functionality for services
const initServiceFilter = () => {
    const filterButtons = document.querySelectorAll('.service-filter button');
    const serviceItems = document.querySelectorAll('.service-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter services
            serviceItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('animate-in'), 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate-in');
                }
            });
        });
    });
};

// Initialize tooltips for industry cards
const initTooltips = () => {
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        const tooltip = card.querySelector('.industry-tooltip');
        if (tooltip) {
            card.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            
            card.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        }
    });
};

// Form validation enhancement
const initFormValidation = () => {
    const calculatorForm = document.querySelector('.calculator-form');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (calculatorForm.checkValidity()) {
                calculateCost();
            } else {
                // Highlight invalid fields
                const invalidInputs = calculatorForm.querySelectorAll(':invalid');
                invalidInputs.forEach(input => {
                    input.classList.add('error');
                    input.addEventListener('input', () => {
                        input.classList.remove('error');
                    }, { once: true });
                });
            }
        });
    }
};

// Add dynamic service details expansion
const initServiceDetails = () => {
    const serviceCategories = document.querySelectorAll('.service-category');
    
    serviceCategories.forEach(category => {
        const header = category.querySelector('.category-header');
        const details = category.querySelector('.service-list');
        
        header.addEventListener('click', () => {
            const isExpanded = category.classList.contains('expanded');
            
            // Collapse all other categories
            serviceCategories.forEach(cat => {
                cat.classList.remove('expanded');
                const otherDetails = cat.querySelector('.service-list');
                otherDetails.style.maxHeight = '0px';
            });
            
            // Toggle current category
            if (!isExpanded) {
                category.classList.add('expanded');
                details.style.maxHeight = details.scrollHeight + 'px';
            }
        });
    });
};

// Add industry expertise hover effects
const initIndustryExpertise = () => {
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        // Add expertise details popup
        const details = document.createElement('div');
        details.className = 'industry-details';
        details.innerHTML = `
            <h5>Key Features:</h5>
            <ul>
                <li>Industry-specific solutions</li>
                <li>Customized applications</li>
                <li>Quality assurance</li>
                <li>Expert consultation</li>
            </ul>
        `;
        
        card.appendChild(details);
        
        // Add hover interaction
        card.addEventListener('mouseenter', () => {
            details.style.transform = 'translateY(0)';
            details.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            details.style.transform = 'translateY(20px)';
            details.style.opacity = '0';
        });
    });
};

// Enhanced calculator with real-time updates
const initRealTimeCalculator = () => {
    const calculatorInputs = document.querySelectorAll('.calculator-form select, .calculator-form input');
    
    calculatorInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (document.querySelector('.calculator-form').checkValidity()) {
                calculateCost();
            }
        });
    });
    
    // Add area input enhancement
    const areaInput = document.getElementById('area');
    if (areaInput) {
        const createRangeIndicator = () => {
            const indicator = document.createElement('div');
            indicator.className = 'area-indicator';
            areaInput.parentNode.appendChild(indicator);
            
            return indicator;
        };
        
        const indicator = createRangeIndicator();
        
        areaInput.addEventListener('input', () => {
            const value = parseFloat(areaInput.value);
            if (value > 2000) {
                indicator.textContent = '15% volume discount applied';
            } else if (value > 1000) {
                indicator.textContent = '10% volume discount applied';
            } else if (value > 500) {
                indicator.textContent = '5% volume discount applied';
            } else {
                indicator.textContent = '';
            }
        });
    }
};

// Add loading state for calculator
const addLoadingState = () => {
    const calculateButton = document.querySelector('.calculator-form button');
    const originalCalculate = calculateCost;
    
    calculateCost = async () => {
        calculateButton.disabled = true;
        calculateButton.innerHTML = '<span class="spinner"></span> Calculating...';
        
        // Simulate calculation delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        originalCalculate();
        
        calculateButton.disabled = false;
        calculateButton.textContent = 'Calculate Cost';
    };
};

// Add scroll progress indicator
const addScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
};

// Add mobile-specific enhancements
const initMobileOptimizations = () => {
    // Add touch support for service categories
    const serviceCategories = document.querySelectorAll('.service-category');
    
    serviceCategories.forEach(category => {
        let touchStartY = 0;
        let touchEndY = 0;
        
        category.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        category.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            if (Math.abs(touchEndY - touchStartY) < 20) { // Detect tap vs scroll
                category.querySelector('.category-header').click();
            }
        }, { passive: true });
    });
    
    // Enhanced mobile form experience
    const enhanceMobileForm = () => {
        const form = document.querySelector('.calculator-form');
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            // Increase touch target size on mobile
            input.style.minHeight = '44px';
            
            // Add visual feedback on touch
            input.addEventListener('touchstart', () => {
                input.style.backgroundColor = 'rgba(0,0,0,0.05)';
            }, { passive: true });
            
            input.addEventListener('touchend', () => {
                input.style.backgroundColor = '';
            }, { passive: true });
        });
    };
    
    // Mobile-specific error messages
    const enhanceMobileErrors = () => {
        const showMobileError = (message) => {
            const errorToast = document.createElement('div');
            errorToast.className = 'mobile-error-toast';
            errorToast.textContent = message;
            document.body.appendChild(errorToast);
            
            setTimeout(() => {
                errorToast.classList.add('show');
                setTimeout(() => {
                    errorToast.classList.remove('show');
                    setTimeout(() => errorToast.remove(), 300);
                }, 3000);
            }, 100);
        };
        
        return showMobileError;
    };
    
    if (window.innerWidth <= 768) {
        enhanceMobileForm();
        const showMobileError = enhanceMobileErrors();
        
        // Enhanced error handling for mobile
        const calculatorForm = document.querySelector('.calculator-form');
        if (calculatorForm) {
            calculatorForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const invalidInputs = calculatorForm.querySelectorAll(':invalid');
                if (invalidInputs.length > 0) {
                    showMobileError('Please fill in all required fields');
                    invalidInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    }
};

// Enhanced error handling and validation
const enhanceFormValidation = () => {
    const form = document.querySelector('.calculator-form');
    if (!form) return;

    const validateInput = (input) => {
        const value = input.value.trim();
        const type = input.type;
        const id = input.id;
        
        let isValid = true;
        let errorMessage = '';

        switch(id) {
            case 'area':
                if (value === '') {
                    errorMessage = 'Area is required';
                    isValid = false;
                } else if (parseFloat(value) <= 0) {
                    errorMessage = 'Area must be greater than 0';
                    isValid = false;
                } else if (parseFloat(value) > 100000) {
                    errorMessage = 'Please contact us directly for areas larger than 100,000 sq ft';
                    isValid = false;
                }
                break;
                
            case 'application-type':
            case 'usage-area':
            case 'floor-condition':
                if (!value) {
                    errorMessage = 'This field is required';
                    isValid = false;
                }
                break;
        }

        // Update UI with validation result
        const errorElement = input.parentElement.querySelector('.error-message') || 
                           document.createElement('div');
        
        if (!isValid) {
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            if (!input.parentElement.querySelector('.error-message')) {
                input.parentElement.appendChild(errorElement);
            }
            input.classList.add('error');
        } else {
            errorElement.remove();
            input.classList.remove('error');
        }

        return isValid;
    };

    // Add real-time validation
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });
};

// Add corresponding CSS for new features
const addMobileStyles = () => {
    const mobileStyles = `
        @media (max-width: 768px) {
            .mobile-error-toast {
                position: fixed;
                bottom: -100px;
                left: 50%;
                transform: translateX(-50%);
                background: #ff4444;
                color: white;
                padding: 1rem 2rem;
                border-radius: 25px;
                z-index: 1000;
                transition: bottom 0.3s ease;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                text-align: center;
                width: 90%;
                max-width: 400px;
            }
            
            .mobile-error-toast.show {
                bottom: 20px;
            }
            
            .error-message {
                color: #ff4444;
                font-size: 0.8rem;
                margin-top: 0.3rem;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .calculator-form input,
            .calculator-form select {
                font-size: 16px; /* Prevent zoom on iOS */
                -webkit-tap-highlight-color: transparent;
            }
            
            .calculator-form .form-group {
                margin-bottom: 1.5rem;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileStyles;
    document.head.appendChild(styleSheet);
};

// Add performance optimizations and offline support
const enhancePerformance = () => {
    // Debounce function for performance
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Optimize scroll handler
    const optimizedScroll = debounce(() => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        requestAnimationFrame(() => {
            document.querySelector('.scroll-progress').style.width = `${progress}%`;
        });
    }, 16);

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // Image lazy loading
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // Cache API implementation for offline support
    const initOfflineSupport = async () => {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('ServiceWorker registered');

                // Cache essential resources
                const cache = await caches.open('flooring-app-v1');
                const resourcesToCache = [
                    '/',
                    '/index.html',
                    '/css/styles.css',
                    '/js/main.js',
                    '/images/logo.png'
                ];
                await cache.addAll(resourcesToCache);
            } catch (error) {
                console.error('ServiceWorker registration failed:', error);
            }
        }
    };

    // Add offline notification
    const checkConnectivity = () => {
        const showOfflineNotification = () => {
            const notification = document.createElement('div');
            notification.className = 'offline-notification';
            notification.textContent = 'You are currently offline. Some features may be limited.';
            document.body.appendChild(notification);
        };

        const removeOfflineNotification = () => {
            const notification = document.querySelector('.offline-notification');
            if (notification) notification.remove();
        };

        window.addEventListener('online', removeOfflineNotification);
        window.addEventListener('offline', showOfflineNotification);
    };

    // Initialize performance optimizations
    lazyLoadImages();
    initOfflineSupport();
    checkConnectivity();
};

// Add service worker for offline support
const serviceWorkerContent = `
// Create service worker file: sw.js
const CACHE_NAME = 'flooring-app-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/css/styles.css',
                    '/js/main.js',
                    '/images/logo.png'
                ]);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});
`;

// Add corresponding styles for offline notification
const offlineStyles = `
    .offline-notification {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff9800;
        color: white;
        text-align: center;
        padding: 1rem;
        z-index: 1001;
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }
`;

// Add performance monitoring and analytics
const initPerformanceMonitoring = () => {
    // Performance metrics tracking
    const trackPerformanceMetrics = () => {
        const metrics = {};
        
        // Core Web Vitals
        if ('web-vital' in window) {
            webVitals.getCLS(metric => metrics.cls = metric.value);
            webVitals.getFID(metric => metrics.fid = metric.value);
            webVitals.getLCP(metric => metrics.lcp = metric.value);
        }

        // Custom performance marks
        performance.mark('app-loaded');
        
        return metrics;
    };

    // Resource loading optimization
    const optimizeResourceLoading = () => {
        // Preload critical resources
        const preloadLinks = [
            { rel: 'preload', href: '/css/styles.css', as: 'style' },
            { rel: 'preload', href: '/js/main.js', as: 'script' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
        ];

        preloadLinks.forEach(link => {
            const linkElement = document.createElement('link');
            Object.entries(link).forEach(([key, value]) => {
                linkElement[key] = value;
            });
            document.head.appendChild(linkElement);
        });
    };

    // Dynamic import for non-critical components
    const loadNonCriticalResources = async () => {
        // Wait for main content to load
        await document.readyState === 'complete' || new Promise(resolve => {
            window.addEventListener('load', resolve);
        });

        // Load non-critical resources
        const nonCriticalModules = [
            import('./analytics.js'),
            import('./social-sharing.js'),
            import('./feedback-form.js')
        ];

        Promise.all(nonCriticalModules).catch(console.error);
    };

    // Memory management
    const optimizeMemoryUsage = () => {
        // Clean up event listeners when components are removed
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === 1) { // ELEMENT_NODE
                        // Clean up event listeners
                        const listeners = node._listeners || [];
                        listeners.forEach(({ type, handler }) => {
                            node.removeEventListener(type, handler);
                        });
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    // Enhanced error tracking
    const initErrorTracking = () => {
        window.addEventListener('error', (event) => {
            console.error('Runtime error:', {
                message: event.message,
                filename: event.filename,
                lineNo: event.lineno,
                colNo: event.colno,
                error: event.error
            });
            // Send to analytics if needed
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            // Send to analytics if needed
        });
    };

    // Initialize all performance optimizations
    trackPerformanceMetrics();
    optimizeResourceLoading();
    loadNonCriticalResources();
    optimizeMemoryUsage();
    initErrorTracking();
};

// Add analytics tracking
const initAnalytics = () => {
    const trackEvent = (category, action, label = '', value = '') => {
        if (window.gtag) {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
    };

    // Track calculator usage
    const trackCalculatorUsage = () => {
        const form = document.querySelector('.calculator-form');
        if (form) {
            form.addEventListener('submit', () => {
                trackEvent('Calculator', 'Submit', 'Cost Calculation');
            });

            // Track field interactions
            form.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('change', () => {
                    trackEvent('Calculator', 'Input Change', input.id);
                });
            });
        }
    };

    // Track service interactions
    const trackServiceInteractions = () => {
        document.querySelectorAll('.service-category').forEach(category => {
            category.addEventListener('click', () => {
                const serviceName = category.querySelector('h3').textContent;
                trackEvent('Services', 'View', serviceName);
            });
        });
    };

    // Initialize tracking
    trackCalculatorUsage();
    trackServiceInteractions();
};

// Add A/B Testing and Enhanced Analytics
const initABTesting = () => {
    // A/B Test variants
    const variants = {
        calculatorLayout: ['standard', 'simplified'],
        serviceDisplay: ['grid', 'list'],
        colorScheme: ['default', 'modern']
    };

    // Assign user to test groups
    const assignTestGroups = () => {
        const testGroups = {};
        Object.keys(variants).forEach(test => {
            const variantOptions = variants[test];
            testGroups[test] = variantOptions[Math.floor(Math.random() * variantOptions.length)];
        });
        localStorage.setItem('abTestGroups', JSON.stringify(testGroups));
        return testGroups;
    };

    // Get or create test groups
    const testGroups = JSON.parse(localStorage.getItem('abTestGroups')) || assignTestGroups();

    // Apply variants
    const applyVariants = () => {
        document.body.classList.add(`calculator-${testGroups.calculatorLayout}`);
        document.body.classList.add(`services-${testGroups.serviceDisplay}`);
        document.body.classList.add(`theme-${testGroups.colorScheme}`);
    };

    // Track variant performance
    const trackVariantPerformance = () => {
        if (window.gtag) {
            Object.entries(testGroups).forEach(([test, variant]) => {
                gtag('event', 'experiment_impression', {
                    'experiment_id': test,
                    'variant_id': variant
                });
            });
        }
    };

    applyVariants();
    trackVariantPerformance();
    return testGroups;
};

// Enhanced User Interaction Tracking
const initEnhancedTracking = () => {
    // Session tracking
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // User engagement metrics
    let scrollDepth = 0;
    let timeOnPage = 0;
    let interactionCount = 0;

    // Track scroll depth
    const trackScrollDepth = () => {
        window.addEventListener('scroll', debounce(() => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const newScrollDepth = Math.round((scrollTop + winHeight) / docHeight * 100);
            
            if (newScrollDepth > scrollDepth) {
                scrollDepth = newScrollDepth;
                trackEvent('Engagement', 'Scroll Depth', `${scrollDepth}%`);
            }
        }, 500));
    };

    // Track time on page
    const trackTimeOnPage = () => {
        const interval = setInterval(() => {
            timeOnPage += 10;
            if (timeOnPage % 60 === 0) { // Track every minute
                trackEvent('Engagement', 'Time on Page', `${timeOnPage/60} minutes`);
            }
        }, 10000);

        // Clear interval when page is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(interval);
            }
        });
    };

    // Track user interactions
    const trackInteractions = () => {
        const interactiveElements = document.querySelectorAll('button, a, input, select');
        interactiveElements.forEach(element => {
            element.addEventListener('click', () => {
                interactionCount++;
                trackEvent('Engagement', 'Interaction', `Count: ${interactionCount}`);
            });
        });
    };

    // Track form interactions in detail
    const trackDetailedFormInteractions = () => {
        const form = document.querySelector('.calculator-form');
        if (!form) return;

        const formAnalytics = {
            startTime: null,
            fieldInteractions: {},
            completionRate: 0
        };

        form.addEventListener('focusin', () => {
            if (!formAnalytics.startTime) {
                formAnalytics.startTime = Date.now();
            }
        });

        form.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('change', () => {
                formAnalytics.fieldInteractions[field.id] = {
                    interactionCount: (formAnalytics.fieldInteractions[field.id]?.interactionCount || 0) + 1,
                    timeSpent: Date.now() - formAnalytics.startTime
                };

                // Calculate completion rate
                const totalFields = form.querySelectorAll('input, select').length;
                const filledFields = Object.keys(formAnalytics.fieldInteractions).length;
                formAnalytics.completionRate = Math.round((filledFields / totalFields) * 100);

                trackEvent('Form', 'Field Interaction', field.id, formAnalytics.completionRate);
            });
        });
    };

    // Heat map data collection
    const initHeatMap = () => {
        const heatMapData = [];
        
        document.addEventListener('click', (e) => {
            heatMapData.push({
                x: e.pageX,
                y: e.pageY,
                timestamp: Date.now(),
                element: e.target.tagName,
                path: e.path?.map(el => el.tagName).join(' > ')
            });

            // Send data in batches
            if (heatMapData.length >= 10) {
                trackEvent('HeatMap', 'Clicks', JSON.stringify(heatMapData));
                heatMapData.length = 0;
            }
        });
    };

    trackScrollDepth();
    trackTimeOnPage();
    trackInteractions();
    trackDetailedFormInteractions();
    initHeatMap();
};

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initServiceFilter();
    initTooltips();
    initFormValidation();
    initServiceDetails();
    initIndustryExpertise();
    initRealTimeCalculator();
    addLoadingState();
    addScrollProgress();
    initMobileOptimizations();
    enhanceFormValidation();
    addMobileStyles();
    enhancePerformance();
    initPerformanceMonitoring();
    initAnalytics();
    const testGroups = initABTesting();
    initEnhancedTracking();
    initChatBot();
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add corresponding CSS animations
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--primary-color);
        z-index: 1000;
        transition: width 0.2s;
    }
    
    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 0.8s linear infinite;
    }
    
    .area-indicator {
        font-size: 0.9rem;
        color: var(--primary-color);
        margin-top: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .industry-details {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255,255,255,0.95);
        padding: 1rem;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

// Add performance-related styles
const performanceStyles = `
    /* Add content-visibility for better performance */
    .service-category,
    .industry-card {
        content-visibility: auto;
        contain-intrinsic-size: 0 500px;
    }

    /* Optimize animations */
    @media (prefers-reduced-motion: reduce) {
        .animate-in,
        .service-category,
        .industry-card {
            animation: none !important;
            transition: none !important;
        }
    }

    /* Hardware acceleration for smooth animations */
    .scroll-progress,
    .mobile-error-toast,
    .industry-details {
        transform: translateZ(0);
        will-change: transform;
    }
`;

// Append performance styles
style.textContent += performanceStyles;

// Add A/B test variant styles
const abTestStyles = `
    /* Calculator Layout Variants */
    .calculator-simplified .calculator-form {
        max-width: 600px;
        margin: 0 auto;
    }

    .calculator-simplified .form-group {
        margin-bottom: 2rem;
    }

    /* Service Display Variants */
    .services-list .services-grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .services-list .service-category {
        width: 100%;
    }

    /* Color Scheme Variants */
    .theme-modern {
        --primary-color: #2196f3;
        --secondary-color: #ff4081;
        --text-color: #333;
        --background-color: #f8f9fa;
    }
`;

// Append A/B test styles
style.textContent += abTestStyles;

document.head.appendChild(style);

// Add this to handle the chat functionality
const initChatBot = () => {
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.querySelector('.chat-body');

    // Track conversation state
    let conversationState = {
        step: 'greeting',
        userData: {
            name: '',
            email: '',
            interest: '',
            message: ''
        }
    };

    // Initial bot message
    const startConversation = () => {
        addBotMessage("Hello! I'm here to help you. What's your name?");
    };

    // Handle user messages based on conversation state
    const handleUserInput = (userMessage) => {
        addUserMessage(userMessage);

        switch (conversationState.step) {
            case 'greeting':
                conversationState.userData.name = userMessage;
                conversationState.step = 'email';
                addBotMessage(`Nice to meet you, ${userMessage}! Please share your email address so we can stay in touch.`);
                break;

            case 'email':
                if (validateEmail(userMessage)) {
                    conversationState.userData.email = userMessage;
                    conversationState.step = 'interest';
                    addBotMessage("What service are you interested in? Choose from:\n1. Industrial Flooring\n2. Commercial Spaces\n3. Residential Solutions\n4. Waterproofing");
                } else {
                    addBotMessage("Please enter a valid email address.");
                }
                break;

            case 'interest':
                conversationState.userData.interest = userMessage;
                conversationState.step = 'message';
                addBotMessage("Great choice! Please tell me more about your requirements or any questions you have.");
                break;

            case 'message':
                conversationState.userData.message = userMessage;
                conversationState.step = 'complete';
                submitChatForm(conversationState.userData);
                break;
        }
    };

    // Validate email format
    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    // Add message to chat
    const addUserMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const addBotMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';
        messageDiv.innerHTML = `
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Submit the collected information
    const submitChatForm = async (userData) => {
        try {
            // Send email to user
            const userTemplateParams = {
                email: userData.email,
                name: userData.name
            };

            await emailjs.send('service_tlj13aq', 'template_2y4rsbp', userTemplateParams);

            // Send email to admin
            const adminTemplateParams = {
                admin_email: "chemtechcoating@gmail.com",
                user_name: userData.name,
                user_email: userData.email,
                user_message: userData.message,
                user_service: userData.interest
            };

            await emailjs.send('service_tlj13aq', 'template_3u6s00q', adminTemplateParams);

            // Show success message
            addBotMessage("Thank you for your message! We'll get back to you soon. Is there anything else I can help you with?");
            
            // Reset conversation state
            conversationState = {
                step: 'greeting',
                userData: {
                    name: '',
                    email: '',
                    interest: '',
                    message: ''
                }
            };
        } catch (error) {
            console.error('Error sending message:', error);
            addBotMessage("There was an error sending your message. Please try again later.");
        }
    };

    // Event listeners
    chatButton.addEventListener('click', () => {
        chatPopup.classList.toggle('show');
        if (chatBody.children.length === 0) {
            startConversation();
        }
    });

    closeChat.addEventListener('click', () => {
        chatPopup.classList.remove('show');
    });

    const sendChatMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserInput(message);
            chatInput.value = '';
        }
    };

    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
};

// Add these styles to your existing CSS
const chatStyles = `
    .chat-message {
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        max-width: 80%;
    }

    .chat-message.user {
        background-color: #e3f2fd;
        margin-left: auto;
    }

    .chat-message.bot {
        background-color: #f5f5f5;
        margin-right: auto;
    }

    .chat-message p {
        margin: 0;
        padding: 0;
    }

    .message-time {
        font-size: 0.8em;
        color: #666;
        display: block;
        margin-top: 5px;
    }

    .chat-popup {
        width: 300px;
        height: 400px;
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: none;
        flex-direction: column;
        z-index: 1000;
    }

    .chat-popup.show {
        display: flex;
    }

    .chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    }

    .chat-footer {
        padding: 10px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
    }

    .chat-footer input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
    }

    .chat-footer button {
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
    }
`;

// Add the styles to the document
const style = document.createElement('style');
style.textContent += chatStyles;
document.head.appendChild(style); 