import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Super Store app
 * (package com.rkfglobal.superstore). The wording is the company's draft of
 * 21-11-2026, checked against the app and backend code, kept as written. Only
 * the "Notes for Moin" box and the Play Data Safety table of the draft are left
 * out: they are not part of the public policy.
 *
 * Who the app is for: a Super Store (distributor) owner (shop_admin) and store
 * manager. Cashier and delivery staff are not in this app. A Super Store is
 * created by RKF; nobody registers one in the app.
 *
 * The big difference from the Mini Mart app: the owner REGISTERS Mini Marts and
 * enters the Mini Mart owner's name, mobile, email, address, pincode, date of
 * birth, gender, Aadhaar and PAN numbers, later the Aadhaar / PAN photos and the
 * franchise agreement (section 3). The Mini Mart owner consents with his own OTP
 * typed on the Super Store's phone. Lawyer to review (DPDP, third-party data,
 * Aadhaar).
 *
 * Account closure (draft of 21-11-2026): only the OWNER can send a "Close shop
 * account" request (Profile in the app, or the page /apps/super-store/delete-
 * account). It goes straight to RKF's admin, who approves or rejects it. Mini
 * Marts still supplied by this Super Store block it: RKF moves them first. This
 * text is true only once the backend and app parts (developer prompt A10 and
 * Part B) are live. DO NOT PUBLISH BEFORE THAT. For Play Console's "account
 * deletion" question: give the web URL and say the in-app path is Profile →
 * Close shop account (owner only).
 *
 * No location (the manifest has only INTERNET and CAMERA; the Mini Mart's village
 * is chosen from a list), no microphone. Push: firebase_core exists but there is
 * no firebase_messaging or firebase-analytics, so no push and no device token.
 * After the push branch merges, add "Device information and notification token"
 * to section 2, "Google Firebase Cloud Messaging" to section 5, and a Device ID
 * row to Data Safety.
 *
 * Retention of bills, stock and wallet records is not set in code: [FILL]. The
 * usual accounting period is 8 years; ask the CA. The shop's GST number and
 * invoice records are kept for the tax period: [CONFIRM] with the CA.
 *
 * `[FILL]` / `[CONFIRM]` text is a value only the company has. It is rendered
 * highlighted on the page. Do not replace one with a guess — the legal-entity
 * name, address and email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" super-store-content.ts
 */

