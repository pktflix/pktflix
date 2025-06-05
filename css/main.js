function $(id) { return document.getElementById(id); }

let allMovies = [];

fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    renderMovies();
    setupCategories();
  });

function renderMovies() {
  const popular = allMovies.slice(0, 5);
  const recent = allMovies.slice(-5).reverse();
  const series = allMovies.filter(m => m.type === 'series').slice(0, 15);

  display(popular, 'popular');
  display(recent, 'recent');
  display(series, 'series');
}

function display(movies, elementId) {
  const container = $(elementId);
  container.innerHTML = movies.map(movie => `
    <div class="movie-card" onclick="location.href='watch.html?id=${movie.id}'">
      <img src="${movie.poster}" alt="${movie.title}" />
      <p>${movie.title}</p>
    </div>
  `).join('');
}

function setupCategories() {
  const cats = [...new Set(allMovies.map(m => m.category))];
  const catDiv = $('categories');
  catDiv.innerHTML = cats.map(cat => `<button onclick="filterByCategory('${cat}')">${cat}</button>`).join('');
}

function filterByCategory(cat) {
  const filtered = allMovies.filter(m => m.category === cat);
  display(filtered, 'filtered');
}

$('searchInput').addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const results = allMovies.filter(m => m.title.toLowerCase().includes(keyword));
  display(results, 'filtered');
});

setInterval(() => {
  const now = new Date();
  $('datetime').innerText = now.toLocaleString();
}, 1000);
