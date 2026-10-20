---
title: "Hostinger deployment package — Australian Freight Agency"
description: "Static React/Vite build with Apache SPA routing and a PHP mail handler"
language: "php"
dependencies:
  - "PHP 8 (mail, mbstring)"
  - "Apache mod_rewrite, mod_deflate, mod_expires, mod_headers"
generated_at: "2026-10-20T05:35:00Z"
note: "Edit this file and ask Vincen to rebuild or extend the deployment package."
---

## What this does

`hostinger-deploy.zip` is the complete upload package for the Australian Freight
Agency marketing site on Hostinger shared hosting. It contains a static client
build of all seven pages, Apache SPA routing, a PHP mail handler for the quote,
contact and tracking forms, and the masthead video and poster.

## Build route

The source was already a static Vite SPA (`vite build`, no SSR), so no framework
static export was needed. The hosted database was the only runtime dependency.
It was replaced with a build-time content snapshot generated from
`neon/seed.json`; every page, section, style, image reference and line of copy is
unchanged.

## Backend calls replaced

- `db.from("services" | "ports" | "stats" | "why_cards" | "testimonials" | "team" | "accreditations")`
  → local arrays in `src/content/data.ts`, exposed through the same hooks.
- `db.from("enquiries").insert(...)` in the quote, contact and tracking forms
  → `POST /send.php` (JSON), with real success and error states.
- The hosted media catalog (`useAssets`) → same-origin `/assets/media/`.

## Files in the archive

Top level: `index.html`, `assets/`, `.htaccess`, `send.php`, `MAIL_SETUP.md`,
`DEPLOY_STEPS.md`.

- `assets/index-C0OoJ_22.js` — 440,194 bytes
- `assets/index-kzO88qNx.css` — 63,307 bytes
- `assets/media/au-freight-port-header.mp4` — 1,826,654 bytes (H.264, 1280×720, 12 s)
- `assets/media/port-hero.jpg` — 522,108 bytes
- plus the per-route JS chunks (about, contact, ports, quote, services, track, forms, queries)

## Verified

- `/`, `/services`, `/ports`, `/track`, `/about`, `/quote`, `/contact` → HTTP 200,
  each returning the app shell and rendering its expected heading in Chromium.
- Video element on all seven pages: `autoplay`, `loop`, `playsinline`, muted
  property true, poster `/assets/media/port-hero.jpg`, source
  `/assets/media/au-freight-port-header.mp4` (readyState 4).
- Form failure path shows a friendly error; mocked `{"ok":true}` shows the
  existing success panel. No requests leave the site except Google Fonts.
- Archive extracts with no nesting; `.htaccess`, `send.php` and media present.

## Not verified

- `php -l send.php` could not run: no PHP runtime is installed in the build
  environment. The file was reviewed manually; run `php -l send.php` on the host
  before going live.
- Actual `mail()` delivery depends on the Hostinger mailbox and cannot be tested
  here. Create `no-reply@<domain>` and set `$TO_EMAIL` first.

## Changes from the original

- The source archive contained no media files. A port masthead video and poster
  were produced for this package so the masthead is not blank; replace
  `assets/media/au-freight-port-header.mp4` and `port-hero.jpg` with the original
  brand footage if you have it.
- The platform activity collector script was removed.
- Forms now report real delivery failures instead of always showing success.
- Tracking enquiries are emailed to the same inbox instead of written to the
  database.
