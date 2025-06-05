let allMovies = [];

async function loadMovies() {
  const res = await fetch('movies.json');
  allMovies = await res.json();
  displayMovies(allMovies);
}

function displayMovies(movies) {
  const list = document.getElementById('movieList');
  list.innerHTML = '';
  movies.forEach(movie => {
    list.innerHTML += `
      <div class="movie-card">
        <img src="${movie.poster}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <div class="buttons">
          <a href="watch.html?video=${movie.video}" class="btn watch">▶️ Watch</a>
          <a href="${movie.video}" download class="btn download">⬇️ Download</a>
        </div>
      </div>
    `;
  });
}

document.getElementById('searchInput').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(keyword));
  displayMovies(filtered);
});

document.getElementById('categoryFilter').addEventListener('change', function () {
  const selected = this.value;
  const filtered = selected === "All" ? allMovies : allMovies.filter(movie => movie.category === selected);
  displayMovies(filtered);
});

loadMovies();
