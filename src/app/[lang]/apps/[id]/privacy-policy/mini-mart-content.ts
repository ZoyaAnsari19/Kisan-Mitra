import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Mini Mart app
 * (package com.rkfglobal.minimart; the site lists it as "SuperMart", app id
 * "supermart-pos"). The wording is the company's draft of 20-11-2026, checked
 * against the app and backend code, kept as written, with two fixes to section
 * numbers (see below). Only the "Notes for Moin" box and the Play Data Safety
 * table of the draft are left out: they are not part of the public policy.
 *
 * Who the app is for: a Mini Mart outlet's owner (shop_admin), store manager,
 * cashier and delivery staff. Nobody registers in this app: the Super Store /
 * RKF create the accounts and the owner adds his own staff.
 *
 * Account closure: there is NO delete button and NO delete-account page. A Mini
 * Mart sends its closure or data-deletion request to its Super Store, which
 * passes it to RKF, or writes to RKF directly. The backend delete list covers
 * only farmer, machinery owner and storage owner, so shop roles cannot be
 * deleted by the system today. For Play Console's "account deletion" question,
 * accounts here are created by the Super Store / RKF, not self-registered; ask
 * Play support or the lawyer if the form insists on an in-app path.
 *
 * No location, no microphone (the manifest has only INTERNET and CAMERA) and no
 * map inside the app, so Mapbox is not listed. A farmer's delivery pin opens in
 * the phone's own map app.
 *
 * Push: firebase_core exists but Firebase is never started and there is no
 * firebase_messaging or firebase-analytics, so no push and no device token. After
 * the push branch merges, add "Device information and notification token" to
 * section 2, "Google Firebase Cloud Messaging" to section 5, and a "Device ID" row
 * to Data Safety.
 *
 * The draft has two wrong section numbers; they are fixed here so the page does
 * not point readers to the wrong section: "make a complaint" now says section 11
 * (the draft said 10, which is "Changes"), and "data in sections 2 and 5" (the
 * draft said 4, which is "How we use data"). Tell the company if they want the
 * original wording.
 *
 * Retention of bills, stock and orders is not set in code: [FILL]. The usual
 * accounting period is 8 years; ask the CA.
 *
 * `[FILL]` text is a value only the company has. It is rendered highlighted on
 * the page. Do not replace one with a guess — the legal-entity name, address and
 * email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" mini-mart-content.ts
 */

