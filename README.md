# Roz apps

This npm workspace contains the existing site in `apps/classic`, the experimental site in `apps/v2`, and shared brand fonts, color tokens and wordmark in `packages/brand`. No site has been deployed by this change.

## Local development

Use Node.js 20.9 or later and npm. From the repository root:

```bash
npm ci
npm run dev --workspace @roz/classic
npm run dev --workspace @roz/v2
```

Run the dev commands in separate terminals. Classic uses `http://localhost:3000`; v2 uses `http://localhost:3001`. If a port is already in use, stop only your own server or select another port explicitly. Copy each app's `.env.example` to its own `.env.local`; never commit credentials. See `apps/classic/README.md` and `apps/v2/README.md` for contact configuration and site details.

Build independently from the repository root:

```bash
npm run build --workspace @roz/classic
npm run build --workspace @roz/v2
```

Next.js writes each app's production build to its own `.next` directory. The first build may need network access to download the Google fonts.

## Deployment

No hosting provider or domain has been selected. For comparison, create two separate projects from the same Git repository, using `apps/classic` and `apps/v2` as their respective app roots and retaining access to the root npm workspace lockfile and `packages/brand`. Suggested domains are `classic.example.com` and `v2.example.com`; these are examples, not live URLs.

For Vercel, import the repository twice, select the Next.js framework preset, and set each project's Root Directory to its corresponding app. Deploy each project separately, then add its intended custom domain under project settings and configure the DNS records Vercel provides. Set `NEXT_PUBLIC_SITE_URL` separately to each project's actual HTTPS origin. For each contact form, also configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, and optionally `CONTACT_TO_EMAIL`; redeploy after changing variables and test email delivery.

Two hostnames do not imply separate IP addresses. Truly separate IPs require a hosting arrangement that provides dedicated addresses (for example, two separately addressed VPS instances or dedicated load balancers), plus DNS records pointing to them; availability and cost depend on the provider.
