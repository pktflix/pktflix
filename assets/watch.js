document.addEventListener("DOMContentLoaded", () => {
  const datetime = document.getElementById("datetime");
  setInterval(() => {
    const now = new Date();
    datetime.textContent = now.toLocaleString("en-GB");
  }, 1000);

  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (!movie) {
    document.body.innerHTML = "<h2 style='padding:20px;'>No movie selected.</h2>";
    return;
  }

  document.getElementById("movieName").textContent = movie.name;
  document.getElementById("movieTitle").textContent = movie.name;
  document.getElementById("moviePoster").src = movie.poster;
  document.getElementById("movieReview").textContent = movie.review;

  // View Count
  const countKey = `viewCount_${movie.id}`;
  let views = localStorage.getItem(countKey) || 0;
  views++;
  localStorage.setItem(countKey, views);
  document.getElementById("viewCount").textContent = `👁 Viewed: ${views}`;

  // Video Player
  const player = document.getElementById("cleppr");
  player.src = movie.video;

  // Download
  document.getElementById("downloadBtn").addEventListener("click", () => {
    localStorage.setItem("downloadMovie", JSON.stringify(movie));
    window.location.href = "download.html";
  });
});
