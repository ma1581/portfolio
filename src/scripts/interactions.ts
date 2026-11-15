import { $, $$ } from './dom';

/** Experience accordion: closed by default, and only one item can be open at a time. */
function initAccordion(): void {
  const buttons = $$<HTMLButtonElement>('.acc-btn');

  const setOpen = (btn: HTMLButtonElement, open: boolean): void => {
    btn.setAttribute('aria-expanded', String(open));
    btn.closest('.acc-item')?.classList.toggle('is-open', open);
    document.getElementById(btn.getAttribute('aria-controls') ?? '')?.classList.toggle('is-open', open);
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      if (open) {
        const group = btn.closest('.acc');
        buttons.filter((other) => other !== btn && other.closest('.acc') === group).forEach((other) => setOpen(other, false));
      }
      setOpen(btn, open);
    });
  });
}

/** "View details" toggles on the project cards. */
function initProjectDetails(): void {
  $$<HTMLButtonElement>('.more-btn').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls') ?? '');
    const label = $('.more-label', btn);
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Hide details' : 'View details';
      panel?.classList.toggle('is-open', open);
    });
  });
}

/** Skills filter. */
function initSkillFilter(): void {
  const buttons = $$<HTMLButtonElement>('.filter');
  const chips = $$('.chip');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter ?? 'all';
      buttons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      chips.forEach((chip) => {
        chip.hidden = !(category === 'all' || chip.dataset.cat === category);
      });
    });
  });
}

/** Digital visiting card: flip + copy email. */
function initCard(): void {
  const flip = $('#flip');
  const flipBtn = $<HTMLButtonElement>('#flip-btn');
  flipBtn?.addEventListener('click', () => {
    const on = flip?.classList.toggle('is-flipped') ?? false;
    flipBtn.setAttribute('aria-pressed', String(on));
  });

  const copyBtn = $<HTMLButtonElement>('#copy-btn');
  if (!copyBtn) return;
  let reset: number | undefined;
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email ?? '';
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = 'Copied ✓';
      window.clearTimeout(reset);
      reset = window.setTimeout(() => (copyBtn.textContent = 'Copy email'), 2000);
    } catch {
      // Clipboard not available (older browser, insecure context): fall back to a mail link.
      window.location.href = `mailto:${email}`;
    }
  });
}

export function initInteractions(): void {
  initAccordion();
  initProjectDetails();
  initSkillFilter();
  initCard();
}
