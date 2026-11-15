import { $, $$, prefersReducedMotion } from './dom';

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Types out the hero terminal one command at a time. */
export function initTerminal(): void {
  const term = $('#term');
  if (!term) return;

  const lines = $$('.term-line', term);
  const prompt = $('.term-prompt', term);
  const replay = $<HTMLButtonElement>('.term-replay', term);
  if (!prompt) return;

  let timer: number | undefined;

  const renderLine = (line: HTMLElement, typed: string, withOutput: boolean, cursor: boolean): void => {
    const out = withOutput ? `<span class="out">${escapeHtml(line.dataset.out ?? '')}</span>` : '';
    line.innerHTML = `<span class="p">$ </span><span>${escapeHtml(typed)}</span>${cursor ? '<span class="cursor"></span>' : ''}${out}`;
  };

  const showAll = (): void => {
    lines.forEach((line) => renderLine(line, line.dataset.cmd ?? '', true, false));
    prompt.hidden = false;
    if (replay) replay.hidden = false;
  };

  const run = (): void => {
    window.clearTimeout(timer);
    lines.forEach((line) => (line.innerHTML = ''));
    prompt.hidden = true;
    if (replay) replay.hidden = true;

    let lineIndex = 0;
    let charIndex = 0;

    const tick = (): void => {
      const line = lines[lineIndex];
      if (!line) {
        prompt.hidden = false;
        if (replay) replay.hidden = false;
        return;
      }
      const cmd = line.dataset.cmd ?? '';
      if (charIndex <= cmd.length) {
        renderLine(line, cmd.slice(0, charIndex), false, charIndex < cmd.length);
        charIndex += 1;
        timer = window.setTimeout(tick, 70);
      } else {
        renderLine(line, cmd, true, false);
        lineIndex += 1;
        charIndex = 0;
        timer = window.setTimeout(tick, 260);
      }
    };
    tick();
  };

  if (prefersReducedMotion()) showAll();
  else window.setTimeout(run, 700);
  replay?.addEventListener('click', run);
}