export const POLICY_TITLE = "RKF Super Store — Privacy Policy";
export const POLICY_UPDATED = "[FILL]";
export const POLICY_INTRO =
  "**App:** RKF Super Store (package com.rkfglobal.superstore)\n**Operator (“we”, “us”):** [FILL: full legal name], [FILL: registered address]\n**Contact:** [FILL: email], [FILL: phone]";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "about-this-policy",
    title: "About this policy",
    blocks: [
      {
        type: "p",
        text: "RKF Super Store is for the people who run a **Super Store (distributor)**: its **owner and store manager**. Through the app you manage the shop's products and stock, buy stock from RKF, supply stock to the **Mini Marts** in your area, register new Mini Marts, verify their payments, handle their returns and claims, and manage the shop's wallet. This policy explains what data we collect, why, who sees it, how long we keep it, and the choices you have. It covers **your own data** and **the data of the Mini Mart owners and staff you handle**.",
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
            "**Name, photo / selfie, email (if given), gender, date of birth, address, PIN code, village** (owner and store manager)",
            "To create the account and show who did what.",
          ],
          [
            "**Identity details:** Aadhaar number and photos, PAN number and photo (stored encrypted where they are ID numbers)",
            "KYC and verification.",
          ],
          [
            "**Shop details:** shop name, type, village and address, GST number, photos, and shop documents (shop licence, food licence where it applies, franchise or partner agreement)",
            "To approve and run the shop.",
          ],
          [
            "**Your delivery area:** the talukas RKF assigns to your Super Store",
            "To decide which Mini Marts you may register and supply.",
          ],
          [
            "**Staff roster:** the store manager's role, permissions, status, last login and activity",
            "So the owner can manage the shop and RKF can support it.",
          ],
          [
            "**Products, prices, stock, stock movements, stock requests, dispatch details** (transporter name and phone, driver name where entered), **bills and returns**",
            "To run the shop and supply the Mini Marts.",
          ],
          [
            "**Mini Mart owners and shops you register or supply:** see section 3",
            "To register and supply them.",
          ],
          [
            "**Photos and files** you choose (camera or gallery)",
            "Documents, passbook, payment proof, stock photos.",
          ],
          [
            "**Camera**",
            "Only when you take a photo or scan a wallet QR code.",
          ],
          [
            "**Bank account details:** account holder name, account number, IFSC, bank name, UPI ID and a **passbook photo**; and your shop's **payment QR code**",
            "To pay out withdrawals and let Mini Marts pay you.",
          ],
          [
            "**Wallet and payment records:** top-ups, transfers, withdrawals, stock payments (with a UTR number and payment screenshot for a manual QR payment), and your transaction PIN",
            "To run the wallet, keep accounts and meet legal requirements.",
          ],
          [
            "**Notifications** shown in the app",
            "To tell you about requests, stock and money.",
          ],
        ],
      },
      {
        type: "p",
        text: "**Location:** this app does **not** read your phone's location. You choose a village from a list.",
      },
      {
        type: "p",
        text: "**Microphone:** the app does not use your microphone.",
      },
      {
        type: "p",
        text: "**Staff added by an owner.** If you are an owner and you add a store manager, please make sure the person agrees to their data being entered and used as this policy describes, and that the data is true. The app does not accept a date of birth under 18.",
      },
      {
        type: "p",
        text: "We ask only for data needed to provide the service. You can turn off the camera permission at any time in phone settings; photo and scan features then do not work, but the rest of the app does.",
      },
    ],
  },
  {
    id: "mini-mart-owners-data",
    title: "Mini Mart owners' and staff's data you handle",
    blocks: [
      {
        type: "p",
        text: "When you **register a Mini Mart**, you enter its owner's name, mobile number, email, address, PIN code, date of birth, gender, Aadhaar number and PAN number, and upload the Aadhaar and PAN photos and the franchise agreement. **The Mini Mart owner confirms with his own OTP, typed on your phone with him present.** You must have his agreement, enter only true details, and use this data **only** to register and supply that Mini Mart. RKF reviews and approves the Mini Mart. You also see, for the Mini Marts you supply, the shop's name, address and phone, its stock requests, payments, returns and claims. You must not copy, share or use this data for anything else (see the Terms).",
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
          "Approve shops and verify owners and staff.",
          "Run the shop: products, stock, stock requests to RKF, supply to Mini Marts, dispatch, returns and claims, bills.",
          "Keep accounts of wallets, payments and withdrawals.",
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
          "**The owner and the store manager** see the shop's data according to their role and permissions. Only the owner can move shop money (withdrawals, transfers, bank accounts) and register Mini Marts.",
          "**The Mini Marts you supply** see your shop's name, address and phone, your payment QR code and bank details that you give for payment, and your decisions on their requests and claims.",
          "**RKF staff and administrators:** may view the shop, staff, Mini Mart, stock and wallet records to assist, verify and audit. Each sees only the data for their own area and role.",
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
          "**Bills, stock, stock requests and wallet records** are accounting records and must be kept for **[FILL: e.g. 8 years]** under applicable law. They are kept without a person's name and mobile number wherever possible once an account is closed. The shop's GST number and invoice records are kept for the tax period [CONFIRM].",
          "KYC documents are kept while the account is active and for **[FILL]** after it is closed where the law requires.",
          "**Removed staff:** when an owner removes the store manager, that person can no longer log in to the shop; the records of what they did stay as part of the shop's accounts.",
          "**If the shop account is closed** (section 7): the shop is closed, the owner and the store manager can no longer log in, and their name, mobile number, address, date of birth, Aadhaar, PAN and photos are removed from the accounts, as are the shop's documents and photos. Bills, stock, wallet and audit records are not erased: they stay without anyone's name, because accounts and tax law depend on them. The data of Mini Mart owners you registered belongs to those Mini Marts and is not changed by your closure.",
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
          "View and correct your information (Profile and Shop in the app). The owner can edit shop and staff details; the store manager asks the owner to correct theirs.",
          "**Close the shop account and delete data (owner only):** in the app, the owner opens Profile and chooses **Close shop account** to send a request (or uses the page at {{https://kisan.kalakar.tv/apps/super-store/delete-account|/apps/super-store/delete-account}}). **The request goes to RKF's admin, who approves or rejects it.** This is not instant. Before it can be approved the shop must settle stock, open requests, wallet balance and dues, and **every Mini Mart you supply must first be moved by RKF to another Super Store or the RKF godown**; we show what is still open. When it is carried out, the removal in section 6 applies. We reply within [FILL: suggested 30] days. The store manager cannot send this request; he asks the owner.",
          "Turn off the camera permission in your phone settings at any time.",
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
    id: "changes-and-contact",
    title: "Changes and contact",
    blocks: [
      {
        type: "p",
        text: "If we change this policy we will publish the new version in the app and on this page and update the effective date.",
      },
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
