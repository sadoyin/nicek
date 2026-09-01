# Fix: Next.js build warnings (metadataBase, missing image sizes)

**Type:** Fix
**Status:** complete

## The problem

Two Next.js warnings show up in the terminal on every build/dev run:

1. `metadataBase property in metadata export is not set for resolving social
   open graph or twitter images, using "http://localhost:3000"`. The
   `metadata` export in `src/app/layout.tsx` has `openGraph.images` with a
   relative URL path, but no `metadataBase` to resolve it against. Right now
   any shared link's OG image would literally point at
   `http://localhost:3000/images/...` in production - broken for everyone but
   a local dev.
2. `Image with src "/images/optimized/autoparts-scaled.webp" has "fill" but
   is missing "sizes" prop.` In `src/app/services/autos/page.tsx`, the auto
   parts image uses `fill` without `sizes`, so Next.js defaults to assuming
   it renders at 100vw and serves an oversized image to every visitor even
   though the container caps out at `max-w-md` (448px). Every other `fill`
   image in the codebase already has a `sizes` prop; this one was missed.

## The fix

1. Add `metadataBase` to the `metadata` export in `src/app/layout.tsx`,
   resolved from an env var so it's automatically correct in local dev,
   Vercel preview deployments, and production without hardcoding a domain
   that isn't finalized yet: prefer `NEXT_PUBLIC_SITE_URL` if set, fall back
   to Vercel's auto-provided `VERCEL_URL`, fall back to `localhost:3000` for
   local dev. Document `NEXT_PUBLIC_SITE_URL` in `.env.example` as optional.
2. Add a `sizes` prop to the `autoparts-scaled.webp` `fill` image in
   `src/app/services/autos/page.tsx`, matching its actual layout: full width
   on mobile, capped at the container's 448px max width above that.

Must not change any visible behavior - both are non-visual/perf fixes.

## Build steps

- [x] **Step 1 - Add metadataBase** - update the `metadata` export in
  `src/app/layout.tsx` with a `metadataBase` resolved from
  `NEXT_PUBLIC_SITE_URL` / `VERCEL_URL` / localhost fallback (in that order),
  and add `NEXT_PUBLIC_SITE_URL` to `.env.example` as optional. *Done when:*
  the `metadataBase` warning no longer appears in `npm run build` output, and
  `npm run build` still passes.

  Verified: warning gone, build passed clean (13/13 pages).
- [x] **Step 2 - Add sizes to the autos page image** - add
  `sizes="(max-width: 768px) 100vw, 448px"` to the `fill` image in
  `src/app/services/autos/page.tsx`. *Done when:* the missing-`sizes`
  warning for `autoparts-scaled.webp` no longer appears in `npm run build`
  output, and the image still renders unchanged on `/services/autos`.

  Verified: warning gone, build passed clean (13/13 pages). No visual change
  intended or observed - same container, same crop behavior.

## Verify

Run `npm run build` after each step and confirm the specific warning is gone
from the output, with no new warnings introduced and the build still passing.
Visually spot-check `/services/autos` to confirm the image still looks the
same (no layout shift, still fills its container).
