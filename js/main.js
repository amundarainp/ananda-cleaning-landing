/* ============================================
   ANANDA SRL - MAIN JAVASCRIPT
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu =
  document.getElementById("nav-menu") || document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("back-to-top");
const floatingCta = document.getElementById("floating-cta");
const floatingSocial = document.getElementById("floating-social");

// Hero A/B test
const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroPrimaryCta = document.getElementById("hero-primary-cta");
const heroSecondaryCta = document.getElementById("hero-secondary-cta");

// Testimonials
const testimonialCards = document.querySelectorAll(".testimonial-card");
const prevBtn = document.getElementById("prev-testimonial");
const nextBtn = document.getElementById("next-testimonial");
const sliderDots = document.getElementById("slider-dots");

// ============================================
// STICKY HEADER ON SCROLL
// ============================================
window.addEventListener("scroll", () => {
  if (!header || !backToTopBtn) return;

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    backToTopBtn.classList.add("visible");
  } else {
    header.classList.remove("scrolled");
    backToTopBtn.classList.remove("visible");
  }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });
}

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active");
    if (navMenu) navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

// Close menu when clicking outside
if (hamburger && navMenu) {
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// ============================================
// HERO A/B TEST (copy + CTA)
// ============================================
const heroVariants = {
  a: {
    title:
      'Limpieza Profesional con <span class="highlight">Confianza</span> y Resultados',
    subtitle:
      "Servicios para consorcios, edificios y empresas con personal capacitado, supervisión constante y cumplimiento en cada visita.",
    primaryCta: "Solicitar Presupuesto",
    secondaryCta: "Ver Soluciones",
  },
  b: {
    title:
      'Tu Edificio en Manos de un Equipo <span class="highlight">Confiable</span>',
    subtitle:
      "Creamos planes de limpieza a medida para consorcios y empresas, con seguimiento continuo y respuesta rápida.",
    primaryCta: "Pedir Cotización Ahora",
    secondaryCta: "Conocer Servicios",
  },
};

function applyHeroVariant() {
  if (!heroTitle || !heroSubtitle || !heroPrimaryCta || !heroSecondaryCta) {
    return;
  }

  let variant = "a";

  try {
    const savedVariant = localStorage.getItem("ananda_hero_variant");
    if (savedVariant === "a" || savedVariant === "b") {
      variant = savedVariant;
    } else {
      variant = Math.random() < 0.5 ? "a" : "b";
      localStorage.setItem("ananda_hero_variant", variant);
    }
  } catch {
    variant = Math.random() < 0.5 ? "a" : "b";
  }

  const selectedVariant = heroVariants[variant];
  heroTitle.innerHTML = selectedVariant.title;
  heroSubtitle.textContent = selectedVariant.subtitle;
  heroPrimaryCta.innerHTML = `<i class="fas fa-envelope"></i> ${selectedVariant.primaryCta}`;
  heroSecondaryCta.innerHTML = `<i class="fas fa-arrow-down"></i> ${selectedVariant.secondaryCta}`;
}

applyHeroVariant();

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update active link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// ============================================
// ACTIVE LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

// Create dots
if (sliderDots && totalTestimonials > 0) {
  for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToTestimonial(i));
    sliderDots.appendChild(dot);
  }
}

const dots = document.querySelectorAll(".dot");

function showTestimonial(index) {
  if (!testimonialCards.length || !dots.length) return;

  // Hide all testimonials
  testimonialCards.forEach((card) => {
    card.classList.remove("active");
  });

  // Show current testimonial
  testimonialCards[index].classList.add("active");

  // Update dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
  showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
  currentTestimonial = index;
  showTestimonial(currentTestimonial);
}

// Event listeners for slider buttons
if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);
if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);

// Auto-play testimonials (optional)
let autoPlayInterval;
if (testimonialCards.length > 1) {
  autoPlayInterval = setInterval(nextTestimonial, 5000);
}

// Pause auto-play on hover
const testimonialSlider = document.getElementById("testimonials-slider");
if (testimonialSlider && autoPlayInterval) {
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(autoPlayInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(nextTestimonial, 5000);
  });
}

// ============================================
// SCROLL ANIMATIONS (FADE IN)
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements
const animateOnScroll = document.querySelectorAll(`
    .service-card,
    .feature-card,
    .gallery-item,
    .info-card,
    .about-text,
    .about-image
`);

animateOnScroll.forEach((el) => {
  el.classList.add("fade-in");
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
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
*/

// ============================================
// FLOATING CTA BUTTON - Show after 2 seconds of no scroll
// ============================================
let scrollTimeout;
let ctaShown = false;

function showFloatingCta() {
  if (!ctaShown && (floatingCta || floatingSocial)) {
    if (floatingCta) {
      floatingCta.classList.add("visible");
    }
    if (floatingSocial) {
      floatingSocial.classList.add("visible");
    }
    ctaShown = true;
  }
}

function handleScrollForCta() {
  // Clear the previous timeout
  clearTimeout(scrollTimeout);

  // Set a new timeout to show the button after 2 seconds of no scrolling
  scrollTimeout = setTimeout(() => {
    showFloatingCta();
  }, 2000);
}

// Listen to scroll events
window.addEventListener("scroll", handleScrollForCta);

// Also show after 2 seconds on page load if user doesn't scroll
window.addEventListener("load", () => {
  setTimeout(() => {
    showFloatingCta();
  }, 2000);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(
  "%c🌸 ANANDA SRL Cleaning",
  "font-size: 20px; color: #2C4251; font-weight: bold;",
);
console.log(
  "%cSitio web desarrollado con ❤️",
  "font-size: 14px; color: #5A8CA7;",
);

// ============================================
// PREVENT SCROLL RESTORATION ON PAGE RELOAD
// ============================================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Scroll to top on page load
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
