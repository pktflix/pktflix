import { initClock } from './utils.js';
import { initSlider } from './slider.js';

initClock('#clock');

fetch('banners.json')
  .then(res => res.json())
  .then(data => initSlider('#slider', data, 3000));

fetch('videos.json')
  .then(res => res.json())
  .then(data => {
    const movies = data.filter(v => v.type === 'movie');
    const series = data.filter(v => v.type === 'series');
    const render = (list, id) => {
      const container = document.getElementById(id);
      list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${item.thumb}"><div class="title">${item.title}</div>`;
        card.onclick = () => location.href = `video.html?id=${item.id}`;
        container.append(card);
      });
    };
    render(movies, 'movies');
    render(series, 'series');
  });
