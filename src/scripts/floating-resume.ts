import { $, prefersReducedMotion } from './dom';

const COLOURS = ['#5eead4', '#2563eb', '#a855f7', '#f472b6', '#fbbf24', '#ffffff'];

/** Pops the floating resume button in, and bursts confetti when it is clicked. */
export function initFloatingResume(): void {
  const fab = $<HTMLAnchorElement>('#fab');
  const label = $('#fab-label');
  if (!fab || !label) return;

  // Enter shortly after load so the hero animation gets a moment first.
  window.setTimeout(() => fab.classList.add('is-in'), prefersReducedMotion() ? 0 : 1400);

  const burst = (): void => {
    const pieces = 26;
    for (let i = 0; i < pieces; i += 1) {
      const el = document.createElement('span');
      el.className = 'confetti';
      el.style.background = COLOURS[i % COLOURS.length] ?? '#ffffff';
      fab.appendChild(el);

      const angle = (Math.PI * 2 * i) / pieces + Math.random() * 0.5;
      const distance = 70 + Math.random() * 90;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 30; // slight upward bias, then gravity
      const spin = (Math.random() - 0.5) * 900;

      const animation = el.animate(
        [
          { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${spin / 2}deg) scale(1)`, opacity: 1, offset: 0.55 },
          { transform: `translate(calc(-50% + ${dx * 1.1}px), calc(-50% + ${dy + 90}px)) rotate(${spin}deg) scale(0.6)`, opacity: 0 },
        ],
        { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' },
      );
      animation.onfinish = () => el.remove();
    }
  };

  let reset: number | undefined;
  fab.addEventListener('click', () => {
    // The browser performs the download; this only adds the celebration.
    if (!prefersReducedMotion()) burst();
    label.textContent = 'Saved ✓';
    fab.classList.add('is-busy');
    window.clearTimeout(reset);
    reset = window.setTimeout(() => {
      label.textContent = 'Resume';
      fab.classList.remove('is-busy');
    }, 2200);
  });
}
