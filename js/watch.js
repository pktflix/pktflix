function getParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    const id = getParam('id');
    const movie = data.find(m => m.id === id);
    if (movie) {
      document.getElementById('title').innerText = movie.title;
      document.getElementById('review').innerText = movie.review;
      const video = document.getElementById('video');
      if (Hls.isSupported() && movie.video.endsWith('.m3u8')) {
        const hls = new Hls();
        hls.loadSource(movie.video);
        hls.attachMedia(video);
      } else {
        video.src = movie.video;
      }
      document.getElementById('downloadBtn').href = `download.html?link=${encodeURIComponent(movie.video)}`;
    }
  });
