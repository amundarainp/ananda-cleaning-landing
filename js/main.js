/* ============================================
   ANANDA SRL - MAIN JAVASCRIPT
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');

// Testimonials
const testimonialCards = document.querySelectorAll('. testimonial-card');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const sliderDots = document.getElementById('slider-dots');

// ============================================
// STICKY HEADER ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList. add('scrolled');
        backToTopBtn.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        backToTopBtn. classList.remove('visible');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList. remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList. remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================
let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

// Create dots
for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    sliderDots.appendChild(dot);
}

const dots = document.querySelectorAll('. dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card. classList.remove('active');
    });
    
    // Show current testimonial
    testimonialCards[index].classList.add('active');
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
}

// Event listeners for slider buttons
nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-play testimonials (optional)
let autoPlayInterval = setInterval(nextTestimonial, 5000);

// Pause auto-play on hover
const testimonialSlider = document.getElementById('testimonials-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextTestimonial, 5000);
});

// ============================================
// SCROLL ANIMATIONS (FADE IN)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const animateOnScroll = document.querySelectorAll(`
    . service-card,
    .feature-card,
    .gallery-item,
    .info-card,
    .about-text,
    .about-image
`);

animateOnScroll.forEach(el => {
    el.classList. add('fade-in');
    observer.observe(el);
});

// ============================================
// LAZY LOADING IMAGES (when you add real images)
// ============================================
// Uncomment this when you add real images with data-src attribute
/*
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry. target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
*/

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🌸 ANANDA SRL Cleaning', 'font-size: 20px; color: #2C4251; font-weight: bold;');
console.log('%cSitio web desarrollado con ❤️', 'font-size: 14px; color: #5A8CA7;');

// ============================================
// PREVENT SCROLL RESTORATION ON PAGE RELOAD
// ============================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});