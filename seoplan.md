# SEO Plan — Something Different

## What Already Exists
- `<title>Something Different — Handcrafted Home Decor in Woodbridge</title>` ✓
- `<meta name="description" ...>` ✓
- `<meta charset>`, `<meta viewport>` ✓
- `<link rel="icon">` ✓

---

## What Needs to Be Added

### 1. `index.html` — `<head>` additions

**Robots + canonical:**
```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="https://www.somethingdifferent.ca/">
```

**Open Graph (link previews on iMessage, Facebook, WhatsApp, etc.):**
```html
<meta property="og:type" content="business.business">
<meta property="og:title" content="Something Different — Handcrafted Home Decor in Woodbridge">
<meta property="og:description" content="Family-owned boutique in Woodbridge, Ontario. Handcrafted home decor, flowers, arrangements, and seasonal gifts for over forty years.">
<meta property="og:url" content="https://www.somethingdifferent.ca/">
<meta property="og:image" content="https://www.somethingdifferent.ca/assets/shop_full.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Something Different">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Something Different — Handcrafted Home Decor in Woodbridge">
<meta name="twitter:description" content="Family-owned boutique in Woodbridge, Ontario. Handcrafted home decor, flowers, and seasonal gifts.">
<meta name="twitter:image" content="https://www.somethingdifferent.ca/assets/shop_full.jpg">
```

**LocalBusiness structured data (JSON-LD):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeGoodStore",
  "name": "Something Different",
  "image": "https://www.somethingdifferent.ca/assets/shop_full.jpg",
  "description": "Family-owned boutique in Woodbridge, Ontario. Handcrafted home decor, flowers, arrangements, and seasonal gifts for over forty years.",
  "url": "https://www.somethingdifferent.ca",
  "email": "jondecaro@hotmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "350 Woodbridge Ave, Unit 2",
    "addressLocality": "Woodbridge",
    "addressRegion": "ON",
    "postalCode": "L4H 1M9",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.7866,
    "longitude": -79.5878
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$"
}
</script>
```

> Note: `@type` is `HomeGoodStore` (more specific than `LocalBusiness`) — Google uses this for richer local results. Add `"telephone"` if the client shares a phone number later.

---

### 2. `/robots.txt` (new file at root)
```
User-agent: *
Allow: /
Sitemap: https://www.somethingdifferent.ca/sitemap.xml
```

---

### 3. `/sitemap.xml` (new file at root)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.somethingdifferent.ca/</loc>
    <lastmod>2026-04-03</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### 4. `manifest.json` (optional but good — enables "Add to Home Screen" on mobile)
```json
{
  "name": "Something Different",
  "short_name": "Something Diff.",
  "description": "Handcrafted home decor boutique in Woodbridge, Ontario",
  "start_url": "/",
  "display": "browser",
  "background_color": "#1a1210",
  "theme_color": "#1a1210",
  "icons": [
    { "src": "/icon.png", "sizes": "any", "type": "image/png" }
  ]
}
```
Add to `<head>`: `<link rel="manifest" href="/manifest.json">`

---

## Off-Site (Manual — One Time)

| Task | Where | Why |
|------|-------|-----|
| Submit sitemap | Google Search Console → Sitemaps | Gets pages indexed faster |
| Verify domain ownership | Google Search Console | Required to use it |
| Create/claim Google Business Profile | business.google.com | #1 local SEO signal — shows in Maps |
| Set business category to "Home Goods Store" or "Florist" | Google Business Profile | Affects what searches trigger the listing |
| Add business photos to Google Business Profile | Google Business Profile | CTR lifts significantly with real photos |

---

## Implementation Order
1. Add `<head>` tags to `index.html` (robots, canonical, OG, JSON-LD)
2. Create `robots.txt`
3. Create `sitemap.xml`
4. Create `manifest.json` + add link to `<head>`
5. Deploy → verify live
6. Set up Google Search Console, submit sitemap
7. Claim/create Google Business Profile

---

## Progress
- [ ] index.html head additions (robots, canonical, OG, JSON-LD)
- [ ] robots.txt created
- [ ] sitemap.xml created
- [ ] manifest.json created
- [ ] Google Search Console verified + sitemap submitted
- [ ] Google Business Profile claimed/created
