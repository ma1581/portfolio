import { $ } from './dom';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/** Validates and submits the contact form to Formspree without leaving the page. */
export function initContactForm(): void {
  const form = $<HTMLFormElement>('#contact-form');
  const status = $('#form-status');
  const submit = $<HTMLButtonElement>('#form-submit');
  if (!form || !status || !submit) return;

  const setStatus = (message: string, kind: '' | 'is-error' | 'is-ok'): void => {
    status.textContent = message;
    status.className = `form-status ${kind}`.trim();
  };

  const mark = (field: HTMLInputElement | HTMLTextAreaElement, valid: boolean): void => {
    field.parentElement?.classList.toggle('has-error', !valid);
    field.setAttribute('aria-invalid', String(!valid));
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const message = form.elements.namedItem('message') as HTMLTextAreaElement;

    const okName = name.value.trim().length > 0;
    const okEmail = EMAIL_PATTERN.test(email.value.trim());
    const okMessage = message.value.trim().length > 0;
    mark(name, okName);
    mark(email, okEmail);
    mark(message, okMessage);

    if (!(okName && okEmail && okMessage)) {
      setStatus('Please add your name, a valid email and a message.', 'is-error');
      return;
    }

    submit.disabled = true;
    setStatus('Sending…', '');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus("Message sent. Thank you! I'll get back to you soon.", 'is-ok');
    } catch {
      setStatus('Sorry, that did not go through. Please email me directly instead.', 'is-error');
    } finally {
      submit.disabled = false;
    }
  });
}
