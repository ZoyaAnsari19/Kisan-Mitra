import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Staff App
 * (package com.rkfglobal.staff_app; the site lists it as "Staff App", app id
 * "staff-app"). The wording is the company's draft of 20-11-2026, checked
 * against the app and backend code, kept as written. Only the "Notes for Moin"
 * box and the Play Data Safety table of the draft are left out: they are not
 * part of the public policy.
 *
 * Who the app is for: RKF's own field staff (VLE, VLM, TEO, DLO). Not for
 * farmers or the public; only staff registered by RKF can log in. Accounts are
 * created by a supervisor or admin, never self-registered.
 *
 * Account closure: there is NO delete button and NO delete-account page. RKF
 * creates and closes staff accounts; staff write to HR or tell their supervisor.
 * The backend delete list covers only farmer, machinery owner and storage owner.
 * For Play Console's "account deletion" question: accounts are created by RKF
 * for its own staff and closed by RKF; ask Play support or the lawyer if the
 * form insists on an in-app path.
 *
 * Location (from the code): a one-time GPS reading on check-in, field visit or
 * "use my location"; and a continuous position stream only in the land-survey
 * screen while the screen is open. Foreground only, no background location.
 * Microphone: only for chat voice notes. Push IS wired in this app (Firebase
 * Cloud Messaging + device token), unlike the farmer-side apps; no analytics.
 *
 * Salary and pay are deliberately not mentioned: the code has salary classes but
 * no screen shows them. If a salary screen is added, change the policy first.
 *
 * Before going live: the app has a placeholder Privacy screen and a Consent
 * screen (terms, privacy, code of conduct, background verification) with an
 * agreement version. Bump the version so every staff member accepts the new
 * text. The code of conduct and background-verification consent are separate
 * documents that HR must write; this policy does not cover them.
 *
 * Retention of attendance, visit and staff records is not set in code: [FILL].
 * The usual period is 8 years; ask the CA / lawyer.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" staff-content.ts
 */

