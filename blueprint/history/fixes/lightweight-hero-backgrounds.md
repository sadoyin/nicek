# Restore lightweight hero background imagery

**Type:** Fix

## The problem

The previous hero-image optimization removed the original hero artwork from the
About and Services banners to prevent duplicate image downloads. Those banners
now lose their visual depth and brand context.

## The fix

Use small, optimized WebP background assets for the eight affected banners.
Render each as an absolutely positioned, low-opacity CSS background beneath the
existing gradient overlay, so the page downloads only the lightweight asset and
keeps existing text contrast and layout intact.

Generated via `sharp` (already present in `node_modules` as a Next.js
dependency, no new package added): each of the 6 source photos resized to
480px wide (capped with `withoutEnlargement` so narrower originals aren't
upscaled) at WebP quality 55. First attempt used 96px/quality 40, which was
too blurry/pixelated when stretched across a full-width banner - regenerated
at 480px/quality 55 after review.

| Original | Size | `-bg` variant |
|---|---|---|
| `group_companies-1024x684.webp` | 53.0KB | 11.72KB |
| `autoparts-scaled.webp` | 437.2KB | 33.65KB |
| `water-4998513_640.webp` | 113.8KB | 74.03KB |
| `realestate.webp` | 71.8KB | 20.25KB |
| `upscalemedia-transformed-3-1.webp` | 43.4KB | 19.24KB |
| `jacqueline-day-1SapfOEZN2g-unsplash.webp` | 23.3KB | 10.75KB |

## Build steps

- [x] 1. Add the six optimized `-bg.webp` hero assets and apply the matching
  low-opacity background layer to the About page, Services overview, and six
  service detail banners. **Done when:** every affected banner shows its
  intended background image behind the existing overlay without changing banner
  text, spacing, or navigation.

## Verify

- Run `npm run lint` and `npm run build`.
- Open `/about`, `/services`, and each `/services/*` detail page in light and
  dark modes. Confirm the background remains decorative, readable text retains
  contrast, and each page loads without a console error.

Both passed: `npm run build` compiled clean across all 15 routes; `npm run
lint` showed only the same pre-existing warnings/errors present before this
change (unrelated `navbar.tsx` effect warnings, unused-import warnings).
Visually confirmed via the dev server and approved by the user.
