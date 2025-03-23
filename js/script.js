
// ----------------------
// EmailJS Initialization
// ----------------------


// ----------------------
// Form Submission Handling
// ----------------------

// Select the contact form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Select form elements using their name attributes
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        // Phone is optional; if the element exists, grab its value
        const phone = phoneInput ? phoneInput.value.trim() : '';  
        const message = messageInput.value.trim();
        
        // Basic validation for required fields
        if (!name || !email || !message) {
            alert('Please fill in all required fields: Name, Email, and Message.');
            return;
        }
        
        // Validate email format using regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email address.');
            return;
        }
        
        // Configure EmailJS template parameters
        const templateParams = {
            to_name: 'ChemTech Coating Solutions',
            from_name: name,
            to_email: 'chemtechcoating@gmail.com',
            message_html: message,
            reply_to: email,
            // Optionally include phone if provided
            phone: phone
        };

        console.log('Sending email...');
        
        // Send the email using EmailJS with async/await for clarity
        const response = await emailjs.send(
            'service_tlj13aq',      // Replace with your service ID
            'template_2y4rsbp',     // Replace with your template ID
            templateParams,
            'LTWmHe-fQx5R8YbZj'     // Replace with your public key if not already initialized above
        );
        
        console.log('Email sent successfully:', response);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error handling form submission:', error);
        alert('There was an error sending your message. Please try again later.');
    }
});
