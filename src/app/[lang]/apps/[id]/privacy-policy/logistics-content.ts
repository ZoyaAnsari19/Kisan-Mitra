import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Logistics (Transporter) app
 * (package com.rkfglobal.transporter). The wording is the company's draft of
 * 20-11-2026, checked against the app and backend code, kept as written. Only
 * the "Notes for Moin" box and the Play Data Safety table of the draft are left
 * out: they are not part of the public policy. This page has no Data safety box.
 *
 * Things in this text that are NOT true yet — do not publish until they are:
 *  - Background tracking: the policy is written for the "A8" behaviour (a
 *    foreground service with a notification; tracking continues when the driver
 *    switches apps or locks the screen during a trip; no ACCESS_BACKGROUND_LOCATION).
 *    Today the code is foreground-only. If A8 is not built before release, change
 *    section 3 back to "only while the app is open". Play also needs the
 *    foreground-service declaration and a demo video.
 *  - "Trail points are deleted 90 days after delivery": no purge job exists in the
 *    backend today, so trail points stay forever. Publish that sentence (sections
 *    3 and 5) only after the purge job is built and deployed.
 *  - "Profile → Delete account" and the OTP check on the delete page: the backend
 *    delete feature does not cover the transporter yet, and neither exists on the
 *    site.
 *
 * Firebase Analytics IS on in this app (the transporter build.gradle.kts has the
 * firebase-analytics dependency), so sections 2 and 4 disclose it. If the
 * developer removes that gradle line, delete the Analytics row (section 2) and
 * the Analytics line (section 4).
 *
 * Push: there is no firebase_messaging, so no push and no notification token
 * today. After the push branch merges, add "notification token" to section 2 and
 * "Google Firebase Cloud Messaging" to section 4.
 *
 * Other draft notes: matching uses the owner's registered village, not the
 * vehicle's GPS; the manifest declares READ_MEDIA_IMAGES, which Google Play
 * restricts (the developer is asked to remove it); the owner may enter a driver's
 * name, mobile and photo, so section 2 asks them to make sure the driver agrees.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" logistics-content.ts
 */

