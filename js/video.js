import { initClock } from './utils.js';
initClock('#clock');

const id = new URLSearchParams(location.search).get('id');
fetch('videos.json')
  .then(r => r.json())
  .then(data => {
    const item = data.find(v => v.id === id);
    document.querySelector('.review').textContent = item.review;
    document.querySelector('.download').href = `download.html?file=${encodeURIComponent(item.video)}`;

    const video = document.createElement('video');
    video.controls = true;
    video.style.width = '100%';
    document.getElementById('player').append(video);

    import('https://cdn.jsdelivr.net/npm/hls.js@latest').then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(item.video);
        hls.attachMedia(video);
      } else {
        video.src = item.video;
      }
    });
  });
