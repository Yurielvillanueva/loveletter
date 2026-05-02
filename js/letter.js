// ─────────────────────────────────────────
// letter.js  —  Unlock flow & typewriter
// ─────────────────────────────────────────

const Letter = (() => {
  function initGiftFlow() {
    const openBtn = document.getElementById('gift-open-btn');
    const modal = document.getElementById('gift-modal');
    const closeBtn = document.getElementById('gift-close-btn');
    const addBtn = document.getElementById('gift-add-btn');
    const sendBtn = document.getElementById('gift-send-btn');
    const wishList = document.getElementById('wish-list');
    const closeTitle = document.getElementById('close-title');
    const closeText = document.getElementById('close-text');

    if (closeTitle) closeTitle.textContent = CONFIG.giftClosingTitle;
    if (closeText) closeText.textContent = CONFIG.giftClosingText;

    openBtn?.addEventListener('click', () => {
      modal?.classList.remove('hidden');
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    addBtn?.addEventListener('click', () => {
      if (!wishList) return;
      const count = wishList.querySelectorAll('.wish-input').length;
      if (count >= 5) return;
      const input = document.createElement('input');
      input.className = 'wish-input';
      input.type = 'text';
      input.maxLength = 120;
      input.placeholder = `Wish #${count + 1}`;
      wishList.appendChild(input);
    });

    sendBtn?.addEventListener('click', async () => {
      if (!wishList) return;
      const wishes = [...wishList.querySelectorAll('.wish-input')]
        .map(el => el.value.trim())
        .filter(Boolean);

      if (!wishes.length) return;

      const composeBody = `Hi love,\n\nHere are my wishes:\n${wishes.map((w, i) => `${i + 1}. ${w}`).join('\n')}\n\nWith love.`;
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONFIG.giftRecipientEmail)}&su=${encodeURIComponent(CONFIG.giftMailSubject)}&body=${encodeURIComponent(composeBody)}`;

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
      }

      let sent = false;
      if (CONFIG.giftAutoSend) {
        try {
          const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.giftRecipientEmail)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              _subject: CONFIG.giftMailSubject,
              message: composeBody,
              _template: 'table',
              _captcha: 'false',
            }),
          });
          sent = response.ok;
        } catch (err) {
          sent = false;
        }
      }

      if (!sent) {
        window.open(url, '_blank');
      }

      modal?.classList.add('hidden');
      Screen.show('s-close');

      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send To Gmail';
      }
    });
  }

  /** Show unlock envelope, then transition to letter */
  function goUnlock() {
    Screen.show('s-unlock');
    setTimeout(goLetter, CONFIG.unlockDuration);
  }

  /** Populate and show the letter with typewriter effect */
  function goLetter() {
    // Inject config values into DOM
    const dateEl = document.getElementById('l-date');
    const textEl = document.getElementById('l-text');
    const dearEl = document.querySelector('.letter-dear');
    const nameEl = document.querySelector('.letter-sign-name');

    if (dateEl) dateEl.textContent = CONFIG.letterDate;
    if (dearEl) dearEl.textContent = CONFIG.salutation;
    if (nameEl) nameEl.textContent = CONFIG.senderName;

    Screen.show('s-letter');

    // Typewriter
    if (textEl) {
      textEl.textContent = '';
      let i = 0;
      const body = CONFIG.letterBody;
      const interval = setInterval(() => {
        textEl.textContent += body[i];
        i++;
        if (i >= body.length) clearInterval(interval);
      }, CONFIG.typewriterSpeed);
    }
  }

  return { goUnlock, goLetter, initGiftFlow };
})();
