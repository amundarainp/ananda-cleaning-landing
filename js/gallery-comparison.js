/* ============================================
   COMPARADORES ANTES / DESPUÉS
   ============================================ */

document.querySelectorAll('.comparison-media').forEach((comparison) => {
  const range = comparison.querySelector('.comparison-range');
  if (!range) return;
  const updatePosition = () => {
    comparison.style.setProperty('--position', range.value + '%');
  };
  range.addEventListener('input', updatePosition);
  updatePosition();
});


/* ============================================
   CARRUSEL DE TRABAJOS
   ============================================ */
(() => {
  const viewport = document.querySelector('.work-carousel-viewport');
  if (!viewport) return;

  const slides = [...viewport.querySelectorAll('.work-slide')];
  const prev = document.querySelector('.work-carousel-prev');
  const next = document.querySelector('.work-carousel-next');
  const current = document.getElementById('work-current');
  const progress = document.querySelector('.work-carousel-progress span');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 0;
  let autoplay;

  const visibleCount = () => {
    if (window.innerWidth <= 580) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const nearestIndex = () => {
    const viewportLeft = viewport.getBoundingClientRect().left;
    let bestIndex = 0;
    let bestDistance = Infinity;
    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - viewportLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    return bestIndex;
  };

  const updateStatus = () => {
    active = nearestIndex();
    if (current) current.textContent = String(active + 1).padStart(2, '0');
    if (progress) {
      const maxIndex = Math.max(1, slides.length - visibleCount());
      progress.style.transform = 'scaleX(' + Math.min(1, (active + 1) / (maxIndex + 1)) + ')';
    }
  };

  const goTo = (index) => {
    const maxStart = Math.max(0, slides.length - visibleCount());
    active = index > maxStart ? 0 : index < 0 ? maxStart : index;
    slides[active].scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  const stopAutoplay = () => window.clearInterval(autoplay);
  const startAutoplay = () => {
    stopAutoplay();
    if (!reducedMotion) autoplay = window.setInterval(() => goTo(active + 1), 5000);
  };

  prev?.addEventListener('click', () => { goTo(nearestIndex() - 1); startAutoplay(); });
  next?.addEventListener('click', () => { goTo(nearestIndex() + 1); startAutoplay(); });
  viewport.addEventListener('scroll', () => window.requestAnimationFrame(updateStatus), { passive: true });
  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);
  viewport.addEventListener('focusin', stopAutoplay);
  viewport.addEventListener('focusout', startAutoplay);
  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(nearestIndex() - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(nearestIndex() + 1); }
  });
  window.addEventListener('resize', updateStatus);

  updateStatus();
  startAutoplay();
})();
