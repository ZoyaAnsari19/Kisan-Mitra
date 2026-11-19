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

## [19-11-2026 12:26] — RKF Storage Provider app Privacy Policy and Delete Account pages

**What changed:**
- Added the RKF Storage Provider policy at `/apps/storage/privacy-policy` and the delete page at `/apps/storage/delete-account`, from the company's draft (package `com.rkfglobal.storage_provider`). English only; 10 sections, no "Data safety" box (the draft keeps that table for the Play form).
- Differences from the Machinery Owner policy, as in the draft: one-time location (foreground only) for the godown's map pin, map tiles from Mapbox straight to the phone, place search through our server, godown goes inactive on deletion, and extra delete conditions (a farmer's goods still in the godown, suspended account).
- Push notifications are not in the app yet (the Firebase / push branch is still to be merged), so the notification-token row and the Firebase Cloud Messaging point are marked `[CONFIRM]`; remove both if the policy goes live before that merge.
- The "Privacy Policy" button now also shows on `/apps/storage`. The other three policy intros link to the Storage policy; sitemap updated. The Storage delete page uses the same `/apps/<id>/delete-account` route as the others (new config entry).

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/storage-content.ts` (new)
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx`
- `src/app/[lang]/apps/[id]/privacy-policy/kisan-mitra-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/logistics-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/machinery-content.ts`
- `src/app/[lang]/apps/[id]/delete-account/page.tsx`
- `src/app/[lang]/apps/apps-data.ts`
- `src/app/sitemap.ts`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check: both Storage URLs 200 (no redirect under a Marathi cookie); `/mr/...` and `/apps/mandi/...` 404; button present on `/apps/storage` only of the checked pages (not `/apps/mandi`); no broken internal link across the eight legal pages; no Data safety box on the Storage policy.
- The draft says the delete page verifies the mobile number by OTP, and that the app has Profile → Delete account. Neither exists (the delete page describes an email process); the in-app line is marked `[CONFIRM]`. The draft's internal screen name was left out of the public text.
- The draft's claim that search logs hide location and text, and that Mapbox may receive latitude/longitude, are folded into one `[CONFIRM]`.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [19-11-2026 12:35] — /apps grid: "Coming Soon" pill replaced by the Download button on every card

**What changed:**
- `storage` and `labor-provider` (Man Power) are now `status: "live"` in `APPS_META`; both APK URLs already existed and respond 200. Their cards on `/apps` show a real "Download Now" link, and their detail pages show the Live badge and a real Download button.
- SuperMart, Kisan Mitra Vaidya and the Staff app have no APK URL, so their cards show the same "Download Now" pill as a button without a link; clicking it flashes a small "Coming Soon" popup for 2 seconds (same behaviour as the detail-page button). No "Coming Soon" pill is left on the grid.
- `GridDownloadLink` now takes an optional `href`; with it, it is a download link, without it a popup button. The staff-app card (which had its own pill) uses it too.

**Files touched:**
- `src/app/[lang]/apps/GridDownloadLink.tsx`
- `src/app/[lang]/apps/page.tsx`
- `src/app/[lang]/apps/apps-data.ts`

**API endpoints used:**
- `HEAD https://api.rkf.co.in/downloads/<app>.apk` (6 existing APK URLs, only to confirm they respond; nothing downloaded)

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. Production server check on `/apps` and `/mr/apps`: 6 real APK links, 3 popup buttons, none of the old Coming Soon pills; all five former coming-soon detail pages return 200.
- Kisan Mitra Vaidya's own description still says it is "a coming-soon preview, not a live consultation service" and SuperMart's FAQ mentions "coming soon" for card/UPI stock payment. The copy was not changed; it now sits beside a Download button.
- Whether the Storage and Man Power APKs are release-ready was not checked; only that the URLs respond. The button look was not checked in a browser.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [19-11-2026 15:20] — Storage Provider privacy policy updated to the 19-11-2026 revised draft

