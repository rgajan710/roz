# roz

A Next.js App Router marketing site for roz, an independent web design and development studio. Tagline: "Thoughtful websites. Remarkable results."

## Portfolio content

The portfolio is limited to Scent Vault, OUTLAND, sunroom, and FORME. Scent Vault and Vidhushi Sharma's testimonial were supplied as real client content. Customer names for the other three projects were supplied for these case studies; their suggested testimonial copy is a draft and must not be presented as an actual endorsement until each customer approves it. Pricing starts at Rs. 30,000 for Base and Rs. 75,000 for Premium. The privacy and terms pages are placeholders, not legal advice.

## Getting started

Use Node.js 20.9 or later and npm. From the monorepo root:

```bash
npm ci
cp apps/classic/.env.example apps/classic/.env.local
npm run dev --workspace @roz/classic
```

On Windows PowerShell, use `Copy-Item apps\classic\.env.example apps\classic\.env.local`. Open http://localhost:3000. To check a production build:

```bash
npm run lint --workspace @roz/classic
npm run build --workspace @roz/classic
npm run start --workspace @roz/classic
```

The site uses `next/font` to self-host DM Sans and Fraunces; the initial production build needs network access to download the font files. Project artwork is local and needs no external image service.

## Contact form

The contact form sends enquiries through Resend. Create a Resend API key and verify the sending domain, then set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (a sender on your verified domain) in `apps/classic/.env.local` or your deployment environment. Enquiries are sent to `roz.enquire@gmail.com` by default; set `CONTACT_TO_EMAIL` only if you want to override it. The direct email link opens a mail app as a fallback. Set `NEXT_PUBLIC_SITE_URL` to your public HTTPS origin, with no trailing slash, and restart the server after changing environment variables. The API validates inputs and uses a honeypot; add production rate limiting or bot protection at your hosting or edge provider. Never commit real keys.

## Make it yours

Paths below are relative to `apps/classic`.

- Edit company details, services, testimonials, FAQs, and pricing in `content/site.ts`.
- Edit project narratives, customer details, stacks, and metrics in `content/projects.ts`. Project slugs map to both `/work/[slug]` routes and `public/work/<slug>/` asset folders.
- Update the hero, process, contact links, social URLs, and page copy in `components/home.tsx` and `components/site-footer.tsx`.
- Replace the placeholder privacy and terms text with policies appropriate for your business and jurisdiction.
- Adjust shared color tokens in `../../packages/brand/tokens.css` and responsive styles in `app/globals.css`.
- Replace `public/hero-roz.svg` and project screenshots in `public/work/<slug>/` with approved artwork. SVGs must be trusted, self-contained files. For raster replacements, change the file extension in the corresponding component or content entry.

## Deploy to Vercel

See the monorepo README for the two-project setup. Add the required Resend settings (`RESEND_API_KEY` and `CONTACT_FROM_EMAIL`) from `.env.example` in the classic Vercel project settings, deploy, and test a real enquiry using your verified sender. Configure the production domain and update `NEXT_PUBLIC_SITE_URL` before redeploying. Review privacy, accessibility, analytics, spam protection, and Lighthouse scores in the deployed environment.

## Before launch

- Choose and verify your company name, location, contact information, and social profiles.
- Confirm each customer name and project detail, and get approval for the three suggested testimonial drafts before presenting them as customer quotes.
- Review service descriptions, timeline, pricing, and claims against your actual offer.
- Publish legally reviewed privacy and terms pages.
- Configure the production URL and Resend sender; test delivery and add rate limiting/bot protection.
- Run accessibility and Lighthouse audits on the deployed site; a 95+ score is a target, not a guarantee.