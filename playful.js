const header = document.querySelector('.site-head');
const navLinks = [...document.querySelectorAll('.site-head nav a')];
const sections = [...document.querySelectorAll('main > section[id]')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-25% 0px -65%' });

sections.forEach((section) => sectionObserver.observe(section));
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 18), { passive: true });

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const rail = carousel.querySelector('[data-rail]');
  const cards = [...rail.children];
  const previous = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  const count = carousel.querySelector('[data-count]');
  let activeIndex = 0;

  const twoDigits = (number) => String(number).padStart(2, '0');
  const cardStep = () => cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
  const update = () => {
    const step = Math.max(1, cardStep());
    activeIndex = Math.max(0, Math.min(cards.length - 1, Math.round(rail.scrollLeft / step)));
    count.textContent = `${twoDigits(activeIndex + 1)} / ${twoDigits(cards.length)}`;
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;
  };
  const goTo = (index) => {
    const target = Math.max(0, Math.min(cards.length - 1, index));
    rail.scrollTo({ left: cards[target].offsetLeft - rail.offsetLeft, behavior: 'smooth' });
  };

  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  rail.addEventListener('scroll', update, { passive: true });
  rail.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(activeIndex + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(activeIndex - 1); }
  });
  addEventListener('resize', update, { passive: true });
  update();
});

const imageViewer = document.querySelector('.image-viewer');
const viewerImage = imageViewer?.querySelector('img');
const viewerClose = imageViewer?.querySelector('button');

const closeViewer = () => {
  if (!imageViewer || imageViewer.hidden) return;
  imageViewer.hidden = true;
  imageViewer.setAttribute('aria-hidden', 'true');
  viewerImage.alt = '';
  document.body.classList.remove('viewer-open');
};

const openViewer = (source) => {
  if (!imageViewer || !viewerImage) return;
  viewerImage.src = source.currentSrc || source.src;
  viewerImage.alt = source.alt || '作品完整图片';
  imageViewer.hidden = false;
  imageViewer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('viewer-open');
  viewerClose?.focus();
};

document.querySelectorAll('main figure img').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `${image.alt || '作品图片'}，点击查看完整图片`);
  image.addEventListener('click', () => openViewer(image));
  image.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openViewer(image);
  });
});

viewerClose?.addEventListener('click', closeViewer);
imageViewer?.addEventListener('click', (event) => {
  if (event.target === imageViewer) closeViewer();
});
addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeViewer();
});