**What changed:**
- Rewrote the Storage Provider policy text from the revised draft (checked against app and backend code on 19-11-2026). Push notifications are no longer mentioned: the notification-token row and the Firebase Cloud Messaging line are removed, since the app has no push today. The Google Fonts / ML Kit line is also removed, as the revised draft drops it.
- Added: Hostinger as the host (server region is a placeholder), Cloudinary private storage with time-limited links, the full Mapbox explanation, WDRA/deed/lease/electricity-bill facility papers, bank-detail fields, the warnings (strikes) row, the rule that a farmer's number shows only for an accepted booking, and the "move the map by hand or search" fallback when location is off.
- Delete-account section: the list of what blocks deletion now also includes pending top-ups or withdrawals. The same wording was added to the Storage delete-account page.
- Removed the `[CONFIRM]` marks the revised draft settled (Aadhaar/PAN, bank proof, pin by hand, the farmer-sharing rule, the facility-inactive rule, children, "do not sell").

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/storage-content.ts`
- `src/app/[lang]/apps/[id]/delete-account/page.tsx`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. `/apps/storage/privacy-policy` and `/apps/storage/delete-account` return 200; `/mr/...` is 404.
- Still open (placeholders): legal entity name, registered address, contact email and phone, effective date, SMS gateway, server country/region, retention periods (financial records, KYC), grievance officer name/email and reply days. Two `[CONFIRM]` remain: the in-app "Profile → Delete account" line (the app has no such feature yet) and "7 days".
- The draft says the delete page verifies by mobile OTP. The delete page still describes an email process with its own `[CONFIRM]` for OTP, so the OTP wording on the policy is not yet true. The draft also says not to publish before the backend delete work is live.
- The draft's Play Data Safety table is not part of the page; it was not added.
- When the push branch is merged, add the notification-token row and the FCM line back (noted in the file's header comment).

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [19-11-2026 15:52] — Storage Provider policy: company draft used word for word

**What changed:**
- Replaced the Storage Provider policy content with the pasted RKF Storage Provider draft, kept as written (section titles, table rows, bullets, "[FILL]" placeholders). It replaces my earlier reworded version of the same draft.
- Left out of the page: the "Notes for Moin" box and the Play Data Safety table (not part of the public policy). The "Using another Kisan Mitra app?" cross-links were dropped from this page; the draft has none.
- `Rich` in `legal-ui.tsx` now supports `**bold**` (it may contain a `[PLACEHOLDER]`), because the draft uses bold. No existing text used it, so other legal pages are unchanged.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/storage-content.ts`
- `src/app/[lang]/legal-ui.tsx`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. All four policy pages return 200.
- The draft's "In the app: Profile → Delete account" and "verify with your mobile number OTP" are now shown without `[CONFIRM]`, as in the draft. Neither exists yet (the app has no in-app delete; the delete page describes an email process), so do not publish before the backend delete work is live.
- "[FILL: e.g. 8 years]" is shown as the draft's placeholder; "8 years" is an example, not a decision.
- The page heading still says "Last updated:" (shared layout) where the draft says "Effective date".
- Push, device token and Firebase are not mentioned, as in the draft (re-add after the push branch merges; see the file header).

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [19-11-2026 16:07] — Machinery Owner policy: company draft used word for word

**What changed:**
- Replaced the Machinery Owner policy content with the pasted RKF Machinery Owner draft (checked against the app and backend on 19-11-2026), kept as written: section titles, table rows, bullets, `[FILL]` placeholders and bold. It replaces the earlier version built from the older draft.
- Left out of the page: the "Notes for Moin" box and the Play Data Safety table. The "Using another Kisan Mitra app?" cross-links were dropped from this page, as in the draft.
- Delete-account page for Machinery: the "what happens to your machine listings" `[CONFIRM]` is now the draft's rule (listings made inactive, personal details and photos removed), and the "before you ask" list also includes a pending top-up or withdrawal and a suspended account.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/machinery-content.ts`
- `src/app/[lang]/apps/[id]/delete-account/page.tsx`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. All four policy pages and four delete pages return 200; `/mr/...` is 404.
- The draft's "In the app: Profile → Delete account" and "verify with your mobile number OTP" are shown without `[CONFIRM]`, as in the draft. Neither exists yet (the app has no in-app delete; the delete page describes an email process), so do not publish before the backend delete work is live.
- Firebase Cloud Messaging and the notification-token row are kept, as in the draft; they must be removed if the developer's merged-manifest report shows Firebase fully absent (see the file header).
- "[FILL: e.g. 8 years]" is the draft's placeholder; "8 years" is an example, not a decision. The page heading still says "Last updated:" where the draft says "Effective date".

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [19-11-2026 17:00] — Kisan Mitra policy: company draft used word for word

