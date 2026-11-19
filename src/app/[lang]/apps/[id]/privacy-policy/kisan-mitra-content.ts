import type { DataSafety, Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English). Every statement maps to the code/backend audit
 * of the Kisan Mitra Android app (see the brief the page was built from).
 *
 * `[BRACKETED]` text is a decision the company has not made yet (legal entity,
 * contact details, retention periods, hosting region …). `legal-ui.tsx` renders
 * it highlighted so it is visible on the page. Do not replace one with a guess —
 * the legal-entity name, address and email must match the Play Console account
 * exactly. To list everything still open:  grep -o "\[[^]]*\]" kisan-mitra-content.ts
 *
 * To add Hindi/Marathi later, add a sibling file with the same shape.
 */

export const POLICY_TITLE = "Kisan Mitra — Privacy Policy";
export const POLICY_UPDATED = "[DATE]";
export const POLICY_INTRO =
  "This policy is for the Kisan Mitra farmer app. Using a partner app? See the {{Transporter app privacy policy|/apps/logistics/privacy-policy}} or the {{Machinery Rental app privacy policy|/apps/machinery/privacy-policy}}.";

/** Mirrors the Play Console "Data safety" form. Keep the two in sync. */
export const DATA_SAFETY: DataSafety = {
  title: "Data safety summary",
  rows: [
    {
      label: "Data we collect",
      value:
        "Personal info, financial info, location (approximate and precise), photos, audio, files and documents, messages, app activity.",
    },
    { label: "Shared with others", value: "Yes — see section 7." },
    { label: "Encrypted in transit", value: "Yes (HTTPS)." },
    { label: "You can ask us to delete your data", value: "Yes — see section 12." },
    { label: "Collected for advertising", value: "No." },
  ],
};

