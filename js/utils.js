export function initClock(selector) {
  const el = document.querySelector(selector);
  setInterval(() => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('bn-BD') + ' | ' + now.toLocaleDateString('bn-BD');
  }, 1000);
}
