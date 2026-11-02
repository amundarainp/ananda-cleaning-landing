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
