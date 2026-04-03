# Something Different — Website Build Plan & Progress

## Overview
Single-page static website for "Something Different," a 40+ year family-owned Italian boutique in Woodbridge, ON. Handcrafted home decor, flowers, seasonal arrangements, gifts, and accents. The site should capture the warmth, beauty, and cozy family feel of the shop.

## Design Direction
- **Aesthetic:** Warm editorial boutique — cinematic hero transitioning to warm cream body
- **Hero:** `pink_flower.mp4` video on black background, left-aligned warm typography
- **Palette:** Cream (#FAF7F4), warm charcoal (#2C2420), dusty rose (#C4917B), sage accents
- **Typography:** DM Serif Display (headlines) + Outfit (body)
- **Layout:** Asymmetric grids, art-gallery spacing, scroll-triggered reveals
- **Motion:** Fluid CSS transitions (IntersectionObserver-based scroll reveals, hover states)
- **Stack:** Static HTML/CSS/JS — no framework, no build step, no backend

## Site Structure
1. **Navigation** — Transparent over hero, solid cream on scroll. Logo left, links right, mobile hamburger.
2. **Hero** — Full viewport video background (pink_flower.mp4), left-aligned headline + tagline, "Visit Us" CTA.
3. **Story** — Split layout. Family history, Italian heritage, handcrafted quality. shop_full.jpg.
4. **Shop Gallery** — Asymmetric bento grid showcasing shop interior photos (blue, lightblue, pink, wideflowers, woodpink).
5. **Seasonal** — Christmas, Valentine's Day, Mother's Day highlights with respective images.
6. **Visit Us** — Address, hours, email, map CTA. Warm and inviting.
7. **Footer** — Minimal. Business name, address, copyright.

## Assets Used
| File | Usage |
|------|-------|
| icon.png | Favicon |
| pink_flower.mp4 | Hero video background |
| pink_flower-poster.jpg | Hero video poster frame |
| shop_full.jpg | Story section |
| shop_blue.jpg | Gallery grid |
| shop_lightblue.jpg | Gallery grid |
| shop_pink.jpg | Gallery grid |
| shop_wideflowers.jpg | Gallery grid |
| shop_woodpink.jpg | Gallery grid |
| christmas.png | Seasonal — Christmas |
| valentines.png | Seasonal — Valentine's Day |
| mothersday.jpg | Seasonal — Mother's Day |

## Business Details
- **Name:** Something Different
- **Address:** 350 Woodbridge Ave Unit 2, Woodbridge, ON L4H 1M9
- **Email:** jondecaro@hotmail.com
- **Hours:** Mon-Fri 9-5, Sat 9-3, Sunday Closed
- **CTA:** "Visit Us" linked to Google Maps
- **Contact:** Email link (no contact form)

## Progress
- [x] Project structure created, assets copied
- [x] Plan written (planandprogress.md)
- [x] index.html — all sections (Nav, Hero, Story, Shop Gallery, Seasonal, Visit, Footer)
- [x] css/style.css — full responsive styling (mobile-first, 768/1024/1280 breakpoints)
- [x] js/main.js — scroll animations (IntersectionObserver), nav scroll state, mobile menu, video pause
- [x] Initial build complete — opened in browser for review
- [x] Favicon added (icon.png) to index.html
- [x] Hero video repositioned to right half on desktop (1024px+): video-wrap covers right 50%, horizontal gradient blends into dark left background, hero content constrained to left 48%, vertical alignment changed to center
- [x] Hero content vertically centered on desktop: replaced bottom-heavy padding (0 4rem 6rem / 0 6rem 7rem) with equal top/bottom padding (6rem 4rem / 7rem 6rem) at 1024px+ and 1280px+ breakpoints
- [x] Hero flower video cropped so the frame sits 40px lower: `.hero-video` remains `calc(100% + 40px)` tall and is offset downward by `top: 40px` inside the clipped wrapper, so the bottom 40px is cut while the visible flower composition shifts down
- [x] Hero video playback sequence implemented on all views: starts hidden, seeks to 6s on `loadedmetadata`, fades in on `canplay`, then on `ended` fades out, waits 420ms, seeks to 1.5s, resumes playback, and fades back in
- [x] Hero video entrance animation aligned to the text reveal: video now enters from `translateY(20px)` over `0.8s var(--ease-out)` and its first reveal is delayed by 300ms to match the hero text timing
- [x] Hero video load-in motion now happens only once: after the first entrance animation completes, the video switches to an `is-settled` state so subsequent loop restarts use opacity-only fades instead of replaying the translate-up reveal
- [x] Hero video top edge now truly fades into the background: added a top transparency mask on `.hero-video-wrap` so the upper portion of the video dissolves into the hero background instead of only darkening with an overlay
- [x] Right-side scrollbar hidden while preserving scroll behavior: added cross-browser scrollbar hiding on the page root/body so vertical scrolling still works without showing the scrollbar track
- [x] Scrolling performance pass: moved nav scroll updates onto `requestAnimationFrame`, prevented redundant `scrolled` class writes, reduced header blur cost, and added `content-visibility`/intrinsic sizing to below-the-fold sections so the browser can skip offscreen rendering during scroll
- [x] Overscroll background aligned with page edges: switched the document body background to `var(--black)` so rubber-band scrolling past the top or bottom shows the same dark tone as the hero/footer instead of a light flash
- [x] Hero flower brightness increased without affecting the background blur: applied `filter: brightness(1.16) saturate(1.08) contrast(1.03)` directly to `.hero-video`, which lifts the bloom and petal detail while leaving the overlay gradients, masks, and blurred text panel unchanged
- [x] Hero brightness pass matched to the older `/somethingdifferentwebsite` approach: reduced the full-surface dark wash, moved the stronger shading into targeted left/bottom edge fades, and raised the video treatment to `brightness(1.32) saturate(1.14) contrast(1.06)` so the flowers read closer to the earlier, more luminous hero without changing blur behavior
- [x] Removed the earlier direct video brightening attempts after review: kept the newer overlay rebalance inspired by `/somethingdifferentwebsite`, but dropped the `.hero-video` filter boost so the hero brightness comes from the edge-fade composition instead of an artificial global lift
- [x] Removed the desktop hero scroll indicator after review: the thin vertical line at the lower-right of the hero was the `.hero-scroll-hint`, not a video seam, so the hint markup and its CSS were deleted to keep the hero media edge clean
- [x] Hardened hero video scroll recovery after a disappearing-video bug: the controller now tracks the full `#hero` section instead of the `<video>` element, explicitly resumes playback/visibility when the hero re-enters view or the page becomes active again, and clears pending loop timers so offscreen scrolls cannot leave the flower video stuck hidden




---

## Mobile Hero Redesign — Plan

### Diagnosis: Why it looks bad on mobile

**Screenshot observed (2026-04-03):** Hero shows the full-bleed pink flower video filling the entire viewport. The title "Something Different" and the sub-copy sit over the center of the flower bloom — the most visually busy part of the image — with only a moderate dark overlay keeping the text readable. Result: the composition feels cluttered, the text competes with the image, and the hero lacks a clear visual hierarchy.

**Root cause breakdown:**

1. **No spatial separation between image and text.** On desktop, the video is constrained to the right 50% (`left: 50%` on `.hero-video-wrap`), giving the left side a clean dark canvas for the title. On mobile that split doesn't exist — the video fills 100% of the viewport width and height, so text always overlays the image.

2. **Content anchored to the bottom, image behind it.** `.hero { align-items: flex-end; padding: 0 2rem 4rem; }` pins all text to the lower viewport. The flower's `object-position: center 30%` places the bloom's brightest pink petals squarely in the mid-screen area where the title sits.

3. **Overlay gradient not strong enough for mobile.** The `.hero-video-overlay` is tuned for desktop (text on dark left, image on right). On mobile, where text overlaps the full image, the gradient wash is too light to create a clean reading surface. The radial glow `::before` pseudo-elements behind each text element help locally but don't solve the composition problem.

4. **The mask kills the top of the image, not the bottom.** `.hero-video-wrap` has a top mask that fades from transparent → opaque going down. This darkens the top edge (where nothing important is) but leaves the image at full vibrancy behind the text at the bottom-center.

5. **Tag line and sub-copy are hard to read.** The `.hero-tag` ("Est. 1980s — Woodbridge, Ontario") is `0.75rem` with wide letter-spacing — tiny against a pink floral background. The `.hero-sub` runs to three lines on a narrow screen, making it verbose and hard to scan.

---

### Redesign Plan: Two-Zone Mobile Hero

**Concept:** Split the mobile hero into two clear visual zones:
- **Top zone (~55% of viewport height):** The flower video/image, displayed cleanly with no text overlay. The flower gets its own moment.
- **Bottom zone (~45%):** A dark background (`var(--black)`) where all text content lives with full legibility.
- A soft gradient transition stitches the two zones together, fading the flower's bottom edge into the dark text zone.

This mirrors editorial/magazine layouts (common in high-end boutique sites) where a hero image and hero copy occupy distinct regions rather than overlapping.

**Changes required — `css/style.css` only (mobile-first, max-width: 767px):**

1. **`.hero-video-wrap`** — change `inset: 0` to `inset: 0 0 44% 0`, so the video wrapper only covers the top 56% of the viewport. Add a bottom mask (`mask-image: linear-gradient(to bottom, black 60%, transparent 100%)`) to softly dissolve the flower's bottom edge into the dark background below.

2. **`.hero-video-overlay`** — replace or simplify the full-surface gradient. Only need a subtle vignette at the very bottom of the image zone (where it meets the text). Remove the heavy top/bottom washes that were compensating for the overlay issue.

3. **`.hero { align-items: flex-end; padding: 0 2rem 4rem; }`** — keep `align-items: flex-end` so the content sits at the bottom. The padding is fine. The image zone above creates the visual space naturally.

4. **`.hero-content`** — no structural change needed. It stays at the bottom of the flex container, now in the naturally dark zone below the image.

5. **`.hero-tag`** — increase size slightly on mobile to `0.7rem` (or keep) but this will now read clearly on a dark background with no competition from the flower.

6. **`.hero-sub`** — reduce to `0.9rem` on mobile and tighten `line-height` to `1.6` to make it more compact on narrow screens.

7. **`.hero-video`** — adjust `object-position` to `center 20%` on mobile so the flower's bloom centers in the upper zone (not the mid-screen transition area).

**Expected result:** The flower is framed like a photograph in the top portion of the screen — dramatic, uncluttered. Below it, the title, sub, and CTA sit in a clean dark field with sharp legibility. The gradient blends the two zones so it reads as one cohesive hero, not two boxes.

---

# To do:
- [x] Mobile hero redesigned to two-zone layout; video entrance/loop transitions explicitly matched to desktop: `top: 0; height: 100%` (replaced the 40px offset designed for full-viewport), `.is-visible` and `.is-settled` classes re-declared in mobile block with identical timing (`opacity 0.8s` initial, `opacity 0.42s` on loop): video constrained to top 56% of viewport via `bottom: 44%` on `.hero-video-wrap`, bottom mask dissolves flower into dark background, text lives in clean dark lower zone, overlay simplified, per-element radial glows removed (redundant on dark bg), video repositioned to `object-position: center 20%` so bloom sits in upper zone, sub-copy tightened to `0.9rem / 1.65` for narrow screens
- [x] Make the site feel less laggy especially when scrolling
- [x] make it so that when scrolling up and down past the top/bottom of the page the background has the same color as the top/bottom of the page
- [x] Refined the mobile hero shadow treatment again so the darkness follows each element individually: removed the single shared glow behind `.hero-content` and attached blurred radial shadow fields to the tag, title, subcopy, and CTA instead, keeping the effect local to each piece of hero copy
- [x] Restored a brighter, more natural hero flower after review: brought back a restrained `.hero-video` filter (`brightness(1.14) saturate(1.04) contrast(1.02)`) and reduced the broad overlay wash so the bloom reads more luminous without looking artificially edited
- [x] Copy exploration pass for replacing `"Step inside"`: generated short subheadline options aimed at a transportive, hushed, dreamlike sense of arrival without using explicit fantasy or religious wording
- [x] Investigated hero flower video disappearing after scrolling away and back: traced the failure to the custom video visibility/loop controller and implemented a more reliable resume path
- [x] Investigated Vercel deploy failure: inspected current project linking, recent deployment/build logs, and GitHub integration state before deciding how to reassign the repo
- [x] Identified duplicate Vercel project wiring: `somethingdifferentwebsite2` is the correct static-site project and deploys successfully, while legacy project `something-different` is still auto-deploying the same repo under a mismatched `Next.js` preset and producing the reported error
- [x] Investigation completed: confirmed the repo was linked to two Vercel projects at once and isolated the broken one to `something-different` running with a mismatched `Next.js` preset
- [x] User changed deployment target: keep Vercel project `something-different` as the long-term auto-deploy target for GitHub repo `somethingdifferentwebsite2` instead of the newer `somethingdifferentwebsite2` Vercel project
- [x] Reconfigured Vercel project `something-different` from `Next.js` to static `Other` by clearing its framework preset through the Vercel API while preserving the GitHub auto-deploy link to `decaro28/somethingdifferentwebsite2`
- [x] Verified `something-different` can deploy successfully after the config change: triggered a production redeploy, confirmed status `Ready`, and confirmed `www.somethingdifferent.ca` returns HTTP 200 from Vercel
- [x] Removed duplicate Vercel project `somethingdifferentwebsite2`, leaving `something-different` as the single Vercel auto-deploy target for GitHub repo `somethingdifferentwebsite2`
- [x] Verified Git auto-deploy remains enabled on `something-different`: project link points to GitHub repo `decaro28/somethingdifferentwebsite2`, production branch is `main`, and Vercel reports `gitProviderOptions.createDeployments = enabled`
- [x] Updated the mobile-only hero tag line `Est. 1980s — Woodbridge, Ontario` to use the same muted grey as the hero subtext by setting `.hero-tag { color: rgba(255, 253, 249, 0.65); }` inside the `@media (max-width: 767px)` block in `css/style.css`

## SEO Implementation Log — 2026-04-03
- [x] Reviewed `seoplan.md` and audited the current static site structure in `index.html`
- [x] Confirmed the planned SEO assets and target files exist: `assets/shop_full.jpg`, `icon.png`, and the root static-site file layout
- [x] Added head-level SEO metadata to `index.html` without changing visible page copy: robots, canonical, Open Graph, Twitter card, manifest link, and `HomeGoodStore` JSON-LD
- [x] Created `robots.txt` at the project root
- [x] Created `sitemap.xml` at the project root with `lastmod` set to `2026-04-03`
- [x] Created `manifest.json` at the project root and linked it from `index.html`
- [x] Added two non-visible SEO/PWA improvements while implementing the plan: `theme-color` metadata and richer social metadata (`og:image:alt`, `og:locale`)
- [x] Ran a final verification pass on generated metadata and files
