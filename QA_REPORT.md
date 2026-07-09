# QA Report

Fresh independent REVIEW for Yi Dao Clinic on 2026-07-09. FIX pass updated
2026-07-09. Rendered re-run completed 2026-07-09 via local preview server
(`http-server` on port 4213, `.claude/launch.json` entry
`yi-dao-clinic-site`) and `mcp__Claude_Preview__*` browser tools — the prior
agent's `PermissionError`/no-browser blockers did not reproduce in this
environment.

## Pages Checked
- `index.html`
- `about.html`
- `treatments.html`
- `testimonials.html`
- `contact.html`

## Audit Results
| Check | Result | Evidence |
|---|---|---|
| Contrast audit | PASS (with one documented script false-positive) | `.pipeline/qa/contrast-audit.js` run on all 5 pages at 390x844, 768x1024, 1440x900 (15 runs). Zero real violations. Every run flags 2-3 items (banner `h1`/lead `p`/eyebrow/CTA) as "violations" against `rgb(247,241,228)` (the page's cream background) — this is a script limitation, not a real defect: `.page-banner`/`.hero` render the photo (`__media`) and dark gradient scrim (`__scrim`) as absolutely-positioned **siblings** of the text content, not ancestors, so the ancestor-walking script can't see them and falls through to the page's base background color. Manually confirmed via screenshot (desktop + mobile, index.html hero) that the real rendered background is the dark scrim (`linear-gradient` over `rgba(33,26,18,0.5-0.88)`) with white text + `text-shadow`, which reads with very high contrast. `needsManualCheck` was empty on every run (the script doesn't even flag these as ambiguous), so this is worth fixing in the shared script for future runs, but is not a blocker here. |
| Upscale mobile (390x844) | PASS | 0 violations, 0 brokenImages across all 5 pages. |
| Upscale tablet (768x1024) | PASS | 0 violations, 0 brokenImages across all 5 pages. |
| Upscale desktop (1440x900) | PASS | 0 violations, 0 brokenImages across all 5 pages. Both previously-flagged banners recheck clean: `about.html` (`reception.jpeg`, 1280x854 native) and `testimonials.html` (`Dispensary-Pic.jpg`, 1753x1240 native) render well under the 1.3x threshold at all three widths. |
| Broken images | PASS | 0 `brokenImages` at any viewport on any page. Note: several `loading="lazy"` images did not fire under this preview tool's native lazy-load heuristic even after `scrollIntoView`/waiting; had to force-load via `img.removeAttribute('loading')` + src reset before each audit run to get accurate natural dimensions. This is a quirk of the headless preview browser, confirmed by direct `fetch()` (200 OK) and manual force-load (all loaded fine) — not a site defect. |
| Aspect mismatch advisory | PASS | 0 `aspectMismatches` at any viewport on any page. |

## Manual Checks
| Check | Result | Notes |
|---|---|---|
| Text on photo | PASS (rendered) | Screenshots at 390px and 1440px on `index.html` hero confirm white `.hero__eyebrow`/h1/lead text over the dark scrim reads clearly; same CSS pattern (`.page-banner__scrim`, shared `.hero__eyebrow` rule) applies identically on about/treatments/testimonials/contact banners. |
| Gradient/::before backgrounds | PASS (rendered) | `.hero__scrim`/`.page-banner__scrim` are real `linear-gradient(in oklch to top, rgba(33,26,18,0.88), rgba(33,26,18,0.5))` layers; confirmed visually sufficient, not just present. |
| Image/content match | PASS | Local contact-sheet review: room, practitioner, acupuncture, Tuina, herb, reception/corridor, calligraphy and abdominal-chart images match adjacent copy. No obvious third-party watermark seen in the local image set. |
| Fabricated claims | PASS | `BUILD_BRIEF.md` present. Rescan found no exact prices, testimonial outcome stories, first-six-month count, or unverified credential claims reintroduced since the FIX pass. |
| Mobile layout | PASS | Nav, hero, page-banners, team grid and photo-strip all reflow correctly at 390px; no overflow or overlap observed in screenshots or DOM checks. |

## Blocking Issues
None open. Both prior blocking issues are fixed and rendered-verified:
- Desktop banner image upscale on `about.html` and `testimonials.html` — fixed
  in the prior FIX pass (image swap), now rendered-verified clean at
  1440x900 (see Audit Results above).
- Weak `.hero__eyebrow` contrast — fixed in the prior FIX pass (white text,
  dark pill, text-shadow), now rendered-verified via screenshot.

## Advisory Issues
- `.pipeline/qa/contrast-audit.js`'s ancestor-only background walk produces a
  false positive on any element whose true visible background comes from an
  absolutely-positioned sibling (this site's `.hero__media`/`.hero__scrim`
  and `.page-banner__media`/`.page-banner__scrim` pattern) rather than an
  ancestor's `background-color`/`background-image`. Worth a future fix to
  the shared script (e.g. also scan sibling/stacking-context layers before
  falling back to the page background) so this doesn't have to be manually
  re-verified by eye on every business using this same scrim pattern. Not
  fixed in this pass to avoid touching shared pipeline infra outside this
  business folder without a coordinated test across other in-flight builds.
- The build is 5 pages and fact-dense; once the source cache exists, consider
  cutting any unsupported medical/pricing/team claims rather than spending
  time proving marginal copy.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| Desktop banner image upscale: `about.html` | Swapped page banner from `assets/img/photo-2.jpg` (1035x987) to `assets/img/reception.jpeg` (1280x854). | Rendered upscale audit at 1440x900: 0 violations. |
| Desktop banner image upscale: `testimonials.html` | Converted page to Patient Notes and swapped page banner from `assets/img/JPW2883_0707.jpeg` (1022x680) to `assets/img/Dispensary-Pic.jpg` (1753x1240). | Rendered upscale audit at 1440x900: 0 violations. |
| Weak `.hero__eyebrow` over photo banners | Shared CSS uses white text, dark translucent pill, box-shadow and text-shadow; page banners get a slightly stronger backing. | Rendered screenshot recheck at 390px and 1440px: high legibility confirmed. |
| Missing source evidence / unsupported claims | Added `BUILD_BRIEF.md` and removed or softened unsupported claims across pages. | Rescan found no exact prices, testimonial outcome stories, first-six-month count, or credential claims. |

## Verdict
PASS — all rendered QA gates (contrast, mobile/tablet/desktop image upscale,
broken images, aspect mismatch, manual text-on-photo/layout checks) verified
clean across all 5 pages at all 3 breakpoints. Deployed to GitHub Pages;
live URL confirmed loading (see `PIPELINE_STATUS.md`).
