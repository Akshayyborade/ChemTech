import { validateEmail } from './utils.js';

// Contact form handling
export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Show loading indicator
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        try {
            // Select form elements using their name attributes
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const phoneInput = contactForm.querySelector('input[name="phone"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            const serviceInput = contactForm.querySelector('select[name="service"]');

            const names = nameInput.value.trim();
            const emails = emailInput.value.trim();
            const phone = phoneInput ? phoneInput.value.trim() : 'Not provided';
            const message = messageInput.value.trim();
            const service = serviceInput ? serviceInput.options[serviceInput.selectedIndex].text : 'Not specified';

            // Validate email format
            if (!validateEmail(emails)) {
                alert('Please enter a valid email address.');
                return;
            }

            // First Email (to the user - Thank You)
            const userTemplateParams = {
                email: emails,
                name: names
            };

            await emailjs.send('service_tlj13aq', 'template_2y4rsbp', userTemplateParams);
            console.log('Thank you email sent successfully.');

            // Second Email (to yourself - User Inquiry)
            const adminTemplateParams = {
                admin_email: "chemtechcoating@gmail.com",
                user_name: names,
                user_email: emails,
                user_phone: phone,
                user_message: message,
                user_service: service
            };

            await emailjs.send('service_tlj13aq', 'template_3u6s00q', adminTemplateParams);
            console.log('Admin notification email sent successfully.');

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error handling form submission:', error);
            alert('There was an error sending your message. Please try again later.');
        } finally {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
} 