import './style.css';

document.getElementById('year').textContent = new Date().getFullYear();

const targets = document.querySelectorAll(
  '.hero-media, .feature-grid li, .steps li, .steps-banner, .download-card',
);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -40px 0px' },
  );

  targets.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 60}ms`;
    element.classList.add('reveal');
    observer.observe(element);
  });
}
