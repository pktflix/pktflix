/* js/download.js */ const dParams = new URLSearchParams(window.location.search); const dId = parseInt(dParams.get('id')); const timerEl = document.getElementById('timer'); const downloadLink = document.getElementById('real-download-link');

let countdown = 10; timerEl.textContent = countdown;

const interval = setInterval(() => { countdown--; timerEl.textContent = countdown; if (countdown <= 0) { clearInterval(interval); fetch('assets/movies.json') .then(res => res.json()) .then(data => { const movie = data.find(m => m.id === dId); if (movie) { downloadLink.href = movie.video; downloadLink.style.display = 'inline-block'; } }); } }, 1000);

// Add style and animation on load document.addEventListener('DOMContentLoaded', () => { const title = document.createElement('h2'); title.textContent = 'ডাউনলোড লিংক প্রস্তুত হচ্ছে...'; title.classList.add('download-title'); document.body.prepend(title); });

/* Add the following CSS to your style.css or in a <style> tag in download.html:

.download-title { text-align: center; font-size: 24px; color: #fff; margin: 20px auto; animation: pulseText 1.2s infinite; }

#real-download-link { display: none; padding: 15px 30px; background: linear-gradient(135deg, #00c9ff, #92fe9d); color: #000; font-weight: bold; border-radius: 10px; font-size: 18px; text-decoration: none; text-align: center; transition: transform 0.3s ease; margin: 30px auto; }

#real-download-link:hover { transform: scale(1.1); }

@keyframes pulseText { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } } */

