import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Storage Provider app
 * (package com.rkfglobal.storage_provider). The wording is the company's draft
 * of 19-11-2026, checked against the app and backend code, kept as written.
 * Only the "Notes for Moin" box and the Play Data Safety table of the draft are
 * left out: they are not part of the public policy.
 *
 * Push notifications: the app has no push today (Firebase is never started and
 * there is no firebase_messaging), so this policy does NOT mention push or a
 * device token. When the push branch is merged and the merged manifest is
 * re-checked, add to section 2 "Device information and notification token: to
 * send booking and payment notifications", and to section 4 "Google Firebase
 * Cloud Messaging (notification token, device ID)", and the same in Data Safety.
 *
 * The delete-account text assumes the storage_owner delete work is deployed:
 * "Profile → Delete account" and the OTP check on the delete page do not exist
 * yet. Do not publish this page before they are live.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" storage-content.ts
 */

export const POLICY_TITLE = "RKF Storage Provider — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Storage Provider (package com.rkfglobal.storage_provider)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "RKF Storage Provider is for people who own a godown, cold storage or open yard and want to offer storage space to farmers. Through the app you list your facility, receive bookings, record goods received and released, and view bills, your wallet and withdrawals. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have.",
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
            "**Name, village / taluka / district, address, language**",
            "To create your account and connect you with farmers in your area.",
          ],
          [
            "**Identity details:** Aadhaar number and PAN number, photos of Aadhaar (front and back) and PAN",
            "KYC verification. Stored encrypted.",
          ],
          [
            "**Facility details:** name, type, capacity, address, **map pin (latitude/longitude)**, photos, and papers such as ownership deed or lease, electricity bill and (optional) WDRA registration",
            "To list, verify and show your facility to farmers.",
          ],
          [
            "**Location (GPS)**",
            "Only when you tap **“Use my location”** while setting your godown pin. A one-time reading, only while the app is open. Never in the background and never continuous.",
          ],
          [
            "**Booking data:** the farmer's name, village and mobile number (after you accept), produce, quantity, dates, bills and OTPs",
            "To complete bookings, receive and release goods, and keep accounts.",
          ],
          [
            "**Goods records** (inward details, weighment, sack count, photos)",
            "To establish responsibility for stored goods.",
          ],
          [
            "**Photos and files** you choose (camera or gallery)",
            "KYC, facility papers, goods, complaints, chat attachments, wallet top-up proof.",
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
            "**Wallet records:** top-ups, transfers, bills, payments, withdrawals, penalties",
            "To provide the service, keep accounts and meet legal requirements.",
          ],
          [
            "**Chats, complaints and support tickets**",
            "To help you and resolve disputes.",
          ],
          [
            "**Warnings / strikes** on your account (for example backing out of a booking at short notice)",
            "To keep the service reliable for farmers.",
          ],
        ],
      },
      {
        type: "p",
        text: "We ask only for data needed to provide the service. You can turn off camera and location permission at any time in phone settings. Photo, QR scan and “Use my location” will then not work, but you can still set the pin by moving the map by hand or searching for a place, and the rest of the app keeps working.",
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
          "Show your facility to farmers, take bookings and release goods (with OTP).",
          "Keep accounts of bills, rent, wallet, penalties and withdrawals.",
          "Verify KYC and facilities, and prevent fraud.",
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
          "**The farmer with a booking:** your name, facility details (name, address, photos) and your mobile number for a booking you have accepted. Your Aadhaar, PAN and bank details are never shown to farmers. In the same way, a farmer's mobile number is shown to you only for a booking you accept; before that, offers show no number.",
          "**RKF staff** (VLE, VLM, DLO, TEO, administrators): may view your profile, KYC, facility and bookings to assist and verify. Each staff member sees only data for their own area.",
          {
            text: "**Service providers** that process data for us and may not use it for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (KYC documents, facility papers and photos are stored there in private form and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
              "**Maps: Mapbox.** The map picture (tiles) loads directly from Mapbox to your phone, so Mapbox can see your phone's IP address and the map area you view. When you search for a place or let the app name a pin, your request goes through our server to Mapbox and includes the text you typed and a nearby location (your pin or phone location) so results are local. We remove location and search text from our server logs. Mapbox handles this under its own privacy policy.",
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
          "**If you delete your account**, your personal data (name, mobile number, address, photos, KYC documents, bank details) is removed or anonymised. Your facility is set to **inactive** and its name, address, photos, documents and map pin are removed.",
          "**However**, financial records (wallet, bookings, bills, penalties, payments) must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without your name and mobile number wherever possible.",
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
              "Without the app: {{https://kisan.kalakar.tv/apps/storage/delete-account|/apps/storage/delete-account}} (verify with your mobile number OTP), or email [FILL: email].",
              "You submit a **request**. Our team reviews and completes it within **7 days**. Deletion cannot be undone. We cannot complete it while you have wallet balance, dues, penalties, pending top-ups or withdrawals, an open booking, farmers' goods still stored in your facility, or an active suspension; these must be cleared first.",
              "Only your **storage owner** account is deleted. Accounts in other RKF services (for example Kisan Mitra) are not affected.",
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
