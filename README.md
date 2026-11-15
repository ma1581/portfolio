# Mohammed Anas – Portfolio

Personal portfolio site built with [Astro](https://astro.build) and TypeScript. It compiles to static HTML with a small amount of JavaScript for the interactive bits.

Live site: https://portfolio-mohammed-anas.netlify.app/

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check (astro check) + production build into dist/
npm run preview   # serve the production build locally
```

Requires Node 22 or newer.

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/profile.ts` | **All content** – bio, experience, projects, skills, certifications, links. Edit this to update the site. |
| `src/components/` | One component per section (Hero, About, Experience, Projects, Skills, Education, Contact …), each with its own scoped styles. |
| `src/layouts/Layout.astro` | Page shell: SEO and Open Graph tags, structured data, self-hosted fonts. |
| `src/styles/global.css` | Design tokens, base styles, shared patterns and animations. |
| `src/scripts/` | Small TypeScript modules: navigation, scroll effects, terminal typing, accordions, skills filter, digital card, contact form. |
| `src/assets/` | Images that are optimized at build time (profile photo → WebP at the right sizes). |
| `public/` | Files served as-is: certificates, `Mohammed-Anas.vcf` (digital contact card), favicon, link-preview image, `robots.txt`. |
| `netlify.toml` | Netlify build command, publish directory and security / cache headers. |

## Notes

- The contact form posts to Formspree. The form endpoint is `site.formEndpoint` in `src/data/profile.ts`.
- The digital visiting card (Contact section) can be downloaded as a PNG (front or back, 1440×840, transparent corners), a two-page print-ready PDF, or a contact file (`public/Mohammed-Anas.vcf`). The PNG and PDF are drawn in the browser by `src/scripts/card-download.ts` from the same data as the on-screen card, so edit the card text in `src/components/Contact.astro` and `src/data/profile.ts`, and the `.vcf` file to match. The card intentionally has no phone number.
- The sitemap (`/sitemap-index.xml`) is generated at build time.
- Animations respect the visitor's reduced-motion setting.

## Deploy

Netlify runs `npm run build` and publishes `dist/` (see `netlify.toml`). Link this repository to the Netlify site (branch `main`) so every merge deploys automatically.
