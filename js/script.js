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