// ─────────────────────────────────────────
// screen.js  —  Screen transition manager
// ─────────────────────────────────────────

const Screen = {
  /**
   * Show a screen by ID, hide all others.
   * @param {string} id - The screen element ID (e.g. 's-pin')
   */
  show(id) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.add('hidden');
      s.classList.remove('active');
    });
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('active');
      // Start pulse animation when PIN screen is shown
      if (id === 's-pin') {
        const lock = el.querySelector('.heart-lock');
        el.classList.remove('pin-opening');
        void el.offsetWidth;
        el.classList.add('pin-opening');
        lock?.classList.add('pulse');
      }
    }
  },
};