**What changed:**
- Replaced the Kisan Mitra (farmer app) policy content with the pasted draft (checked against the app and backend on 19-11-2026), kept as written: section titles, table rows, bullets, `[FILL]` placeholders and bold. It replaces the earlier 16-section version.
- Left out of the page: the "Notes for Moin" box and the Play Data Safety table. The old "Data safety summary" box on this page and the "Using a partner app?" cross-links are gone too (the draft has neither), so `dataSafety` is no longer passed for Kisan Mitra in `privacy-policy/page.tsx`. The Transporter page still has its box.
- Delete-account page for Kisan Mitra: the erased list now follows the draft (name, mobile number, address, photos, KYC and land documents, bank details), the "before you ask" list has unpaid udhaar or dues, pending top-ups or withdrawals, and open bookings or orders, and a line says only the farmer account is deleted.

**Files touched:**
- `src/app/[lang]/apps/[id]/privacy-policy/kisan-mitra-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx`
- `src/app/[lang]/apps/[id]/delete-account/page.tsx`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. All four policy and four delete pages return 200; `/mr/...` is 404; `/privacy-policy` still redirects to `/apps/kisan-mitra/privacy-policy`.
- The draft's "In the app: Profile → Delete account" and "verify with your mobile number OTP" are shown without `[CONFIRM]`, as in the draft. Neither exists yet (the delete page describes an email process), so do not publish before they are live.
- Weather (Open-Meteo, via our server, village coordinates) and Mapbox are in section 4 as in the draft. Push and Firebase are not mentioned (re-add after the push branch merges; see the file header).
- "[FILL: e.g. 8 years]" is the draft's placeholder; "8 years" is an example, not a decision. The page heading still says "Last updated:" where the draft says "Effective date".

**Branch:** `zoya-kisan-mitra-add-privacy-policy`

## [19-11-2026 17:32] — Policy layout now matches the drafts: Effective date, header lines, nested lists

**What changed:**
- Kisan Mitra, Machinery Owner and Storage Provider policies: the date line now reads "Effective date" (it was "Last updated"), and the App / Operator / Contact lines are shown as separate bold-labelled lines under the title, as in the drafts. The Transporter policy still says "Last updated".
- "Who we share data with" and "Your rights and choices" in those three policies now use real nested bullets (service providers under "Service providers…", the delete steps under "Delete your account and data:"), as in the drafts, instead of separate blocks.
- `legal-ui.tsx`: bullets can have an optional nested list, `PolicyDocument` takes an optional `dateLabel` and shows `intro` one line per newline. Text content of the policies is unchanged.

**Files touched:**
- `src/app/[lang]/legal-ui.tsx`
- `src/app/[lang]/apps/[id]/privacy-policy/kisan-mitra-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/machinery-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/storage-content.ts`
- `src/app/[lang]/apps/[id]/privacy-policy/page.tsx`

**API endpoints used:**
- —

**Breaking change:** NO

**Notes:**
- `npm run lint`: 0 errors (existing warnings only). `npm run build`: passes. All four policy pages return 200.
- Not checked in a browser: the look of the nested bullets and the header lines.
- Still true: the draft's "Profile → Delete account" and the mobile-OTP check are not built yet; do not publish before they are live.

**Branch:** `zoya-kisan-mitra-add-privacy-policy`
