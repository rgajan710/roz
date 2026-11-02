# roz

A Next.js App Router marketing site for roz, an independent web design and development studio. Tagline: "Thoughtful websites. Remarkable results."

## Important: fictional content

Scent Vault and Vidhushi Sharma's testimonial are real client content supplied for this portfolio. **The other six project brands, stories, screenshots, results, metrics, testimonials, people, and logos are fictional or illustrative**, as are prices, contact details, and social links. Do not present the fictional examples as actual clients or endorsements. Replace placeholders before publishing. The privacy and terms pages are placeholders, not legal advice. The concept labels are intentional and should remain until the fictional work is replaced.

## Getting started

Use Node.js 20.9 or later and npm. From the project root:

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local`. Open http://localhost:3000. To check a production build:

```bash
npm run lint
npm run build
npm run start
```

The site uses `next/font` to self-host DM Sans and Fraunces; the initial production build needs network access to download the font files. Project artwork is local and needs no external image service.

## Contact form

Create a Resend API key and verify the sending domain in Resend. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a sender on your verified domain), and `CONTACT_TO_EMAIL` in `.env.local` or your deployment environment. Set `NEXT_PUBLIC_SITE_URL` to your public HTTPS origin, with no trailing slash. Restart the server after changing environment variables. The API validates inputs, uses a honeypot, and returns a visible fallback directing visitors to email if the provider is not configured or delivery fails. The honeypot is not a substitute for production rate limiting or bot protection: add those at your hosting or edge provider before launch. Never commit real keys.

## Make it yours

- Edit company details, services, testimonials, FAQs, and pricing in `content/site.ts`.
- Edit project narratives, industry labels, stacks, and illustrative metrics in `content/projects.ts`. Project slugs map to both `/work/[slug]` routes and `public/work/<slug>/` asset folders.
- Update the hero, process, contact links, placeholder social URLs, and page copy in `components/home.tsx` and `components/site-footer.tsx`.
- Replace the placeholder privacy and terms text with policies appropriate for your business and jurisdiction.
- Adjust the design tokens and responsive styles in `app/globals.css`.
- Replace the SVG files in `public/work/<slug>/`, `public/hero-devices.svg`, and `public/avatar-*.svg` with your own artwork using the same filenames and dimensions. SVGs must be trusted, self-contained files. For raster replacements, change the file extension in the corresponding component or content entry. See `docs/image-prompts.md` for replacement prompts. `node scripts/generate-assets.mjs` regenerates the fictional placeholders and overwrites those files.

## Deploy to Vercel

Push the repository to your Git provider and import it into Vercel. The Next.js framework preset is detected automatically. Add the four environment variables from `.env.example` in the Vercel project settings, deploy, and test a real enquiry using your verified Resend sender. Configure the production domain and update `NEXT_PUBLIC_SITE_URL` before redeploying. Review privacy, accessibility, analytics, spam protection, and Lighthouse scores in the deployed environment.

## Before launch

- Choose and verify your company name, location, contact information, and social profiles.
- Replace every fictional client, logo, testimonial, project, result, price, and visual with authorized, accurate material.
- Review service descriptions, timeline, pricing, and claims against your actual offer.
- Publish legally reviewed privacy and terms pages.
- Configure the production URL and Resend; test delivery and add rate limiting/bot protection.
- Run accessibility and Lighthouse audits on the deployed site; a 95+ score is a target, not a guarantee.