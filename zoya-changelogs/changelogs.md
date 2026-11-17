## [17-11-2026 17:46] — Privacy Policy and Delete Account pages

**What changed:**
- Added English-only `/privacy-policy` (16 sections, Data safety summary box, table of contents) and `/delete-account` pages.
- Unknown company values (legal entity, address, email, grievance officer, retention periods, hosting region, deletion process) are shown as highlighted `[PLACEHOLDER]` text; they must be filled in before submitting the URL to Play Console.
- Footer "Privacy" link now points to `/privacy-policy`.
- `proxy.ts`: the two legal paths never redirect to `/mr` (stable URL for Play); `/mr/privacy-policy` and `/mr/delete-account` return 404 until Marathi text exists.
- Both URLs added to the sitemap.

**Files touched:**
- `src/app/[lang]/legal-ui.tsx` (new)
- `src/app/[lang]/privacy-policy/page.tsx` (new)
- `src/app/[lang]/privacy-policy/policy-content.ts` (new)
- `src/app/[lang]/delete-account/page.tsx` (new)
- `src/app/[lang]/Footer.tsx`
- `src/proxy.ts`
- `src/app/sitemap.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm install` was run (no package.json / lockfile change) to read the Next docs and build.
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Checked on a production server: both pages 200, `/mr/...` 404, no redirect with a Marathi cookie.
- Pages are in the sitemap while placeholders remain; decide whether to hold them out until filled.
- Not done: Terms page, Hindi/Marathi text, in-app privacy link/consent, in-app account deletion.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [17-11-2026 18:01] — Transporter (Logistic) app Privacy Policy and Delete Account pages

**What changed:**
- Added English-only `/privacy-policy/logistic` (17 sections, Data safety box, prominent live-location section, Firebase Analytics disclosure) and `/delete-account/logistic`. Content is separate from the Kisan Mitra policy, as the app collects different data.
- Unknown values (app name, legal entity, contacts, retention periods, hosting region, SMS gateway, Firebase/map decisions, deletion process) are highlighted `[PLACEHOLDER]` text.
- Moved the shared policy layout and metadata into `legal-ui.tsx` (`PolicyDocument`, `legalMetadata`, `requireEnglish`); the Kisan Mitra privacy and delete pages now use them. No change to their content except a cross-link to the Transporter pages.
- `proxy.ts`: English-only handling now covers everything under `/privacy-policy` and `/delete-account` (prefix match), so the new URLs never redirect to `/mr`.
- Both new URLs added to the sitemap. Footer not changed.

