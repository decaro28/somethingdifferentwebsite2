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

