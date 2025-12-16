/* ============================================
   FORM HANDLER - CONTACT FORM
   ============================================ */

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// ============================================
// FORM VALIDATION
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ============================================
// FORM SUBMISSION
// ============================================
contactForm. addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: sanitizeInput(document.getElementById('name').value),
        email: sanitizeInput(document.getElementById('email').value),
        phone: sanitizeInput(document.getElementById('phone').value),
        service: document.getElementById('service').value,
        message: sanitizeInput(document.getElementById('message').value)
    };
    
    // Validate required fields
    if (!formData. name || !formData.email || !formData.phone || !formData.service) {
        showMessage('Por favor completa todos los campos obligatorios. ', 'error');
        return;
    }
    
    // Validate email
    if (! validateEmail(formData.email)) {
        showMessage('Por favor ingresa un email válido.', 'error');
        return;
    }
    
    // Validate phone
    if (!validatePhone(formData.phone)) {
        showMessage('Por favor ingresa un teléfono válido.', 'error');
        return;
    }
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn. innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando... ';
    
    try {
        // TODO: Replace this with your actual backend endpoint
        // This is a simulation - replace with real API call
        
        // Simulate API call
        await simulateFormSubmission(formData);
        
        // Success
        showMessage('¡Gracias por contactarnos! Te responderemos a la brevedad.', 'success');
        contactForm.reset();
        
        // Optional: Send to Google Sheets, EmailJS, or your backend
        // await sendToBackend(formData);
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Hubo un error al enviar el formulario.  Por favor intenta nuevamente.', 'error');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// ============================================
// SIMULATE FORM SUBMISSION (REMOVE IN PRODUCTION)
// ============================================
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form data submitted:', data);
            resolve({ success: true });
        }, 1500);
    });
}

// ============================================
// REAL BACKEND INTEGRATION EXAMPLES
// ============================================

// OPTION 1: Send to your own backend (Node.js, PHP, etc.)
/*
async function sendToBackend(formData) {
    const response = await fetch('https://tu-dominio.com/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Error en el servidor');
    }
    
    return await response.json();
}
*/

// OPTION 2: Send to EmailJS (https://www.emailjs.com/)
/*
async function sendToEmailJS(formData) {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
    };
    
    return emailjs.send(
        'YOUR_SERVICE_ID',  // Replace with your service ID
        'YOUR_TEMPLATE_ID', // Replace with your template ID
        templateParams
    );
}
*/

// OPTION 3: Send to Google Sheets via Google Apps Script
/*
async function sendToGoogleSheets(formData) {
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; // Replace with your script URL
    
    const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return await response.json();
}
*/

// OPTION 4: Send via FormSpree (https://formspree.io/)
/*
async function sendToFormSpree(formData) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Error al enviar formulario');
    }
    
    return await response.json();
}
*/

// ============================================
// REAL-TIME VALIDATION (OPTIONAL)
// ============================================
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        emailInput.style.borderColor = 'var(--color-error)';
    } else {
        emailInput.style.borderColor = '';
    }
});

phoneInput.addEventListener('blur', () => {
    if (phoneInput.value && !validatePhone(phoneInput. value)) {
        phoneInput. style.borderColor = 'var(--color-error)';
    } else {
        phoneInput.style.borderColor = '';
    }
});

// ============================================
// PREVENT SPAM (HONEYPOT)
// ============================================
// Add this hidden field to your HTML form (before the submit button):
// <input type="text" name="honeypot" style="display: none" tabindex="-1" autocomplete="off">

// Then check it here:
/*
const honeypot = document.querySelector('input[name="honeypot"]');
if (honeypot && honeypot.value !== '') {
    // This is likely a bot
    return;
}
*/