export const POLICY_TITLE = "RKF Logistics — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Logistics (package com.rkfglobal.transporter)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "RKF Logistics is for **transporters and drivers** who own or run goods vehicles (tractor-trolleys, pick-ups, trucks and similar) and want to carry farmers' produce and goods. Through the app you register your vehicles, receive trip requests, collect and deliver goods with OTP codes, share the trip's location with the farmer, and view your earnings, wallet and withdrawals. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have.",
      },
    ],
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    blocks: [
      {
        type: "table",
        head: ["Data", "Why"],
        rows: [
          [
            "**Mobile number**",
            "Login (one-time password) and identification.",
          ],
          [
            "**Name, email (optional), date of birth, gender, village / taluka / district, address, PIN code, emergency contact (optional), profile photo, language**",
            "To create your account and match you with trips in your area.",
          ],
          [
            "**Identity details:** Aadhaar number and PAN number, photos of Aadhaar (front and back) and PAN, and driving licence (number, expiry date, photo)",
            "KYC verification. Stored encrypted.",
          ],
          [
            "**Vehicle details:** vehicle number, type, body, model, capacity, photos, RC (registration) photo, insurance number and photo, permit photo",
            "To list and verify your vehicle and show the right vehicle to farmers.",
          ],
          [
            "**Driver details (optional):** name, mobile number and photo of the person who drives the vehicle",
            "So the farmer knows who is coming. See the note below.",
          ],
          [
            "**Trip data:** pickup and delivery places, date and time, goods, fare, the pickup and delivery OTP codes, status, ratings",
            "To carry out the trip, bill it and settle disputes.",
          ],
          [
            "**Location while a trip is under way:** your phone's GPS position and speed",
            "So the farmer can follow the trip on a map. See section 3 for how it works.",
          ],
          [
            "**Photos and files** you choose (camera or gallery)",
            "KYC, vehicle, complaints, chat attachments, wallet top-up proof.",
          ],
          [
            "**Camera**",
            "Only when you take a photo or scan a wallet QR code.",
          ],
          [
            "**Bank account details:** account holder name, account number, IFSC, bank name (optional), UPI ID (optional)",
            "To pay out wallet withdrawals.",
          ],
          [
            "**Wallet records:** top-ups, transfers, earnings, commission, dues, withdrawals",
            "To provide the service, keep accounts and meet legal requirements.",
          ],
          [
            "**Chats, complaints and support tickets** (including voice notes a farmer sends you)",
            "To help you and resolve disputes.",
          ],
          [
            "**Device information and app usage** (an app-instance ID, device model, Android version, app version and basic usage such as screens opened), collected automatically by Google Firebase Analytics",
            "To keep the app working and understand how it is used.",
          ],
        ],
      },
      {
        type: "p",
        text: "**Driver details:** if you enter another person's name, mobile number or photo as the driver, please make sure they agree. We show them to the farmer for a trip you have accepted.",
      },
      {
        type: "p",
        text: "**Microphone:** the app does not use your microphone. It can only play voice notes that others send you.",
      },
      {
        type: "p",
        text: "We ask only for data needed to provide the service. You can turn off camera or location permission at any time in phone settings. Photo and QR scan will then not work. If you turn off location, trips still work, but the farmer cannot follow the vehicle on the map.",
      },
    ],
  },
  {
    id: "location-in-this-app",
    title: "Location in this app",
    blocks: [
      {
        type: "ul",
        items: [
          "**When:** only while a trip you accepted is under way. During a trip the app keeps working if you switch to another app (for example a navigation app) or lock the screen, and a notification on your phone shows that sharing is on. It stops when the trip ends, is cancelled, or you log out. The app does **not** read your location between trips, and never when you have not started a trip.",
          "**How:** the app asks your phone for its position and sends it to our server after the vehicle has moved about 25 metres, at most once every 30 seconds.",
          "**What we keep:** the **latest** position of your vehicle, replaced each time a new one arrives. Once the goods are on board, we also keep a **trail**: about one point per minute (position, speed and time) until delivery.",
          "**Who sees it:** the farmer whose trip it is, you, and RKF staff who handle that trip. It is not shown to other farmers or other transporters.",
          "**Why:** the farmer follows the trip; staff and you use the trail to resolve a dispute about a route or a delay.",
          "**How long:** trail points are deleted **90 days after delivery**. The latest position is replaced by the next one and is not kept as a history.",
          "**Your matching for new trips** uses the village registered on your profile, not your live location.",
          "**Maps:** see “Maps: Mapbox” in section 4.",
        ],
      },
    ],
  },
  {
    id: "who-we-share-data-with",
    title: "Who we share data with",
    blocks: [
      {
        type: "ul",
        items: [
          "**The farmer with a booking:** your name, profile photo, vehicle details and number, driver name / mobile / photo (if added) and your mobile number for a trip you have accepted. During the trip the farmer sees the vehicle's position. Your Aadhaar, PAN, driving licence and bank details are never shown to farmers. Likewise, you see a farmer's name, mobile number and trip places for trips you are assigned.",
          "**RKF staff** (VLE, VLM, DLO, TEO, administrators): may view your profile, KYC, vehicles and trips to assist and verify. Each staff member sees only data for their own area.",
          {
            text: "**Service providers working for us**, who may not use your data for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (KYC documents and photos are stored privately and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
              "**Analytics: Google Firebase Analytics** (app-instance ID, device and usage information, as in section 2). Google handles this under its own privacy policy.",
              "**Maps: Mapbox.** The map picture (tiles) loads directly from Mapbox to your phone, so Mapbox can see your phone's IP address and the map area you view. When we work out a trip's distance and drive time, our server sends the pickup and delivery points to Mapbox. We remove location and search text from our server logs. Mapbox handles this under its own privacy policy.",
            ],
          },
          "**Authorities:** when required by law or a court order.",
        ],
      },
    ],
  },
  {
    id: "how-long-we-keep-data",
    title: "How long we keep data",
    blocks: [
      {
        type: "ul",
        items: [
          "While your account is active.",
          "**Trip location trail:** 90 days after delivery (see section 3).",
          "**If you delete your account**, your personal data (name, mobile number, address, photos, KYC documents, bank details) is removed or anonymised. Your vehicles are set to **inactive** and their personal details and photos are removed.",
          "**However**, financial records (wallet, trips, fares, commission, payments) must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without your name and mobile number wherever possible.",
          "KYC documents are kept while your account is active and for **[FILL]** after deletion where the law requires.",
        ],
      },
    ],
  },
  {
    id: "your-rights-and-choices",
    title: "Your rights and choices",
    blocks: [
      {
        type: "p",
        text: "You may:",
      },
      {
        type: "ul",
        items: [
          "View and correct your information (Profile in the app).",
          {
            text: "**Delete your account and data:**",
            children: [
              "In the app: **Profile → Delete account**.",
              "Without the app: {{https://kisan.kalakar.tv/apps/logistics/delete-account|/apps/logistics/delete-account}} (verify with your mobile number OTP), or email [FILL: email].",
              "You submit a **request**. Our team reviews and completes it within **7 days**. Deletion cannot be undone. We cannot complete it while you have wallet balance, dues, pending top-ups or withdrawals, an open trip, or an active suspension; these must be cleared first.",
              "Only your **transporter** account is deleted. Accounts in other RKF services (for example Kisan Mitra) are not affected.",
            ],
          },
          "Withdraw consent by turning off camera or location permission.",
          "Make a complaint (see section 10).",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    blocks: [
      {
        type: "p",
        text: "Data is sent over HTTPS. Aadhaar and PAN numbers are stored encrypted. Access is limited to authorised people and significant changes are logged. No system is 100% secure. Never share your OTP or transaction PIN.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "This app is not intended for anyone under 18.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes",
    blocks: [
      {
        type: "p",
        text: "If we change this policy we will publish the new version in the app and on this page and update the effective date.",
      },
    ],
  },
  {
    id: "contact-and-grievances",
    title: "Contact and grievances",
    blocks: [
      {
        type: "p",
        text: "**Grievance Officer:** [FILL: name]",
      },
      {
        type: "p",
        text: "**Email:** [FILL]  **Phone:** [FILL]  **Address:** [FILL]",
      },
      {
        type: "p",
        text: "We respond within [FILL: suggested 30] days.",
      },
    ],
  },
];
