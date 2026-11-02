/* ============================================
   FORMULARIO DE PRESUPUESTO POR WHATSAPP
   ============================================ */

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const whatsappNumber = '5492212028885';

// ============================================
// VALIDACIÓN Y MENSAJES
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-+()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// ENVÍO A WHATSAPP
// ============================================
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const serviceSelect = document.getElementById('service');
    const formData = {
        name: sanitizeInput(document.getElementById('name').value),
        email: sanitizeInput(document.getElementById('email').value),
        phone: sanitizeInput(document.getElementById('phone').value),
        service: serviceSelect.value,
        serviceLabel: serviceSelect.selectedOptions[0].textContent.trim(),
        message: sanitizeInput(document.getElementById('message').value)
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
        showMessage('Por favor, completá todos los campos obligatorios.', 'error');
        return;
    }

    if (!validateEmail(formData.email)) {
        showMessage('Por favor, ingresá un email válido.', 'error');
        return;
    }

    if (!validatePhone(formData.phone)) {
        showMessage('Por favor, ingresá un teléfono válido.', 'error');
        return;
    }

    const whatsappMessage = [
        'Hola, quiero solicitar un presupuesto a DEG SRL.',
        '',
        `*Nombre:* ${formData.name}`,
        `*Email:* ${formData.email}`,
        `*Teléfono:* ${formData.phone}`,
        `*Servicio:* ${formData.serviceLabel}`,
        `*Consulta:* ${formData.message || 'Sin comentarios adicionales.'}`
    ].join('\n');

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML =
        '<i class="fab fa-whatsapp"></i> Abriendo WhatsApp...';

    showMessage(
        'Te estamos redirigiendo a WhatsApp para que confirmes y envíes tu solicitud.',
        'success'
    );

    setTimeout(() => {
        window.location.assign(whatsappUrl);
        submitBtn.disabled = false;
        submitBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> Quiero mi Presupuesto';
    }, 500);
});

// ============================================
// VALIDACIÓN AL SALIR DE CADA CAMPO
// ============================================
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

emailInput.addEventListener('blur', () => {
    emailInput.style.borderColor =
        emailInput.value && !validateEmail(emailInput.value)
            ? 'var(--color-error)'
            : '';
});

phoneInput.addEventListener('blur', () => {
    phoneInput.style.borderColor =
        phoneInput.value && !validatePhone(phoneInput.value)
            ? 'var(--color-error)'
            : '';
});
