function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const link = decodeURIComponent(getParam('link'));
let countdown = 10;
const timerEl = document.getElementById('timer');
const finalLink = document.getElementById('finalLink');

const interval = setInterval(() => {
  countdown--;
  timerEl.innerText = countdown;
  if (countdown === 0) {
    clearInterval(interval);
    finalLink.innerHTML = `<a href="${link}" class="download-btn" download>Click here to download</a>`;
  }
}, 1000);
