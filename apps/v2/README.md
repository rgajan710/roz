# Roz v2

An independent experimental Next.js App Router site in the Roz npm workspace. It uses the shared wordmark, color tokens and DM Sans/Fraunces fonts from `packages/brand`; it does not import the classic app.

## Run and build

Use Node.js 20.9 or later and npm. From the repository root:

```bash
npm ci
```

Copy `apps/v2/.env.example` to `apps/v2/.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, with no trailing slash. On PowerShell:

```powershell
Copy-Item apps\v2\.env.example apps\v2\.env.local
```

Then run:

```bash
npm run dev --workspace @roz/v2
npm run lint --workspace @roz/v2
npm run test --workspace @roz/v2
npm run build --workspace @roz/v2
npm run start --workspace @roz/v2
```

Development and production start commands use port 3001. Run classic separately on port 3000 with `npm run dev --workspace @roz/classic`. A production build is written to `apps/v2/.next`. The first build can require network access for the Google fonts.

## Contact and deployment

The form sends through Resend. Verify a sender domain and set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in v2's own environment. `CONTACT_TO_EMAIL` is optional and defaults to `roz.enquire@gmail.com`. Without credentials the form explicitly reports that it is unavailable and provides a direct email link. The automated contact tests mock Resend; send a real test enquiry after configuring the provider. Add rate limiting or bot protection at the hosting edge before launch.

For Vercel, import the repository as a separate project, set the Root Directory to `apps/v2`, select the Next.js preset, configure the variables above, and deploy. Create another project rooted at `apps/classic` for the classic site. Add the desired custom domain to each project and configure the DNS records shown by Vercel. Example names are `v2.example.com` and `classic.example.com`; no projects, domains or deployment have been created. The workspace root lockfile and `packages/brand` must be included in the build. Set each project's `NEXT_PUBLIC_SITE_URL` to its actual origin before building. Separate IPs require a provider offering dedicated addresses, such as separately addressed VPS instances or load balancers.

## Motion, imagery and attribution

The hero scene, frame sequence, portfolio distortion and interface effects are original implementations. No 21st.dev or Jesko repository component code or assets were copied. The shadcn-compatible button is built locally on Radix Slot and class-variance-authority. The 36 frame images and four project illustrations were synthesized for this site and are WebP; no external 3D models or textures are used, so Draco/KTX2 are not applicable. To regenerate the imagery from the repository root:

```bash
node apps/v2/scripts/generate-sequence.mjs
node apps/v2/scripts/generate-work.mjs
```

3D and scroll libraries are loaded lazily; pixel ratio is capped, decorative particles are instanced, and the 3D canvas is removed offscreen. Small screens, reduced-motion settings, low reported memory/CPU and software WebGL use static or native-scroll alternatives. Animation settings and CSS timing variables are in `lib/motion.ts`.

Direct dependency licenses are recorded in the installed packages. Most runtime packages are MIT; `class-variance-authority` is Apache-2.0, `lucide-react` is ISC, and `postprocessing` is Zlib. GSAP's package identifies its [standard no-charge license](https://gsap.com/standard-license); its installed README states it is free for commercial use. Review all dependency terms for your deployment.

## Comparison checklist

- Compare the production builds at the same viewport, device settings, network and cache state. Check mobile, keyboard navigation, reduced motion, image loading and the configured contact form.
- Run Lighthouse Desktop against both production URLs; record performance, accessibility, SEO, LCP and total transferred bytes. Scores vary by device and run.
- Compare transferred JavaScript in the Lighthouse network requests or browser Network panel, not the entire `.next` folder.
- Local headless desktop snapshot (single run): classic performance **100**, accessibility **96**, SEO **100**, LCP **0.8 s**, initial JavaScript **200.6 KiB**, total transfer **1,296 KiB**; v2 performance **99**, accessibility **100**, SEO **100**, LCP **0.9 s**, initial JavaScript **212.5 KiB**, total transfer **313 KiB**. The v2 snapshot was taken before its deferred 3D scene loaded, so later transfers are additional. These are local measurements, not guarantees; repeat on the deployed site and real GPUs.
