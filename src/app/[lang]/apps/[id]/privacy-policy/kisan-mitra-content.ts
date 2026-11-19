import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the Kisan Mitra farmer app
 * (package com.rkfglobal.kisan_mitra). The wording is the company's draft of
 * 19-11-2026, checked against the app and backend code, kept as written.
 * Only the "Notes for Moin" box and the Play Data Safety table of the draft are
 * left out: they are not part of the public policy. This page has no Data safety
 * box either.
 *
 * Push notifications: the app has no push today (Firebase is never started and
 * there is no firebase_messaging), so this policy does NOT mention push or a
 * device token. When the push branch is merged and the merged manifest is
 * re-checked, add "Device information and notification token" to section 2,
 * "Google Firebase Cloud Messaging" to section 4, and a "Device ID" row to Data
 * Safety.
 *
 * Screens that are not live (Krishi Sahayak AI chat, Donation, Insurance,
 * Carbon credit, Bank loan, Dairy, Energy, Water, Vet, Crop doctor) collect and
 * send nothing to our server, so they are not in this policy. If any of them
 * starts collecting data, change this policy first.
 *
 * The delete-account text assumes the farmer delete feature is live (backend
 * core-api 1.0.141) and the app screen is built. "Profile → Delete account" and
 * the OTP check on the delete page do not exist yet on the site: do not publish
 * this page before they are live.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" kisan-mitra-content.ts
 */

export const POLICY_TITLE = "Kisan Mitra — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** Kisan Mitra (package com.rkfglobal.kisan_mitra)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "Kisan Mitra is an app for farmers. With it you can register your land, see mandi prices and government schemes, book transport, farm machinery, storage and farm labour, shop from the Mini Mall, keep a wallet, buy a membership, and get help from RKF. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have.",
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
            "**Name, village / taluka / district, address, language, crops**",
            "To create your account and give you services and prices for your area.",
          ],
          [
            "**Land records:** plots, area, map pin, and documents you upload",
            "Land registration and approval.",
          ],
          [
            "**Identity details:** Aadhaar number and PAN number, and photos of Aadhaar (front and back) and PAN",
            "KYC verification. Stored encrypted.",
          ],
          [
            "**Photos and files** you choose (camera or gallery / files)",
            "KYC, land, bookings, complaints, chat attachments, wallet top-up proof.",
          ],
          [
            "**Camera**",
            "Only when you take a photo or scan a QR code.",
          ],
          [
            "**Voice notes**",
            "Only when you record and send a voice note in a chat. The app does not record unless you press the button.",
          ],
          [
            "**Location (GPS)**",
            "Only when you tap **“Use my location”** (for example to set a pickup pin). A one-time reading, only while the app is open. Never in the background and never continuous.",
          ],
          [
            "**Bank account details:** account holder name, account number, IFSC, bank name (optional), UPI ID (optional)",
            "To pay out wallet withdrawals.",
          ],
          [
            "**Wallet, bookings, orders, membership, credit (udhaar) and payment records**",
            "To provide the service, keep accounts and meet legal requirements.",
          ],
          [
            "**Booking details:** pickup and work locations, dates and times, quantities, codes",
            "To carry out and bill your bookings.",
          ],
          [
            "**Chats, complaints and support tickets**",
            "To help you and resolve disputes.",
          ],
          [
            "**Applications you make** (for example government schemes, lab tests, utility connections, events)",
            "To process what you asked for.",
          ],
          [
            "**Kisan score and activity**",
            "To work out your score and show it to you.",
          ],
        ],
      },
      {
        type: "p",
        text: "We ask only for data needed for the service you use. You can turn off camera, microphone or location permission at any time in phone settings. Those features then will not work, but the rest of the app does. You can also set a map pin by moving the map by hand or searching for a place.",
      },
    ],
  },
  {
    id: "how-we-use-data",
    title: "How we use data",
    blocks: [
      {
        type: "ul",
        items: [
          "Create your account and log you in.",
          "Complete your bookings and orders and connect you with the provider.",
          "Keep accounts of your wallet, udhaar, membership and withdrawals.",
          "Verify KYC and land, and prevent fraud.",
          "Send essential in-app notifications and OTPs.",
          "Handle support requests, complaints and disputes.",
          "Improve and secure the app.",
        ],
      },
      {
        type: "p",
        text: "We **do not sell** your data and we **do not use it for advertising**.",
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
          "**Service providers you book** (transporters, machinery owners, godown owners, labour contractors, and Mini Mall shops): the details needed to do the job, such as your name, pickup or work place, and booking details. Your mobile number is shown to a provider only for a booking they have accepted. Your Aadhaar, PAN and bank details are never shown to a provider.",
          "**RKF staff** (VLE, VLM, DLO, TEO, administrators): may view your profile, KYC, land and bookings to assist and verify. Each staff member sees only data for their own area.",
          {
            text: "**Service providers working for us**, who may not use your data for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (KYC documents, land documents and photos are stored privately and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
              "**Maps: Mapbox.** The map picture (tiles) loads directly from Mapbox to your phone, so Mapbox can see your phone's IP address and the map area you view. When you search for a place or let the app name a pin, your request goes through our server to Mapbox and includes the text you typed and a nearby location (your pin or phone location) so results are local. We remove location and search text from our server logs. Mapbox handles this under its own privacy policy.",
              "**Weather: Open-Meteo.** Our server asks for the weather using your village's coordinates, not your phone's location.",
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
          "**If you delete your account**, your personal data (name, mobile number, address, photos, KYC documents, land documents, bank details) is removed or anonymised.",
          "**However**, financial records (wallet, bookings, orders, membership, udhaar, payments) must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without your name and mobile number wherever possible.",
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
              "Without the app: {{https://kisan.kalakar.tv/apps/kisan-mitra/delete-account|/apps/kisan-mitra/delete-account}} (verify with your mobile number OTP), or email [FILL: email].",
              "You submit a **request**. Our team reviews and completes it within **7 days**. Deletion cannot be undone. We cannot complete it while you have wallet balance, unpaid udhaar or dues, pending top-ups or withdrawals, or an open booking or order; these must be cleared first.",
              "Only your **farmer** account is deleted. Accounts in other RKF apps are not affected.",
            ],
          },
          "Withdraw consent by turning off camera, microphone or location permission.",
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
        text: "Data is sent over HTTPS. Aadhaar and PAN numbers are stored encrypted. Access is limited to authorised people and significant changes are logged. No system is 100% secure. Never share your OTP or wallet PIN.",
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
