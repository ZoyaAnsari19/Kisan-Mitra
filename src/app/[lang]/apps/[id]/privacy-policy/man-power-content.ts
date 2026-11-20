import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Man Power app
 * (package com.rkfglobal.man_power). The wording is the company's draft of
 * 19-11-2026, checked against the app and backend code, kept as written.
 * Only the "Notes for Moin" box and the Play Data Safety table of the draft are
 * left out: they are not part of the public policy.
 *
 * One app, two roles: labour contractors and workers use the same app, so the
 * policy covers both. A contractor can add a NEW worker only with an OTP sent to
 * that worker's own mobile (manpower.crew_add_requires_otp); the policy treats
 * that OTP as the worker's consent. A lawyer must confirm it is enough under DPDP.
 *
 * Attendance photo and location are NOT collected today (the backend can store
 * them, migration 244, but the app never sends them). If that is added, change
 * this policy and Data Safety first.
 *
 * The code has no age check: only the date of birth is stored, so nothing stops
 * a contractor adding someone under 18 although the policy says 18+. Have the
 * lawyer look at child-labour law and DPDP for minors.
 *
 * Push notifications: the app has no push today (Firebase is never started and
 * there is no firebase_messaging), so this policy does NOT mention push or a
 * device token. When the push branch is merged, add "Device information and
 * notification token" to section 2, "Google Firebase Cloud Messaging" to
 * section 4, and a "Device ID" row to Data Safety.
 *
 * The delete-account text assumes the labour_contractor and worker delete work
 * is deployed: "Profile → Delete account" and the OTP check on the delete page
 * do not exist yet. Do not publish this page before they are live.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" man-power-content.ts
 */

export const POLICY_TITLE = "RKF Man Power — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Man Power (package com.rkfglobal.man_power)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "RKF Man Power is for **labour contractors**, who supply crews of farm workers to farmers, and for **workers**, who see their jobs, attendance, leave and wages. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have. If you are a contractor, the details of workers you add also pass through this app; that is covered in section 2.",
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
            "**Name, village / taluka / district, address, PIN code, language**",
            "To create your account and match you to work in your area.",
          ],
          [
            "**Contractor:** date of birth, gender, email (if asked), Aadhaar number and PAN number, photos of Aadhaar (front and back) and PAN, profile photo",
            "KYC verification. Stored encrypted.",
          ],
          [
            "**Worker:** date of birth, gender, skills, daily rate, profile photo, emergency contact number (optional), Aadhaar and PAN numbers and photos (if provided)",
            "To verify the worker, put him on jobs and work out his wage.",
          ],
          [
            "**Home location pin** of a worker or contractor",
            "To match work near you. Set by moving the map, by searching, or with “Use my location”.",
          ],
          [
            "**Job, attendance and wage records:** which job a worker is on, days and present / absent, the farmer's confirmation or objection, leave requests, replacements, amounts owed and paid",
            "To work out wages and the farmer's bill, and to settle disputes.",
          ],
          [
            "**Farmer details shown for a job:** name, work village / place, job details; the farmer's **mobile number is shown only to the contractor assigned to that job**",
            "To carry out the job.",
          ],
          [
            "**Photos and files** you choose (camera or gallery)",
            "Profile, KYC, complaints, chat attachments, wallet top-up proof.",
          ],
          [
            "**Camera**",
            "Only when you take a photo or scan a wallet QR code.",
          ],
          [
            "**Location (GPS)**",
            "Only when you tap **“Use my location”** for a home pin. A one-time reading, only while the app is open. Never in the background and never continuous.",
          ],
          [
            "**Bank account details:** account holder name, account number, IFSC, bank name (optional), UPI ID (optional)",
            "To pay out wallet withdrawals.",
          ],
          [
            "**Wallet records:** top-ups, transfers, wages received or paid, withdrawals, dues",
            "To provide the service, keep accounts and meet legal requirements.",
          ],
          [
            "**Chats, complaints and support tickets**",
            "To help you and resolve disputes.",
          ],
          [
            "**Ratings and reviews** of contractors",
            "To show how reliable a contractor is.",
          ],
        ],
      },
      {
        type: "p",
        text: "**Attendance:** the app records attendance (days, present / absent) with the time the server received it. It does **not** collect a photo or a location with attendance.",
      },
      {
        type: "p",
        text: "**Workers added by a contractor.** A contractor can add a **new** worker only by entering a one-time code sent to that worker's own mobile number. That code is the worker's agreement to be added. A worker can leave a crew, or ask us to correct or delete his data, as described in section 6.",
      },
      {
        type: "p",
        text: "We ask only for data needed for the service. You can turn off camera or location permission at any time in phone settings. Those features will then not work, but the rest of the app does. You can also set a map pin by moving the map by hand or searching for a place.",
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
          "Show contractors the jobs available and give workers their jobs.",
          "Record attendance, work out wages and bills, and keep accounts of wallets, payouts and withdrawals.",
          "Verify KYC and prevent fraud.",
          "Send essential in-app notifications and OTPs.",
          "Handle support requests, complaints and disputes (for example an attendance objection).",
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
          "**The farmer whose job it is:** the contractor's or worker's name, job and attendance details. Your Aadhaar, PAN and bank details are never shown to a farmer.",
          "**A contractor and his workers:** a contractor sees the name, rate, attendance and wages of the workers in his crew. A worker sees his own job, wage and contractor, not other workers' data.",
          "**RKF staff** (VLE, VLM, DLO, TEO, administrators): may view profile, KYC, jobs and disputes to assist and verify. Each staff member sees only data for their own area.",
          {
            text: "**Service providers working for us**, who may not use your data for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (KYC documents and photos are stored privately and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
              "**Maps: Mapbox.** The map picture (tiles) loads directly from Mapbox to your phone, so Mapbox can see your phone's IP address and the map area you view. When you search for a place or let the app name a pin, your request goes through our server to Mapbox and includes the text you typed and a nearby location so results are local. We remove location and search text from our server logs. Mapbox handles this under its own privacy policy.",
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
          "**If you delete your account**, your personal data (name, mobile number, address, photos, KYC documents, bank details, home pin) is removed or anonymised.",
          "**However**, job, attendance, wage, wallet and payment records must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without your name and mobile number wherever possible.",
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
          "View and correct your information (Profile in the app). Name, date of birth and mobile number cannot be changed in the app after verification; contact us to correct them.",
          {
            text: "**Delete your account and data:**",
            children: [
              "In the app: **Profile → Delete account**.",
              "Without the app: {{https://kisan.kalakar.tv/apps/man-power/delete-account|/apps/man-power/delete-account}} (verify with your mobile number OTP), or email [FILL: email].",
              "You submit a **request**. Our team reviews and completes it within **7 days**. Deletion cannot be undone. We cannot complete it while you have wallet balance, wages owed or unpaid, pending top-ups or withdrawals, an open job or dispute, or an active suspension; for a contractor, workers still on his crew and open jobs must be cleared first.",
              "Only the role you request to delete (**contractor or worker**) is removed. Another role, or an account in another RKF app such as Kisan Mitra, is not affected.",
            ],
          },
          "**Workers:** if a contractor entered your data and you want it corrected or removed, write to us (section 10) or leave the crew in the app.",
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
        text: "This app is not intended for anyone under 18. Contractors must not add a person under 18 as a worker. If we learn that a person under 18 has been added, we will remove the data and the person from the crew.",
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
