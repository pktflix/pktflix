/* js/script.js */
const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('#categories button');
let movies = [];

fetch('assets/movies.json')
  .then(res => res.json())
  .then(data => {
    movies = data;
    displayMovies(movies);
  });

// js/script.js বা index.html এর শেষে
function updateClock() {
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    const now = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = now.toLocaleDateString('bn-BD', options);
  }
}
setInterval(updateClock, 1000);
updateClock();

function displayMovies(list) {
  movieList.innerHTML = '';
  list.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('movie');
    div.innerHTML = `
      <a href="watch.html?id=${movie.id}">
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
      </a>
    `;
    movieList.appendChild(div);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
  displayMovies(filtered);
});

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.category;
    if (cat === 'All') displayMovies(movies);
    else displayMovies(movies.filter(m => m.category === cat));
  });
});