export const POLICY_TITLE = "RKF Mini Mart — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Mini Mart (package com.rkfglobal.minimart)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "RKF Mini Mart is for the people who run a **Mini Mart outlet**: its **owner, store manager, cashier and delivery staff**. Through the app you manage the shop's products and stock, order stock from your Super Store, receive and deliver farmers' orders, bill customers at the counter, handle returns, and manage the shop's wallet. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have. It covers **your own data** and **the farmers' and customers' data you handle**.",
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
            "**Name, photo / selfie, email (if given), gender, date of birth, address, PIN code, village** (owner and staff)",
            "To create the account and show who did what.",
          ],
          [
            "**Identity details of staff:** Aadhaar number and photo (mandatory for a cashier), PAN number and photo (optional), and for delivery staff a driving licence number and vehicle type and number. Stored encrypted where they are ID numbers.",
            "KYC and verification.",
          ],
          [
            "**Shop details:** shop name, type, village and address, GST number (optional), photos, and shop documents",
            "To approve and run the shop, and to show the shop to farmers.",
          ],
          [
            "**Staff roster:** each person's role, permissions, status, last login, and activity such as number of bills, sales amounts, deliveries made and failed",
            "So the owner can manage the shop and RKF can support it.",
          ],
          [
            "**Products, prices, stock, stock movements, stock requests and supplier details**",
            "To run the shop and its stock.",
          ],
          [
            "**Farmers' orders:** the farmer's **name, mobile number, delivery address and delivery pin**, the items, payment mode, status, delivery codes, returns",
            "To pack and deliver the order and settle it.",
          ],
          [
            "**Counter (POS) bills:** items, amounts, payment mode, the staff member who billed, counter number, and, if entered, a **customer name and mobile** or a farmer linked to the bill",
            "To bill, keep accounts and issue invoice numbers.",
          ],
          [
            "**Photos and files** you choose (camera or gallery)",
            "Products, shop, documents, payment proof, passbook photo.",
          ],
          [
            "**Camera**",
            "Only when you take a photo, scan a barcode (POS) or scan a wallet QR code.",
          ],
          [
            "**Bank account details:** account holder name, account number, IFSC, bank name, UPI ID and a **passbook photo**",
            "To pay out withdrawals.",
          ],
          [
            "**Wallet and payment records:** top-ups, transfers, withdrawals, stock payments (including a UTR number and payment screenshot for a manual QR payment), and your transaction PIN",
            "To run the wallet, keep accounts and meet legal requirements.",
          ],
          [
            "**Notifications** shown in the app",
            "To tell you about orders, stock and money.",
          ],
        ],
      },
      {
        type: "p",
        text: "**Location:** this app does **not** read your phone's location. A delivery pin appears with an order; if you tap it, it opens in your phone's own map app, which works under that app's own policy.",
      },
      {
        type: "p",
        text: "**Microphone:** the app does not use your microphone.",
      },
      {
        type: "p",
        text: "**Staff added by an owner.** If you are an owner and you add a staff member, please make sure they agree to their data being entered and used as this policy describes, and that the data is true. If you are a staff member, your owner and RKF can see the data in sections 2 and 5.",
      },
      {
        type: "p",
        text: "We ask only for data needed to provide the service. You can turn off the camera permission at any time in phone settings; photo and scan features then do not work, but the rest of the app does.",
      },
    ],
  },
  {
    id: "farmers-and-customers-data",
    title: "Farmers' and customers' data you handle",
    blocks: [
      {
        type: "p",
        text: "A farmer's name, mobile number, delivery address and pin, order, and any return are shown to the shop (and to the delivery person for a delivery assigned to him) **only to carry out that order or return**. A customer's name and mobile entered on a counter bill is for that bill. You must not copy, share or use this data for anything else (see the Terms). Farmers see the shop's name and phone number, and, for a delivery or a return pickup, the delivery person's name and mobile.",
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
          "Create accounts and log you in.",
          "Approve shops and verify staff.",
          "Run the shop: products, stock, stock requests, orders, deliveries, returns, bills.",
          "Keep accounts of wallets, payments and withdrawals, and generate GST invoice numbers where a GST number is on file.",
          "Send essential in-app notifications and OTPs.",
          "Handle support requests and disputes.",
          "Prevent fraud, and improve and secure the app.",
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
          "**The owner and the shop's staff** see the shop's data according to their role and permissions. Only the owner can move shop money (withdrawals, transfers, bank accounts). Staff see staff data only as their permissions allow.",
          "**Your Super Store** (the shop that supplies your stock) sees your shop's name, address and phone and your stock requests and payments.",
          "**Farmers:** see the shop name and phone, and the delivery person's name and mobile for their delivery or return pickup.",
          "**RKF staff and administrators:** may view the shop, staff, orders, stock and wallet records to assist, verify and audit. Each sees only the data for their own area and role.",
          {
            text: "**Service providers working for us**, who may not use your data for their own purposes:",
            children: [
              "**Hosting:** our servers run on a virtual server rented from Hostinger [FILL: server country / region]. Our application and database run there.",
              "**Document and photo storage:** Cloudinary (KYC documents, shop documents and photos are stored privately and shown only through time-limited links).",
              "**SMS / OTP delivery:** [FILL: vendor]",
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
          "While the shop and your account are active.",
          "**Bills, orders, stock and wallet records** are accounting records and must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without a person's name and mobile number wherever possible once an account is closed.",
          "KYC documents are kept while the account is active and for **[FILL]** after it is closed where the law requires.",
          "**Removed staff:** when an owner removes a staff member, that person can no longer log in to the shop; the records of what they did (bills, deliveries) stay as part of the shop's accounts.",
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
          "View and correct your information (Profile and Shop in the app). The owner can edit shop and staff details; staff ask the owner to correct theirs.",
          "**Close an account or ask for data to be corrected or removed:** the app has no delete button, because your Super Store and RKF create and close shop accounts. **Send your request to your Super Store, who passes it to RKF**, or write to RKF at [FILL: email]. We will reply within [FILL: suggested 30] days. A shop with stock, an open order, a wallet balance or dues must settle first, and some records must be kept (section 6).",
          "Turn off the camera permission in your phone settings at any time.",
          "Make a complaint (see section 11).",
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
        text: "This app is not intended for anyone under 18. An owner must not add a person under 18 as staff.",
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
