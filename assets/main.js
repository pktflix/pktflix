document.addEventListener("DOMContentLoaded", () => {
  const datetime = document.getElementById("datetime");
  setInterval(() => {
    const now = new Date();
    datetime.textContent = now.toLocaleString("en-GB");
  }, 1000);

  const searchInput = document.getElementById("searchInput");
  const categories = document.querySelectorAll(".category");

  let movies = [];

  fetch("assets/movies.json")
    .then(res => res.json())
    .then(data => {
      movies = data;
      renderMovies("popularMovies", movies.slice(0, 6));
      renderMovies("recentMovies", movies.slice().reverse().slice(0, 6));
      renderMovies("webSeries", movies.slice(0, 3)); // replace with actual web series logic
    });

  function renderMovies(containerId, movieList) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    movieList.forEach(movie => {
      const img = document.createElement("img");
      img.src = movie.poster;
      img.alt = movie.name;
      img.addEventListener("click", () => {
        localStorage.setItem("selectedMovie", JSON.stringify(movie));
        window.location.href = "watch.html";
      });
      container.appendChild(img);
    });
  }

  searchInput.addEventListener("input", e => {
    const val = e.target.value.toLowerCase();
    const filtered = movies.filter(m => m.name.toLowerCase().includes(val));
    renderMovies("popularMovies", filtered);
  });

  categories.forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;
      if (cat === "All") {
        renderMovies("popularMovies", movies);
      } else {
        const filtered = movies.filter(m => m.category === cat);
        renderMovies("popularMovies", filtered);
      }
    });
  });
});
