import { $, $$ } from './dom';

/**
 * Digital card downloads.
 *
 * The card is drawn onto a <canvas> from the same data that renders it on the page,
 * so the PNG, the PDF and the on-screen card never drift apart. No libraries needed.
 */

interface CardData {
  name: string;
  title: string;
  company: string;
  frontLeft: string;
  frontRight: string;
  backLines: string[];
  photo: string;
  fileBase: string;
}

type Side = 'front' | 'back';

// Logical card size in CSS px (matches the on-screen card); exports render at SCALE x this.
const W = 480;
const H = 280;
const SCALE = 3; // 1440 x 840 px PNG
const FONT_HEAD = '"Space Grotesk Variable", system-ui, sans-serif';
const FONT_BODY = '"Inter Variable", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono Variable", ui-monospace, monospace';

const C = {
  frontA: '#10213f',
  frontB: '#0a1222',
  border: '#2d4268',
  accent: '#5eead4',
  text: '#e6edf5',
  muted: '#a9b6c7',
  dim: '#94a3b8',
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });

const toBlob = (canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> =>
  new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Canvas export failed'))), type, quality),
  );

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** CSS-style linear-gradient(140deg, ...) across a w x h box. */
function angledGradient(ctx: CanvasRenderingContext2D, w: number, h: number, stops: [number, string][]): CanvasGradient {
  const angle = (140 * Math.PI) / 180;
  const dx = Math.sin(angle);
  const dy = -Math.cos(angle);
  const length = Math.abs(w * dx) + Math.abs(h * dy);
  const cx = w / 2;
  const cy = h / 2;
  const g = ctx.createLinearGradient(cx - (dx * length) / 2, cy - (dy * length) / 2, cx + (dx * length) / 2, cy + (dy * length) / 2);
  stops.forEach(([at, colour]) => g.addColorStop(at, colour));
  return g;
}

function drawBackground(ctx: CanvasRenderingContext2D, side: Side, radius: number): void {
  const stops: [number, string][] =
    side === 'front'
      ? [[0, C.frontA], [0.7, C.frontB], [1, C.frontB]]
      : [[0, C.frontB], [1, C.frontA]];

  ctx.save();
  roundedRect(ctx, 0, 0, W, H, radius);
  ctx.clip();
  ctx.fillStyle = angledGradient(ctx, W, H, stops);
  ctx.fillRect(0, 0, W, H);

  if (side === 'front') {
    ctx.strokeStyle = 'rgba(94, 234, 212, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }
  }
  ctx.restore();

  if (radius > 0) {
    ctx.save();
    ctx.strokeStyle = C.border;
    ctx.lineWidth = 1;
    roundedRect(ctx, 0.5, 0.5, W - 1, H - 1, radius);
    ctx.stroke();
    ctx.restore();
  }
}

function drawFront(ctx: CanvasRenderingContext2D, data: CardData, photo: HTMLImageElement): void {
  // photo, cropped like object-fit: cover with object-position 50% 25%
  const cx = 74;
  const cy = 72;
  const r = 42;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  const d = r * 2;
  const k = Math.max(d / photo.naturalWidth, d / photo.naturalHeight);
  const sw = d / k;
  const sh = d / k;
  const sx = (photo.naturalWidth - sw) * 0.5;
  const sy = (photo.naturalHeight - sh) * 0.25;
  ctx.drawImage(photo, sx, sy, sw, sh, cx - r, cy - r, d, d);
  ctx.restore();
  ctx.strokeStyle = C.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 1, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillStyle = C.text;
  ctx.font = `700 30px ${FONT_HEAD}`;
  ctx.fillText(data.name, 136, 66);
  ctx.fillStyle = C.accent;
  ctx.font = `400 16px ${FONT_BODY}`;
  ctx.fillText(data.title, 136, 91);
  ctx.fillStyle = C.muted;
  ctx.font = `400 14px ${FONT_BODY}`;
  ctx.fillText(data.company, 136, 112);

  ctx.fillStyle = C.dim;
  ctx.font = `400 13px ${FONT_MONO}`;
  ctx.fillText(data.frontLeft, 32, H - 32);
  ctx.textAlign = 'right';
  ctx.fillText(data.frontRight, W - 32, H - 32);
}

function drawBack(ctx: CanvasRenderingContext2D, data: CardData): void {
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.fillStyle = C.accent;
  ctx.font = `400 13px ${FONT_MONO}`;
  ctx.fillText('contact', 32, 74);

  ctx.font = `400 17px ${FONT_BODY}`;
  data.backLines.forEach((line, i) => {
    ctx.fillStyle = i === data.backLines.length - 1 ? C.muted : C.text;
    ctx.fillText(line, 32, 112 + i * 38);
  });
}

