 // Cookie Consent Handler
 document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const customizeBtn = document.getElementById('customizeCookies');
    const declineBtn = document.getElementById('declineCookies');

    // Show cookie consent if not previously accepted
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }

    // Accept cookies
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        // Here you can add code to enable all cookies
    });

    // Customize cookies
    customizeBtn.addEventListener('click', () => {
        // Add your cookie customization logic here
        // For example, open a modal with cookie settings
        alert('Cookie preferences customization will be implemented soon.');
    });

    // Decline cookies
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        // Here you can add code to disable non-essential cookies
    });
});

// Preloader Handler
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});