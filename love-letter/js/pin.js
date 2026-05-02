// ─────────────────────────────────────────
// pin.js  —  PIN digit spinner & validation
// ─────────────────────────────────────────

const Pin = (() => {
  function getInputValue() {
    const input = document.getElementById('pin-input');
    return input ? input.value.replace(/\D/g, '').slice(0, 4) : '';
  }

  /** Check if entered PIN matches config */
  function check() {
    const pin = getInputValue();
    return pin.length === 4 && pin === CONFIG.pin.join('');
  }

  /** Show the wrong PIN error message briefly */
  function showError() {
    const err = document.getElementById('pin-error');
    const lock = document.querySelector('.heart-lock');
    if (lock) {
      lock.classList.remove('pulse');
      lock.classList.add('shake');
      setTimeout(() => lock.classList.remove('shake'), 340);
    }
    if (!err) return;
    err.classList.add('show');
    setTimeout(() => err.classList.remove('show'), 2000);
  }

  function tryUnlock() {
    if (check()) {
      const lock = document.querySelector('.heart-lock');
      lock?.classList.remove('pulse');
      lock?.classList.add('unlocking');
      setTimeout(() => {
        Letter.goUnlock();
        lock?.classList.remove('unlocking');
      }, 700);
    } else {
      showError();
    }
  }

  /** Attach input and enter button events */
  function init() {
    const input = document.getElementById('pin-input');
    if (input) {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 4);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          tryUnlock();
        }
      });
    }

    document.getElementById('enter-btn')?.addEventListener('click', tryUnlock);
  }

  return { init, check, showError };
})();
