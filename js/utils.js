// Smooth Scrolling Functionality
export function smoothScroll(target) {
    try {
        const targetElement = document.querySelector(target);
        if (!targetElement) {
            throw new Error(`Target element ${target} not found`);
        }
        
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Smooth scroll error:', error);
    }
}

// Add utility for form validation
export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
