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

## [18-11-2026 14:50] — Kisan Mitra policy moved to /apps/kisan-mitra/privacy-policy; Privacy Policy button

**What changed:**
- The Kisan Mitra farmer app policy is now at `/apps/kisan-mitra/privacy-policy`, the same `/apps/<id>/privacy-policy` format as the Transporter and Machinery Rental apps. Its content moved to `kisan-mitra-content.ts` (text unchanged, title now "Kisan Mitra — Privacy Policy").
- Old `/privacy-policy` now redirects (307, `next.config.ts`) to the new URL; its page and proxy entry were removed.
- The "Privacy Policy" link on app detail pages is now a pill button (shield icon) beside the Download button, in the About section and in the final banner. It shows on `kisan-mitra`, `logistics` and `machinery-rental`.
- Footer "Privacy" link, sitemap and all cross-links point to the new URL.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/kisan-mitra-content.ts` (moved from `privacy-policy/policy-content.ts`)
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx`
- `src/app/[lang]/apps/[id]/privacy-policy/logistics-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/machinery-rental-content.ts`
- `src/app/[lang]/privacy-policy/page.tsx` (removed)
- `src/app/[lang]/apps/[id]/page.tsx`
- `src/app/[lang]/apps/apps-data.ts`
- `src/app/[lang]/delete-account/page.tsx`
- `src/app/[lang]/Footer.tsx`
- `src/app/[lang]/legal-ui.tsx` (comment only)
- `src/app/sitemap.ts`
- `src/proxy.ts`
- `next.config.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: three policy URLs 200 (no redirect under a Marathi cookie), `/privacy-policy` 307 to the new URL, `/mr/...` and `/apps/storage/privacy-policy` 404, button present on the three app pages only.
- Apps without a policy (storage, mandi, labor-provider, supermart-pos, doctor-provider, staff-app) show no button: no audited facts exist to write their policy from. Add content to `POLICIES` and an entry in `PRIVACY_POLICY_HREF` to enable one.
- The Hinglish draft pasted on 18-11-2026 was NOT merged; the audited-facts version is unchanged.
- Button styling was not checked visually in a browser.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [18-11-2026 15:05] — RKF Machinery Owner policy rewritten from the new draft; delete pages moved to /apps/<id>/delete-account

**What changed:**
- Machinery policy rewritten (English) from the company's new "RKF Machinery Owner" draft (package `com.rkfglobal.machinery_owner`): 10 sections, no location / microphone / map search, Firebase Cloud Messaging as a partner, 7-day deletion (marked to confirm). It replaces the earlier 17-section text for this app. No "Data safety" box on this page (the draft keeps that table for the Play form only); the box is now optional in `PolicyDocument`.
- Machinery policy URL is `/apps/machinery/privacy-policy` (as in the draft), not `/apps/machinery-rental/...`; the latter redirects. The "Privacy Policy" button on the Machinery Rental app page points to the new URL.
- Delete-account pages moved to the same format as the policies: `/apps/kisan-mitra/delete-account`, `/apps/logistics/delete-account`, `/apps/machinery/delete-account` (one dynamic route, config per app). Old `/delete-account`, `/delete-account/logistic`, `/delete-account/machinery` redirect (307, `next.config.ts`). The Machinery page adds a "Before you ask" section (settle wallet money, dues, open bookings) and a note that only the machinery owner account is deleted.
- Cross-links, sitemap and the proxy's English-only rule (`/apps/<id>/(privacy-policy|delete-account)`) updated.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/machinery-content.ts` (new; replaces `machinery-rental-content.ts`)
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx`
- `src/app/[lang]/apps/[id]/privacy-policy/kisan-mitra-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/logistics-content.ts`
- `src/app/[lang]/apps/[id]/delete-account/page.tsx` (new; replaces `delete-account/page.tsx` and `delete-account/[app]/page.tsx`)
- `src/app/[lang]/legal-ui.tsx`
- `src/app/[lang]/apps/apps-data.ts`
- `src/app/sitemap.ts`
- `src/proxy.ts`
- `next.config.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: all six legal URLs 200 (no redirect under a Marathi cookie); old URLs redirect; `/mr/...`, `/apps/storage/delete-account` and `/apps/machinery-rental/delete-account` 404; no broken internal link on the six pages; Data safety box absent on Machinery, present on the other two policies.
- The draft says the deletion page verifies the mobile number by OTP and takes a request, and that the app has Profile → Delete account. Neither exists: the delete page only describes an email process, and the in-app line is marked `[CONFIRM]`. Do not publish that line until the feature is built.
- Google Fonts / ML Kit were in the earlier audit but not in the draft; kept as one `[CONFIRM]` line.
- The draft's Play Data Safety table was not put on the page (it is for the Play Console form).

**Branch:** `zoya-kisan-mitra-add-privacy-policy`