**Files touched:**
- `src/app/[lang]/privacy-policy/logistic/page.tsx` (new)
- `src/app/[lang]/privacy-policy/logistic/policy-content.ts` (new)
- `src/app/[lang]/delete-account/logistic/page.tsx` (new)
- `src/app/[lang]/legal-ui.tsx`
- `src/app/[lang]/privacy-policy/page.tsx`
- `src/app/[lang]/privacy-policy/policy-content.ts`
- `src/app/[lang]/delete-account/page.tsx`
- `src/proxy.ts`
- `src/app/sitemap.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: all four pages 200, `/mr/...` variants 404, no redirect with a Marathi cookie.
- Pages are in the sitemap while placeholders remain.
- The landing-page footer has a single "Privacy" link (to the Kisan Mitra policy); the Transporter policy is linked from the policy and delete pages only.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [17-11-2026 18:10] — Privacy Policy link on the Logistics app page

**What changed:**
- `/apps/logistics` (and `/mr/apps/logistics`) now shows a "Privacy Policy" link that opens `/privacy-policy/logistic`. It appears under the download button in the About section and next to the download button in the final banner.
- The link is driven by a new `PRIVACY_POLICY_HREF` map in `apps-data.ts`; only apps listed there show a link, so other apps are unchanged.
- New dictionary key `apps.privacyPolicy` (English: "Privacy Policy", Marathi: "गोपनीयता धोरण").

**Files touched:**
- `src/app/[lang]/apps/[id]/page.tsx`
- `src/app/[lang]/apps/apps-data.ts`
- `src/i18n/dictionaries/en.json`
- `src/i18n/dictionaries/mr.json`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: link present twice on `/apps/logistics` and `/mr/apps/logistics`, absent on `/apps/machinery-rental`.
- The Marathi page links to the English-only policy. Layout was not checked visually in a browser.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [17-11-2026 18:14] — Transporter privacy policy moved to /apps/logistics/privacy-policy

**What changed:**
- The Transporter app privacy policy is now at `/apps/logistics/privacy-policy` (was `/privacy-policy/logistic`, which now returns 404; it had not been published anywhere yet).
- New route `/apps/[id]/privacy-policy` renders the policy for an app listed in its `POLICIES` map (only `logistics` today); any other app id returns 404.
- `proxy.ts`: `/apps/<id>/privacy-policy` is English-only and never redirects to `/mr`.
- Updated every link to the new URL: the "Privacy Policy" link on the Logistics app page, the Kisan Mitra policy intro, the Transporter delete-account page, and the sitemap.
- `/delete-account/logistic` was NOT moved.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx` (new)
- `src/app/[lang]/apps/[id]/privacy-policy/logistics-content.ts` (moved from `privacy-policy/logistic/policy-content.ts`)
- `src/app/[lang]/privacy-policy/logistic/page.tsx` (removed)
- `src/app/[lang]/apps/apps-data.ts`
- `src/app/[lang]/privacy-policy/policy-content.ts`
- `src/app/[lang]/delete-account/logistic/page.tsx`
- `src/proxy.ts`
- `src/app/sitemap.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: `/apps/logistics/privacy-policy` 200 (no redirect with a Marathi cookie); `/apps/machinery-rental/privacy-policy`, `/mr/apps/logistics/privacy-policy` and the old `/privacy-policy/logistic` 404; link appears twice on `/apps/logistics`.
- Use `https://kisan.kalakar.tv/apps/logistics/privacy-policy` as the Play Console privacy-policy URL for this app once the placeholders are filled.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [17-11-2026 18:20] — Machinery Rental app Privacy Policy and Delete Account pages

**What changed:**
- Added the Machinery Rental app privacy policy at `/apps/machinery-rental/privacy-policy` (17 sections, Data safety box, push-notification section, no-location statement). Separate content from the other two policies.
- Added `/delete-account/machinery`. The per-app delete pages are now one dynamic route `/delete-account/[app]` with a config per app (`logistic`, `machinery`); `/delete-account/logistic` URL and text are unchanged, an unknown app returns 404.
- The "Privacy Policy" link now also shows on `/apps/machinery-rental` (via `PRIVACY_POLICY_HREF`).
- Cross-links between the Kisan Mitra, Transporter and Machinery Rental policy and delete pages updated; both new URLs added to the sitemap.
- Unknown values (app name, legal entity, contacts, retention, hosting region, SMS gateway, deletion process) remain highlighted `[PLACEHOLDER]` text.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/machinery-rental-content.ts` (new)
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx`
- `src/app/[lang]/apps/[id]/privacy-policy/logistics-content.ts`
- `src/app/[lang]/delete-account/[app]/page.tsx` (new; replaces `delete-account/logistic/page.tsx`)
- `src/app/[lang]/delete-account/page.tsx`
- `src/app/[lang]/privacy-policy/policy-content.ts`
- `src/app/[lang]/apps/apps-data.ts`
- `src/app/sitemap.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: both new pages 200 with no redirect under a Marathi cookie; `/mr/...` variants and unknown apps 404; policy link appears twice on `/apps/machinery-rental`.
- Play Console URLs: `https://kisan.kalakar.tv/apps/machinery-rental/privacy-policy` and `https://kisan.kalakar.tv/delete-account/machinery` — only once the placeholders are filled.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`
