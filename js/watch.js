/* js/watch.js */
const params = new URLSearchParams(window.location.search);
const movieId = parseInt(params.get('id'));

fetch('assets/movies.json')
  .then(res => res.json())
  .then(data => {
    const movie = data.find(m => m.id === movieId);
    if (movie) {
      document.getElementById('movie-title').textContent = movie.title;
      document.getElementById('movie-poster').src = movie.poster;
      document.getElementById('movie-player').src = movie.video;
      document.getElementById('view-count').textContent = `👁️ ${movie.views} বার দেখা হয়েছে`;
      document.getElementById('review-box').textContent = movie.review;
      document.getElementById('download-btn').href = `download.html?id=${movie.id}`;

      const related = data.filter(m => m.category === movie.category && m.id !== movie.id);
      const relatedDiv = document.getElementById('related-movies');
      related.forEach(r => {
        const el = document.createElement('div');
        el.innerHTML = `<a href="watch.html?id=${r.id}">${r.title}</a>`;
        relatedDiv.appendChild(el);
      });
    }
  });
