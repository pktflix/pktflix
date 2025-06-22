fetch('tv.json')
  .then(res => res.json())
  .then(banners => {
    const bannerSlider = document.getElementById('bannerSlider');
    banners.forEach(banner => {
      const a = document.createElement('a');
      a.href = banner.link;
      a.target = "_blank";
      a.innerHTML = `<img src="${banner.image}" alt="${banner.title}" />`;
      bannerSlider.appendChild(a);
    });
  });

fetch('videos.json')
  .then(res => res.json())
  .then(data => {
    const movies = data.filter(item => item.type === 'movie').slice(0, 20);
    const series = data.filter(item => item.type === 'series').slice(0, 10);

    const movieList = document.getElementById('movieList');
    const seriesList = document.getElementById('seriesList');

    movies.forEach(video => {
      movieList.innerHTML += `
        <a href="watch.html?id=${video.id}" class="video-card">
          <img src="${video.thumbnail}" alt="${video.title}" />
          <h3>${video.title}</h3>
        </a>`;
    });

    series.forEach(video => {
      seriesList.innerHTML += `
        <a href="watch.html?id=${video.id}" class="video-card">
          <img src="${video.thumbnail}" alt="${video.title}" />
          <h3>${video.title}</h3>
        </a>`;
    });
  });
