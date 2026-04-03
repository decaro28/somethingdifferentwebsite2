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




# To do:
- [x] Make the site feel less laggy especially when scrolling
- [x] make it so that when scrolling up and down past the top/bottom of the page the background has the same color as the top/bottom of the page
- [x] Refined the mobile hero shadow treatment again so the darkness follows each element individually: removed the single shared glow behind `.hero-content` and attached blurred radial shadow fields to the tag, title, subcopy, and CTA instead, keeping the effect local to each piece of hero copy
- [x] Restored a brighter, more natural hero flower after review: brought back a restrained `.hero-video` filter (`brightness(1.14) saturate(1.04) contrast(1.02)`) and reduced the broad overlay wash so the bloom reads more luminous without looking artificially edited
- [x] Copy exploration pass for replacing `"Step inside"`: generated short subheadline options aimed at a transportive, hushed, dreamlike sense of arrival without using explicit fantasy or religious wording
