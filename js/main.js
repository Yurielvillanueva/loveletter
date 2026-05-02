// ─────────────────────────────────────────
// main.js  —  App entry point
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Inject recipient name into PIN screen title
  const titleEl = document.querySelector('.pin-title');
  if (titleEl) titleEl.textContent = `For ${CONFIG.recipientName}`;

  // Init PIN controls
  Pin.init();
  Letter.initGiftFlow();

  // Auto-advance from loading → PIN after delay
  setTimeout(() => Screen.show('s-pin'), CONFIG.loadingDuration);
});
