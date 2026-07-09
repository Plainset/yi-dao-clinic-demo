# QA Report

Fresh independent REVIEW for Yi Dao Clinic on 2026-07-09. FIX pass updated 2026-07-09.

## Pages Checked
- `index.html`
- `about.html`
- `treatments.html`
- `testimonials.html`
- `contact.html`

## Audit Results
| Check | Result | Evidence |
|---|---|---|
| Contrast audit | BLOCKED - rerun unavailable in FIX | FIX changed `.hero__eyebrow` to white text with dark local backing, text-shadow and stronger page-banner backing. Required rendered contrast script could not be rerun: local preview server failed with `PermissionError: [Errno 1] Operation not permitted`, escalation was rejected by app usage limit, and in-app browser blocks `file://` pages by URL policy. |
| Upscale mobile | BLOCKED - rerun unavailable in FIX | Required rendered mobile audit could not be rerun for the same browser/server access reasons above. Static check confirms referenced image files exist. |
| Upscale tablet | BLOCKED - rerun unavailable in FIX | Required rendered tablet audit could not be rerun for the same browser/server access reasons above. Static check confirms referenced image files exist. |
| Upscale desktop | BLOCKED - rerun unavailable in FIX | FIX removed the two known desktop banner violations: `about.html` banner now uses `assets/img/reception.jpeg` native 1280x854; `testimonials.html`/Patient Notes banner now uses `assets/img/Dispensary-Pic.jpg` native 1753x1240. Required rendered desktop audit could not be rerun. |
| Broken images | PASS static / rendered blocked | Static shell reference check found no missing `src` or `data-full` assets. Rendered browser audit could not be rerun in FIX. |
| Aspect mismatch advisory | BLOCKED - rerun unavailable in FIX | Previous REVIEW found no aspect mismatch advisories, but FIX could not rerun the rendered audit after changes. |

## Manual Checks
| Check | Result | Notes |
|---|---|---|
| Text on photo | FIX APPLIED / rendered recheck blocked | `.hero__eyebrow` is now white with dark pill backing and text-shadow; page-banner eyebrow gets a stronger backing. Rendered visual recheck was blocked by local preview/browser policy limits. |
| Gradient/::before backgrounds | FIX APPLIED / rendered recheck blocked | Hero/page-banner scrims remain real gradients over photo backgrounds; eyebrow contrast was strengthened in CSS. Manual rendered screenshot recheck was blocked by local preview/browser policy limits. |
| Image/content match | PASS | Local contact-sheet review: room, practitioner, acupuncture, Tuina, herb, reception/corridor, calligraphy and abdominal-chart images match adjacent copy. No obvious third-party watermark seen in the local image set. |
| Fabricated claims | FIX APPLIED | Added `BUILD_BRIEF.md`. Removed/softened exact prices, patient outcome quotes, first-six-month session count, practitioner credentials, medical efficacy wording, detailed parking/transport claims, room-rental claims and unsupported date/stat claims. |
| Mobile layout | BLOCKED - rerun unavailable in FIX | Previous REVIEW passed mobile layout. FIX could not rerun rendered mobile checks after changes. |

## Blocking Issues
| Issue | Evidence | Required fix |
|---|---|---|
| Desktop banner image upscale: `about.html` | `about.html:48` uses `assets/img/photo-2.jpg` in `.page-banner`; desktop audit at 1440x900 renders 1425x314 from native 1035x987, ratio 1.38 > 1.3. | Cap page-banner image rendered width/height for this asset, use a larger source, swap to a larger image, or redesign the about banner so this photo is not stretched beyond native width. Re-run desktop upscale audit. |
| Desktop banner image upscale: `testimonials.html` | `testimonials.html:48` uses `assets/img/JPW2883_0707.jpeg` in `.page-banner`; desktop audit at 1440x900 renders 1425x398 from native 1022x680, ratio 1.39 > 1.3. | Cap page-banner image rendered width/height for this asset, use a larger source, swap to a larger image, or redesign the testimonials banner so this photo is not stretched beyond native width. Re-run desktop upscale audit. |
| Missing fact/source evidence | `BUILD_BRIEF.md` is absent. Risky specific claims include founder qualifications/training (`about.html:78-89`), team credentials and numbers (`about.html:101-154`), price list (`treatments.html:167-301`), medical efficacy claims (`treatments.html:67`, `treatments.html:80-81`, `treatments.html:111-128`), first-six-month sessions and testimonials (`index.html:167-195`, `testimonials.html:53-83`). | Create/reconstruct `BUILD_BRIEF.md` from official Yi Dao controlled sources only, record sources for all specific claims/assets, then remove or soften anything not evidenced. |
| Weak small text over photo banners | Final screenshots and computed style show `.hero__eyebrow` uses cinnabar-light over image/scrim banners; it is hard to read on mobile home and desktop testimonials. | Make banner eyebrow text white/near-white, add a darker local backing, or strengthen scrim/text-shadow for eyebrow specifically. Recheck mobile and desktop text-on-photo legibility. |

## Advisory Issues
- The build is 5 pages and fact-dense; once the source cache exists, consider cutting any unsupported medical/pricing/team claims rather than spending time proving marginal copy.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| Not fixed in REVIEW | n/a | n/a |
| Desktop banner image upscale: `about.html` | Swapped page banner from `assets/img/photo-2.jpg` (1035x987) to `assets/img/reception.jpeg` (1280x854). | Static source check confirms `about.html` banner no longer uses `photo-2.jpg`; rendered upscale rerun blocked by local preview/browser policy. |
| Desktop banner image upscale: `testimonials.html` | Converted page to Patient Notes and swapped page banner from `assets/img/JPW2883_0707.jpeg` (1022x680) to `assets/img/Dispensary-Pic.jpg` (1753x1240). | Static source check confirms page banner no longer uses `JPW2883_0707.jpeg`; rendered upscale rerun blocked by local preview/browser policy. |
| Weak `.hero__eyebrow` over photo banners | Shared CSS now uses white text, dark translucent pill, box-shadow and text-shadow; page banners get a slightly stronger backing. | Static CSS check confirms fix is in shared stylesheet; rendered contrast/text-on-photo recheck blocked by local preview/browser policy. |
| Missing source evidence / unsupported claims | Added `BUILD_BRIEF.md` and removed or softened unsupported claims across pages. | `rg` scan found no exact prices, testimonial outcome stories, first-six-month count, credential claims, or specific treatment-efficacy wording from review examples. |

## Verdict
BLOCKED - fixes applied, but required rendered mobile/tablet/desktop image and contrast gates could not be rerun in this environment, so deploy/outreach should wait.
