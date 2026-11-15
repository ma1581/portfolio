import { $, $$ } from './dom';

/** Mobile menu toggle. */
function initMobileNav(): void {
  const toggle = $<HTMLButtonElement>('.nav-toggle');
  const nav = $('#site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open: boolean): void => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

/** Highlights the nav link of the section currently in view. */
function initScrollSpy(): void {
  const links = $$<HTMLAnchorElement>('.site-nav a[href^="#"]');
  if (!('IntersectionObserver' in window) || links.length === 0) return;

  const sections = links.map((a) => $(a.getAttribute('href') ?? '')).filter((el): el is HTMLElement => el !== null);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const a of links) a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
}

export function initNavigation(): void {
  initMobileNav();
  initScrollSpy();
}
