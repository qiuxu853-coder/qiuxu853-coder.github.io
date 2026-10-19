const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('#site-nav a');

const closeMenu = () => {
  header?.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
};

menuButton?.addEventListener('click', () => {
  const open = !header.classList.contains('menu-open');
  header.classList.toggle('menu-open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });

const tabs = [...document.querySelectorAll('.experience-tab')];
const panels = [...document.querySelectorAll('.experience-panel')];
const activateExperience = (name, focus = false) => {
  tabs.forEach(tab => {
    const active = tab.dataset.exp === name;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  panels.forEach(panel => {
    const active = panel.dataset.panel === name;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });
};
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateExperience(tab.dataset.exp));
  tab.addEventListener('keydown', event => {
    if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    activateExperience(tabs[next].dataset.exp, true);
  });
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('is-active', item === button));
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
  });
}));

document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => document.getElementById(button.dataset.dialog)?.showModal());
});
document.querySelectorAll('.media-dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });
});

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const rail = carousel.querySelector('[data-rail]');
  const items = [...(rail?.children || [])];
  const count = carousel.querySelector('[data-count]');
  const previous = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  if (!rail || !items.length) return;

  const currentIndex = () => items.reduce((nearest, item, index) => {
    const currentDistance = Math.abs(item.offsetLeft - rail.scrollLeft);
    const nearestDistance = Math.abs(items[nearest].offsetLeft - rail.scrollLeft);
    return currentDistance < nearestDistance ? index : nearest;
  }, 0);

  const updateCarousel = () => {
    const index = currentIndex();
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    if (previous) previous.disabled = rail.scrollLeft <= 2;
    if (next) next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  };

  const moveTo = delta => {
    const target = Math.max(0, Math.min(items.length - 1, currentIndex() + delta));
    rail.scrollTo({ left: items[target].offsetLeft, behavior: 'smooth' });
  };

  previous?.addEventListener('click', () => moveTo(-1));
  next?.addEventListener('click', () => moveTo(1));
  let carouselFrame;
  rail.addEventListener('scroll', () => {
    cancelAnimationFrame(carouselFrame);
    carouselFrame = requestAnimationFrame(updateCarousel);
  }, { passive: true });
  window.addEventListener('resize', updateCarousel, { passive: true });
  updateCarousel();
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

