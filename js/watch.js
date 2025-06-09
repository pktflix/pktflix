const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("videos.json")
  .then(res => res.json())
  .then(data => {
    const movie = data.find(item => item.id === id);
    if (movie) {
      document.getElementById("movieTitle").innerText = movie.title;
      document.getElementById("poster").src = movie.thumbnail;
      document.getElementById("reviewBox").innerText = movie.description;
      // এবং ভিডিও প্লে করুন...
    }
  });