async function renderCard(data: CardData, side: Side, rounded: boolean): Promise<HTMLCanvasElement> {
  await Promise.all([
    document.fonts.load(`700 30px ${FONT_HEAD}`),
    document.fonts.load(`400 16px ${FONT_BODY}`),
    document.fonts.load(`400 13px ${FONT_MONO}`),
  ]);
  await document.fonts.ready;

  const photo = side === 'front' ? await loadImage(data.photo) : null;
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported in this browser');
  ctx.scale(SCALE, SCALE);

  drawBackground(ctx, side, rounded ? 18 : 0);
  if (side === 'front' && photo) drawFront(ctx, data, photo);
  else drawBack(ctx, data);
  return canvas;
}

/* ---------- Minimal PDF writer (one full-bleed JPEG per page) ---------- */

interface PdfImage {
  bytes: Uint8Array;
  width: number;
  height: number;
}

function buildPdf(images: PdfImage[], pageWidth: number, pageHeight: number): Blob {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;

  const push = (chunk: Uint8Array | string): void => {
    const bytes = typeof chunk === 'string' ? encoder.encode(chunk) : chunk;
    chunks.push(bytes);
    length += bytes.length;
  };
  const startObject = (id: number): void => {
    offsets[id] = length;
    push(`${id} 0 obj\n`);
  };

  push('%PDF-1.4\n');

  // object ids: 1 catalog, 2 pages, then (page, content, image) per card side
  const pageIds = images.map((_, i) => 3 + i * 3);
  startObject(1);
  push('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  startObject(2);
  push(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${images.length} >>\nendobj\n`);

  images.forEach((img, i) => {
    const pageId = 3 + i * 3;
    const contentId = pageId + 1;
    const imageId = pageId + 2;
    const content = `q ${pageWidth} 0 0 ${pageHeight} 0 0 cm /Im0 Do Q`;

    startObject(pageId);
    push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
        `/Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`,
    );
    startObject(contentId);
    push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`);
    startObject(imageId);
    push(
      `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.bytes.length} >>\nstream\n`,
    );
    push(img.bytes);
    push('\nendstream\nendobj\n');
  });

  const objectCount = 2 + images.length * 3;
  const xrefStart = length;
  push(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
  for (let id = 1; id <= objectCount; id += 1) {
    push(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`);
  }
  push(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  return new Blob(chunks as BlobPart[], { type: 'application/pdf' });
}

/* ---------- Wiring ---------- */

function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function initCardDownload(): void {
  const dataEl = $('#card-data');
  const button = $<HTMLButtonElement>('#dl-btn');
  const menu = $('#dl-menu');
  const status = $('#dl-status');
  if (!dataEl || !button || !menu || !status) return;

  const data = JSON.parse(dataEl.textContent ?? '{}') as CardData;
  const hint = status.textContent ?? '';
  let hintTimer: number | undefined;

  const say = (message: string, isError = false): void => {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
    window.clearTimeout(hintTimer);
    hintTimer = window.setTimeout(() => {
      status.textContent = hint;
      status.classList.remove('is-error');
    }, 4000);
  };

  const setOpen = (open: boolean): void => {
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  };

  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
    if (open) $<HTMLElement>('[data-dl]', menu)?.focus();
  });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !(e.target instanceof Element && e.target.closest('#dl-menu, #dl-btn'))) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      button.focus();
    }
  });

  $$<HTMLElement>('[data-dl]', menu).forEach((item) => {
    item.addEventListener('click', async () => {
      const kind = item.dataset.dl;
      if (kind === 'vcf') {
        setOpen(false);
        say('Contact file downloaded – open it to add me to your contacts.');
        return; // plain download link
      }

      item.setAttribute('aria-busy', 'true');
      try {
        if (kind === 'png-front' || kind === 'png-back') {
          const side: Side = kind === 'png-front' ? 'front' : 'back';
          const canvas = await renderCard(data, side, true);
          const filename = `${data.fileBase}-card-${side}.png`;
          saveBlob(await toBlob(canvas, 'image/png'), filename);
          say(`Downloaded ${filename}`);
        } else if (kind === 'pdf') {
          const sides: Side[] = ['front', 'back'];
          const images: PdfImage[] = [];
          for (const side of sides) {
            const canvas = await renderCard(data, side, false);
            const jpeg = await toBlob(canvas, 'image/jpeg', 0.95);
            images.push({ bytes: new Uint8Array(await jpeg.arrayBuffer()), width: canvas.width, height: canvas.height });
          }
          const filename = `${data.fileBase}-card.pdf`;
          saveBlob(buildPdf(images, 252, 147), filename); // 3.5in x 2.04in, front + back pages
          say(`Downloaded ${filename}`);
        }
        setOpen(false);
      } catch {
        say('Sorry, the card could not be generated in this browser. Try the contact file instead.', true);
      } finally {
        item.removeAttribute('aria-busy');
      }
    });
  });
}
