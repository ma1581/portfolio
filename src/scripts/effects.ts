import { $, $$, prefersReducedMotion } from './dom';

/** Fades sections and cards in as they scroll into view. */
function initReveal(): void {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  items.forEach((el) => observer.observe(el));
}

/** Cursor-following glow in the hero. */
function initSpotlight(): void {
  const hero = $('.hero');
  const spot = $('.spotlight');
  if (!hero || !spot || prefersReducedMotion()) return;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    spot.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    spot.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}

/** Rotates the phrase after "I build". */
function initRoles(): void {
  const roles = $$('#roles .role');
  if (roles.length < 2 || prefersReducedMotion()) return;
  let index = 0;
  window.setInterval(() => {
    roles[index]?.classList.remove('is-on');
    index = (index + 1) % roles.length;
    roles[index]?.classList.add('is-on');
  }, 2600);
}

/** Counts numbers up from zero when they scroll into view. */
function initCounters(): void {
  const counters = $$('[data-count]');
  if (!('IntersectionObserver' in window)) return;

  const run = (el: HTMLElement): void => {
    const end = Number.parseInt(el.dataset.count ?? '0', 10);
    if (prefersReducedMotion()) {
      el.textContent = String(end);
      return;
    }
    const duration = 1400;
    let start: number | null = null;
    el.textContent = '0';
    const step = (ts: number): void => {
      start ??= ts;
      const t = Math.min(1, (ts - start) / duration);
      el.textContent = String(Math.round(end * (1 - (1 - t) ** 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => observer.observe(el));
}

export function initEffects(): void {
  initReveal();
  initSpotlight();
  initRoles();
  initCounters();
}
