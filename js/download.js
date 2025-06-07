/* js/download.js */ const dParams = new URLSearchParams(window.location.search); const dId = parseInt(dParams.get('id')); const timerEl = document.getElementById('timer'); const downloadLink = document.getElementById('real-download-link');

let countdown = 10; timerEl.textContent = countdown;

const interval = setInterval(() => { countdown--; timerEl.textContent = countdown; if (countdown <= 0) { clearInterval(interval); fetch('assets/movies.json') .then(res => res.json()) .then(data => { const movie = data.find(m => m.id === dId); if (movie) { downloadLink.href = movie.video; downloadLink.style.display = 'block'; } }); } }, 1000);

