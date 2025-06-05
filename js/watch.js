function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

fetch("movies.json")
  .then(res => res.json())
  .then(data => {
    const id = getParam("id");
    const movie = data.find(m => m.id === id);
    if (!movie) return;

    document.getElementById("title").innerText = movie.title;
    document.getElementById("poster").src = movie.poster;
    document.getElementById("review").innerText = movie.review;
    document.getElementById("tags").innerText = `🎯 Genre: ${movie.category}`;
    document.title = `${movie.title} | PKT Flix`;
    document.getElementById("downloadBtn").href = `download.html?link=${encodeURIComponent(movie.video)}`;

    // Video Load
    const video = document.getElementById("video");
    if (Hls.isSupported() && movie.video.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(movie.video);
      hls.attachMedia(video);
    } else {
      video.src = movie.video;
    }

    // View Count (localStorage based)
    const viewKey = `viewed-${id}`;
    let views = localStorage.getItem(viewKey) ? parseInt(localStorage.getItem(`${viewKey}-count`)) : 0;
    if (!localStorage.getItem(viewKey)) {
      views += Math.floor(Math.random() * 20) + 1;
      localStorage.setItem(viewKey, "true");
      localStorage.setItem(`${viewKey}-count`, views);
    }
    document.getElementById("viewCount").innerText = `👁️ ${views.toLocaleString()} views`;

    // Related
    const related = data.filter(m => m.category === movie.category && m.id !== movie.id).slice(0, 4);
    const relatedContainer = document.getElementById("related");
    related.forEach(r => {
      const div = document.createElement("div");
      div.className = "related-item";
      div.innerHTML = `<a href="watch.html?id=${r.id}"><img src="${r.poster}" alt="${r.title}" /><p>${r.title}</p></a>`;
      relatedContainer.appendChild(div);
    });

    // Watch Later
    document.getElementById("watchLaterBtn").addEventListener("click", () => {
      let saved = JSON.parse(localStorage.getItem("watchLater") || "[]");
      if (!saved.find(m => m.id === movie.id)) {
        saved.push({ id: movie.id, title: movie.title, poster: movie.poster });
        localStorage.setItem("watchLater", JSON.stringify(saved));
        alert("✅ Added to Watch Later");
      }
    });

    // Rating
    const starsContainer = document.getElementById("stars");
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.innerHTML = "⭐";
      star.style.cursor = "pointer";
      star.onclick = () => {
        localStorage.setItem(`rating-${id}`, i);
        highlightStars(i);
      };
      starsContainer.appendChild(star);
    }
    const savedRating = localStorage.getItem(`rating-${id}`);
    if (savedRating) highlightStars(savedRating);

    function highlightStars(count) {
      const stars = starsContainer.querySelectorAll("span");
      stars.forEach((s, i) => {
        s.style.color = i < count ? "gold" : "gray";
      });
    }
  });