export const POLICY_TITLE = "RKF Staff App — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Staff App (package com.rkfglobal.staff_app)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "The RKF Staff App is a work tool for **RKF's field staff**: Village Level Entrepreneurs (VLE), Village Level Managers (VLM), Taluka Executive Officers (TEO) and Division Level Officers (DLO). It is not for farmers or the public; only staff registered by RKF can log in. With it you register and verify farmers and their land, review documents and provider applications, handle bookings and tickets, record your attendance and field visits, send daily reports, and use your wallet. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have. It covers **your own data** and **the farmers' data you handle**.",
      },
    ],
  },
  {
    id: "data-we-collect-about-you",
    title: "Data we collect about you",
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
            "**Name, role, employee code, employment type, joining date, assigned villages / taluka / division, who you report to**",
            "To set up your account and route work to you.",
          ],
          [
            "**Date of birth, gender, address, education**",
            "Staff record.",
          ],
          [
            "**Aadhaar number** (stored encrypted; only the last 4 digits are shown in the app) **and photos of Aadhaar (front and back)**",
            "Identity verification.",
          ],
          [
            "**Passport photo, signature, selfie**",
            "Staff record and identity.",
          ],
          [
            "**Education, exam, training, category, domicile certificates and driving licence** (optional)",
            "Staff record and eligibility.",
          ],
          [
            "**Your acceptance of the app's agreements** (terms, privacy, code of conduct, background verification), with the version and time",
            "To record that you agreed.",
          ],
          [
            "**Attendance check-ins and leave**",
            "To keep attendance. A check-in saves the time and, if location is on, where you were.",
          ],
          [
            "**Field visits** (time, notes, place, village, farmer)",
            "To record the work you do.",
          ],
          [
            "**Daily and periodic reports, targets and your scorecard** (how timely and complete your work is, farmer satisfaction, documentation quality)",
            "To track and review your work.",
          ],
          [
            "**Records of actions you take in the app** (for example verifying KYC, approving a record, escalating a booking)",
            "To keep an audit trail.",
          ],
          [
            "**Your wallet records, bank account details** (account holder name, account number, IFSC, bank name, UPI ID), **withdrawals, transfers, and RKF stock or cash allocated to you**",
            "To run your wallet and keep accounts.",
          ],
          [
            "**Chats and support tickets**, including **voice notes**, **photos** and **PDF files** you attach",
            "To work with your supervisors and RKF staff.",
          ],
          [
            "**Device information and notification token** (a code that identifies your phone to Google's push service)",
            "To send you notifications.",
          ],
          ["**Location (GPS)**", "See below."],
          [
            "**Photos and files** you choose (camera, gallery or files)",
            "Documents, land, visits, reports, chat.",
          ],
        ],
      },
      {
        type: "p",
        text: "**Location.** The app reads your location only when **you** do something that needs it:",
      },
      {
        type: "ul",
        items: [
          "Tap **check-in**, log a **field visit**, or tap **“use my location”** (for example for a map pin): a single reading.",
          "Use the **land survey** screen to walk a plot boundary: the app follows your position **while you walk and the screen is open**, to draw the boundary.",
        ],
      },
      {
        type: "p",
        text: "It never reads your location in the background, when the app is closed, or at any time you have not started one of these actions. If you deny location, attendance and visits can still be saved without a place, and you can set a map pin by moving the map by hand.",
      },
      {
        type: "p",
        text: "**Microphone.** Only when you press the record button for a voice note. The app does not listen in the background.",
      },
      {
        type: "p",
        text: "**Camera and files.** Only when you take a photo, scan, or pick a file.",
      },
      {
        type: "p",
        text: "**On your phone.** The app keeps your language, your role and whether you accepted the agreements. If you have no network when you send a daily report, the report is kept on your phone and sent when the network returns.",
      },
    ],
  },
  {
    id: "farmers-and-other-peoples-data",
    title: "Farmers' and other people's data you handle",
    blocks: [
      {
        type: "p",
        text: "In your work you see and add data about farmers and providers in your area: their profile, village, Aadhaar and PAN details and document photos, land records and boundaries, bookings, wallet top-up requests, complaints and tickets. You see only data for your own area. This data belongs to the RKF platform and is covered by the Privacy Policy of the farmer or provider's own app. You may use it **only for your RKF work** (see the Terms).",
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
          "Route work to you and show you your area's farmers, applications and bookings.",
          "Record attendance, visits and reports, and measure and review performance.",
          "Verify documents, keep audit records and prevent fraud.",
          "Run your wallet and keep accounts.",
          "Send notifications and OTPs.",
          "Support you, and handle complaints and disputes.",
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
    id: "who-sees-your-data",
    title: "Who sees your data",
    blocks: [
      {
        type: "ul",
        items: [
          "**Your supervisors and RKF administrators:** the people above you in the RKF chain (VLM, TEO, DLO) and RKF's administrators may see your profile, attendance, visits, reports, targets, scorecard and activity, for supervision, support and audit. Each person sees only the staff and area they are responsible for.",
          "**Farmers and providers:** may see your name and role when you handle their request. Your Aadhaar, bank and other personal documents are not shown to them.",
          {
            text: "**Service providers working for us**, who may not use your data for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (documents and photos are stored privately and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
              "**Notifications:** Google Firebase Cloud Messaging (device token and installation ID).",
              "**Maps: Mapbox.** The map picture (tiles) loads directly from Mapbox to your phone, so Mapbox can see your phone's IP address and the map area you view.",
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
          "While you are engaged with RKF and your account is active.",
          "After your engagement ends, we keep your staff record, attendance, field-visit, report, audit and wallet records for **[FILL: e.g. 8 years]**, as employment, tax and accounting law and our audit needs require. Identity documents are kept for **[FILL]**.",
          "Records about farmers that you created (verifications, bookings, approvals) stay with the farmer's record; they show that an RKF staff member acted, and your personal details on them can be removed or anonymised after you leave where the law allows.",
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
          "View your own information (Profile in the app). To correct your name, date of birth, mobile number or documents, ask your supervisor or HR.",
          "**Close your account or ask for your data to be corrected or removed:** the app has no delete button because RKF creates and closes staff accounts. Write to HR at [FILL: email] or tell your supervisor. We will reply within [FILL: suggested 30] days. We may have to keep some records (section 6).",
          "Turn off camera, microphone or location permission in your phone settings at any time. The related features then do not work; the rest of the app does.",
          "Make a complaint (see section 11).",
        ],
      },
      {
        type: "p",
        text: "Some data (identity, attendance, background-verification consent) is needed to be a field staff member; withdrawing it may mean you cannot continue in the role.",
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    blocks: [
      {
        type: "p",
        text: "Data is sent over HTTPS. Aadhaar and PAN numbers are stored encrypted. Access is limited to authorised people and significant changes are logged. No system is 100% secure. Never share your OTP or transaction PIN, and do not let anyone else use your login.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "This app is for adults only. Staff must be at least 18.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes",
    blocks: [
      {
        type: "p",
        text: "If we change this policy we will publish the new version in the app and on this page, update the effective date, and may ask you to accept it again.",
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