export const POLICY_SECTIONS: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are and how to contact us",
    blocks: [
      {
        type: "p",
        text: "Kisan Mitra is a mobile app for farmers, and part of the RKF Foundation platform. It is run by [LEGAL ENTITY NAME]. In this policy, “we” means [LEGAL ENTITY NAME] and “you” means the farmer who uses the app.",
      },
      {
        type: "ul",
        items: [
          "Legal entity: [LEGAL ENTITY NAME]",
          "Registered address: [REGISTERED ADDRESS]",
          "Privacy email: [PRIVACY CONTACT EMAIL]",
          "Phone: [PHONE]",
          "Grievance Officer: [NAME], [EMAIL]. We reply within [RESPONSE TIME].",
        ],
      },
    ],
  },
  {
    id: "summary",
    title: "Summary in plain words",
    blocks: [
      {
        type: "ul",
        items: [
          "You log in with your mobile number and a one-time password (OTP). We also ask for your name and village. Most other information is optional, or depends on which features you use.",
          "We collect your profile, and only if you choose, your Aadhaar, PAN and photos. We also keep your bookings, orders, wallet records, chats and support tickets.",
          "We use this to run your account, to connect you with providers, to verify you, to prevent fraud, to support you and to follow the law.",
          "We share it with Kisan Mitra field staff for your village, with providers who fulfil your booking, and with a few service companies (Cloudinary, Mapbox, Open-Meteo, Google). See section 7.",
          "We do not sell your data. We do not show ads. We do not use your data for third-party advertising.",
          "The app does not track your location in the background. It asks for the camera, microphone and location only when you tap a button that needs them.",
          "All data between the app and our server travels over HTTPS. You can ask us to delete your account. See {{how to delete your account|/apps/kisan-mitra/delete-account}}.",
        ],
      },
    ],
  },
  {
    id: "who-this-applies-to",
    title: "Who this applies to",
    blocks: [
      {
        type: "p",
        text: "This policy applies to adults (18 years or older) who register in the Kisan Mitra app. The app is not meant for children. If you think a child has registered, please contact us (section 16) and we will look into it.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      {
        type: "table",
        head: ["What", "Why we need it", "Required?"],
        rows: [
          [
            "Mobile number, preferred language, session tokens",
            "To log you in with an OTP and keep you signed in.",
            "Required",
          ],
          [
            "Village",
            "To show services near you and to connect you to the field staff of your village.",
            "Required",
          ],
          [
            "First name",
            "To set up your profile.",
            "[CONFIRM: required or optional]",
          ],
          [
            "Last name, date of birth, gender, email, full address",
            "To complete your profile, and for pickup and delivery.",
            "Optional",
          ],
          [
            "Whether a field worker helped you register",
            "To record who assisted you.",
            "Asked at registration",
          ],
          [
            "Aadhaar number, PAN, and photos of Aadhaar (front and back), PAN and your profile photo",
            "To verify your identity. See section 13.",
            "Optional. You can add them at sign-up or later.",
          ],
          [
            "Land plots, survey requests, soil data, crop history",
            "To give you land and crop services.",
            "When you use these features",
          ],
          [
            "Wallet balance and records, bank account details, passbook photo, top-up requests with payment-proof image, withdrawals, wallet-to-wallet transfers, transaction PIN, credit notes and settlements, membership purchase, Kisan Score",
            "To run your wallet and credit, and to pay out withdrawals. The app does not hold your card or UPI PIN. It has no payment-gateway inside it. Top-ups are bank or UPI transfers that our staff confirm.",
            "When you use these features",
          ],
          [
            "Bookings and orders: equipment, transport (pickup and drop points and the vehicle’s trip trail), storage, manpower, lab tests, Kisan Yatra, Super Mini Mall carts, wishlist, orders, returns (with photos) and reviews, sell-crop requests, price alerts, event registrations, government scheme applications (with the documents you upload), utility connections",
            "To carry out what you ask for and to show you its status.",
            "When you use these features",
          ],
          [
            "Chat messages with our staff (text, images, PDF files, voice notes), support tickets and their messages, in-app notifications",
            "To help and support you.",
            "When you use these features",
          ],
          [
            "Location: your phone’s GPS position, and pickup or drop points you place on the map",
            "For “use my location” in transport booking, to centre the map, and to rank place-search results near you.",
            "Optional. You can refuse the permission.",
          ],
          [
            "IP address and a device label stored with your login sessions; an audit log of sensitive actions (KYC, land approval, pricing, settlement, configuration) with who did it and when",
            "For security, fraud prevention and accountability.",
            "Collected automatically",
          ],
        ],
      },
      {
        type: "h3",
        text: "What we do not collect",
      },
      {
        type: "ul",
        items: [
          "Your advertising ID.",
          "Analytics or crash-report data from the app.",
          "Your contacts, SMS, call log or browsing history.",
        ],
      },
    ],
  },
  {
    id: "permissions",
    title: "Permissions we ask for",
    blocks: [
      {
        type: "table",
        head: ["Permission", "Why", "When"],
        rows: [
          [
            "Internet and network state",
            "To talk to the Kisan Mitra server.",
            "Always",
          ],
          [
            "Camera",
            "To scan payment or wallet QR codes, to take KYC photos (Aadhaar, PAN, profile photo) and to take a photo of an animal.",
            "Only when you tap the button that needs it",
          ],
          [
            "Microphone",
            "To record voice messages in chat.",
            "Only while you hold the mic button",
          ],
          [
            "Location (precise and approximate)",
            "For “use my location” for pickup in transport booking, to centre the map pin, and to rank address and place search results near you.",
            "Only while the app is open. We ask when you tap, never at start-up. If you already allowed it, the app also does a quiet position check to rank place-search results.",
          ],
        ],
      },
      {
        type: "ul",
        items: [
          "The app never uses your location in the background.",
          "The app does not ask for contacts, SMS, call log, phone state, calendar, body sensors or access to all your files.",
          "You choose photos and PDFs through the Android system picker, so the app does not need storage permission.",
          "You can refuse any permission, or turn it off later in your phone’s settings.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How we use information",
    blocks: [
      {
        type: "ul",
        items: [
          "To create and verify your account.",
          "To show services that are relevant to your village.",
          "To handle bookings and payments between you and providers.",
          "For KYC checks and fraud prevention.",
          "To answer your chats and support tickets.",
          "To follow the law.",
        ],
      },
      {
        type: "p",
        text: "We do not use your information for advertising.",
      },
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    blocks: [
      {
        type: "p",
        text: "We do not sell your data. We share it only with the following.",
      },
      {
        type: "ul",
        items: [
          "Kisan Mitra servers. Our API is at api.rkf.co.in and runs on a cloud server in [HOSTING COUNTRY/REGION]. All traffic uses HTTPS.",
          "Field staff and admins. The village VLE or VLM and the assigned team can see your profile, KYC, land, bookings and chats for their own villages, so they can verify, help and support you. Each staff member can see only their own region and role.",
          "Service providers who fulfil your booking. These are the transporter or driver, equipment owner, storage (godown) owner, labour contractor and workers, lab, buyer and Super Mini Mall seller. They get only what they need, such as your name, contact through the platform, village or pickup location, and the booking details.",
          "Cloudinary, a cloud file service. It stores the images, PDFs and audio you upload, including KYC documents. KYC documents are kept as private files.",
          "Mapbox. It provides place search, reverse geocoding and road distance for transport. It receives coordinates and the text you search for, not who you are. [CONFIRM: Mapbox is used in production]",
          "Open-Meteo. It provides the weather for your village. Our server sends only the village coordinates, no personal data.",
          "Google. The app loads its fonts (Baloo 2 and Mukta) from Google while it runs, so Google receives your device’s IP address and standard request data. The app also contains Google Play services, Firebase and ML Kit components. ML Kit scans QR codes on your phone.",
          "SMS provider for OTP: [NAME OF SMS GATEWAY]. It will receive your mobile number to deliver the OTP.",
          "Authorities. We may share data where the law, a court order or fraud prevention requires it.",
        ],
      },
    ],
  },
  {
    id: "background-and-technical",
    title: "Background activity and technical data",
    blocks: [
      {
        type: "ul",
        items: [
          "The app has no background service, no scheduled job and no background location. This version does not register for push notifications.",
          "While the app is open it keeps a live connection to our server so chat and notifications update at once. The connection closes when you close the app.",
          "When you open the app, it checks your saved session with our server to decide whether to show the login screen or your dashboard.",
          "We store your IP address and a device label with your login sessions, for security.",
          "Fonts load from Google while the app runs (see section 7).",
        ],
      },
    ],
  },
  {
    id: "on-your-phone",
    title: "Where data is stored on your phone",
    blocks: [
      {
        type: "ul",
        items: [
          "Your login tokens are kept in the phone’s encrypted secure storage (Android Keystore). Logging out clears them.",
          "The last five places you used in transport booking, the time you closed the “turn on location” hint, and your language and theme choices.",
          "Draft photos for return requests, kept in the app’s private storage.",
          "Temporary files for voice notes, and for PDFs and QR images you share or download (in temporary storage or Downloads).",
          "Debug logging is switched off in the release app.",
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    blocks: [
      {
        type: "ul",
        items: [
          "Market (mandi) price history: 30 days.",
          "Audit log of sensitive actions: kept permanently. It is built so that it cannot be edited or deleted.",
          "Financial, wallet, credit and KYC records: when deleted, we mark them as deleted but do not erase them, because they are legal and financial records. We keep them for [RETENTION PERIOD].",
          "Everything else: [RETENTION PERIODS]",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    blocks: [
      {
        type: "ul",
        items: [
          "Data between the app and our server is sent over HTTPS.",
          "Login tokens are kept in secure storage on your phone.",
          "Aadhaar and PAN numbers are encrypted in our database. KYC files are private.",
          "Staff access depends on role and region. When a staff member’s rights change, their access tokens are revoked.",
          "Wallet actions are protected by your transaction PIN.",
          "We keep an audit trail of sensitive actions.",
        ],
      },
      {
        type: "p",
        text: "No system is 100% secure. Keep your phone, your OTP and your transaction PIN to yourself. If you think someone else has used your account, contact us at once.",
      },
    ],
  },
  {
    id: "your-choices",
    title: "Your choices and rights",
    blocks: [
      {
        type: "h3",
        text: "What you can do in the app",
      },
      {
        type: "ul",
        items: [
          "Edit your profile and addresses, and replace your KYC documents.",
          "Change your language.",
          "Delete a saved address, notifications, price alerts, and items in your cart or wishlist.",
          "Refuse or turn off the camera, microphone and location permissions.",
          "Log out.",
          "Contact support through a ticket or the helpline.",
        ],
      },
      {
        type: "h3",
        text: "What you can ask us to do",
      },
      {
        type: "ul",
        items: [
          "Tell you what personal data we hold about you.",
          "Correct data that is wrong.",
          "Stop using optional data you gave us (Aadhaar, PAN, location, microphone, camera) by withdrawing your consent.",
          "Delete your account and data. The app has no delete button yet. Follow the steps on {{the delete-account page|/apps/kisan-mitra/delete-account}}. Records we must keep by law are explained in section 10.",
        ],
      },
      {
        type: "p",
        text: "To make a request, write to [PRIVACY CONTACT EMAIL]. You may have these rights under the Digital Personal Data Protection Act, 2023 and under the Information Technology Act, 2000 and the SPDI Rules, 2011, as they apply to us. [LEGAL REVIEW: confirm the rights wording]",
      },
    ],
  },
  {
    id: "aadhaar-and-pan",
    title: "Aadhaar and PAN",
    blocks: [
      {
        type: "ul",
        items: [
          "Giving your Aadhaar and PAN is optional. You can add them at sign-up or later.",
          "We use them only to check who you are. Kisan Mitra field staff and admins review them to verify you.",
          "The numbers are stored encrypted. The app shows you back only the last 4 digits of your Aadhaar.",
          "We do not share your Aadhaar or PAN with providers or with third parties. The photos of your documents are stored with Cloudinary as private files (see section 7).",
          "To have them removed, write to [PRIVACY CONTACT EMAIL]. [CONFIRM: removal process]",
        ],
      },
      {
        type: "p",
        text: "[LEGAL REVIEW: Aadhaar Act and UIDAI rules for private entities, before this section is published]",
      },
    ],
  },
  {
    id: "outside-india",
    title: "Transfer outside India",
    blocks: [
      {
        type: "p",
        text: "Cloudinary, Mapbox and Google may process data on servers outside India. Our own server is in [HOSTING COUNTRY/REGION]. [CONFIRM: where each provider processes data]",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "If we change this policy, we will put the new version on this page and change the “Last updated” date at the top. [CONFIRM: also notify users inside the app?]",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact and grievance",
    blocks: [
      {
        type: "ul",
        items: [
          "[LEGAL ENTITY NAME], [REGISTERED ADDRESS]",
          "Email: [PRIVACY CONTACT EMAIL]. Phone: [PHONE]",
          "Grievance Officer: [NAME], [EMAIL]. We reply within [RESPONSE TIME].",
        ],
      },
    ],
  },
];
