export function initSlider(selector, banners, interval) {
  const container = document.querySelector(selector);
  banners.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = `slide${i === 0 ? ' active' : ''}`;
    slide.innerHTML = `<img src="${item.image}" style="width:100%;height:100%;">`;
    slide.onclick = () => window.location = item.link;
    container.append(slide);
  });

  let index = 0;
  const slides = container.querySelectorAll('.slide');
  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, interval);
}
