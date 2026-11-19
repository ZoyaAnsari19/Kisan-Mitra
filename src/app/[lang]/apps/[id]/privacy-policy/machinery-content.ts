import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Machinery Owner app
 * (package com.rkfglobal.machinery_owner). The wording is the company's draft
 * of 19-11-2026, checked against the app and backend code, kept as written.
 * Only the "Notes for Moin" box and the Play Data Safety table of the draft are
 * left out: they are not part of the public policy.
 *
 * This app takes NO location (the manifest has only CAMERA and
 * POST_NOTIFICATIONS, plus internet; no GPS, no microphone, no map). If a map or
 * GPS is added later, change this policy and Data Safety first. Do not copy text
 * between the per-app files without checking it against that app.
 *
 * Firebase / push: the app has firebase_core and firebase_messaging but no code
 * that starts Firebase or reads a token, so nothing is sent to our server today.
 * Android's Firebase components may still register the phone with Google, so the
 * policy lists Firebase Cloud Messaging. If the developer's merged-manifest
 * report shows Firebase fully absent, delete the "Device information and
 * notification token" row, the Firebase Cloud Messaging line and the Data Safety
 * "Device ID" row.
 *
 * The delete-account text assumes the machinery_owner delete work is deployed:
 * "Profile → Delete account" and the OTP check on the delete page do not exist
 * yet. Do not publish this page before they are live.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" machinery-content.ts
 */

export const POLICY_TITLE = "RKF Machinery Owner — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Machinery Owner (package com.rkfglobal.machinery_owner)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "RKF Machinery Owner is for people who own farm machinery (tractors, harvesters, rotavators and similar) and want to rent it to farmers. Through the app you list your machines, receive bookings, start and finish jobs with OTP codes, and view your earnings, wallet and withdrawals. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have.",
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
            "**Name, email (optional), date of birth, gender, village / taluka / district, address, PIN code, language**",
            "To create your account and connect you with farmers in your area.",
          ],
          [
            "**Identity details:** Aadhaar number and PAN number, photos of Aadhaar (front and back) and PAN, and driving licence (number, expiry date, photo)",
            "KYC verification. Stored encrypted.",
          ],
          [
            "**Machine details:** type, model, year, horsepower / capacity, photos, availability, and the name and mobile number of the machine operator if you add one",
            "To list and verify your machine and show it to farmers.",
          ],
          [
            "**Booking data:** the farmer's name and mobile number, work village / address / map pin, job details, times, codes",
            "To carry out the job, start and finish it with OTP, and keep accounts.",
          ],
          [
            "**Job timing records** (start and end codes, added time, overtime, interruptions)",
            "To bill the job correctly and settle disputes.",
          ],
          [
            "**Photos and files** you choose (camera or gallery / files)",
            "KYC, machine, complaints, chat attachments, wallet top-up proof.",
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
            "**Wallet records:** top-ups, transfers, earnings, commission, dues, penalties, withdrawals",
            "To provide the service, keep accounts and meet legal requirements.",
          ],
          [
            "**Chats, complaints and support tickets**",
            "To help you and resolve disputes.",
          ],
          [
            "**Warnings / strikes** on your account (for example cancelling a booking at short notice or not turning up)",
            "To keep the service reliable for farmers.",
          ],
          [
            "**Device information and notification token**",
            "To send booking and payment notifications and keep the app working.",
          ],
        ],
      },
      {
        type: "p",
        text: "**Location:** this app does **not** read your phone's location, in the foreground or the background. A farmer's work location appears with a booking; if you tap it, it opens in your phone's own map app, which works under that app's own policy.",
      },
      {
        type: "p",
        text: "**Operator details:** if you enter another person's name and mobile number as the machine operator, please make sure they agree. We show these to the farmer for a job you have accepted.",
      },
      {
        type: "p",
        text: "We ask only for data needed to provide the service. You can turn off the camera or notification permission at any time in phone settings; photo and QR scan will then not work, but the rest of the app does.",
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
          "Show your machine to farmers, take bookings, and start and finish jobs with OTP.",
          "Keep accounts of fares, added time, overtime, commission, penalties, wallet and withdrawals.",
          "Verify KYC and machines, and prevent fraud.",
          "Send essential notifications and OTPs.",
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
          "**The farmer with a booking:** your name, machine details, the operator's name and mobile (if you added one) and your mobile number for a job you have accepted. Your Aadhaar, PAN, driving licence and bank details are never shown to farmers. Likewise, you see a farmer's mobile number and work location for jobs you are assigned.",
          "**RKF staff** (VLE, VLM, DLO, TEO, administrators): may view your profile, KYC, machine and bookings to assist and verify. Each staff member sees only data for their own area.",
          {
            text: "**Service providers** that process data for us and may not use it for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (KYC documents and photos are stored privately and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
              "**Notifications:** Google Firebase Cloud Messaging (device notification token and installation ID).",
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
          "**If you delete your account**, your personal data (name, mobile number, address, photos, KYC documents, bank details) is removed or anonymised. Your machine listings are set to **inactive** and their personal details and photos are removed.",
          "**However**, financial records (wallet, bookings, bills, commission, penalties, payments) must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without your name and mobile number wherever possible.",
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
              "Without the app: {{https://kisan.kalakar.tv/apps/machinery/delete-account|/apps/machinery/delete-account}} (verify with your mobile number OTP), or email [FILL: email].",
              "You submit a **request**. Our team reviews and completes it within **7 days**. Deletion cannot be undone. We cannot complete it while you have wallet balance, dues, penalties, pending top-ups or withdrawals, an open booking, or an active suspension; these must be cleared first.",
              "Only your **machinery owner** account is deleted. Accounts in other RKF services (for example Kisan Mitra) are not affected.",
            ],
          },
          "Withdraw consent by turning off camera or notification permission.",
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
