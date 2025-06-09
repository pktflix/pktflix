import { initClock } from './utils.js';
initClock('#clock');

let time = 10;
const timerEl = document.getElementById('timer');
const downloadEl = document.getElementById('real-link');
const file = new URLSearchParams(location.search).get('file');
downloadEl.href = file;

const interval = setInterval(() => {
  timerEl.textContent = time;
  time--;
  if (time < 0) {
    clearInterval(interval);
    timerEl.style.display = 'none';
    downloadEl.style.display = 'block';
  }
}, 1000);
