import type { Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the RKF Machinery Owner app, written from
 * the company's draft policy (package com.rkfglobal.machinery_owner).
 *
 * This app takes NO location (no location permission), no microphone and does
 * no map search. If a map or location feature is added later, change this
 * policy first. Do not copy text between the per-app files without checking it
 * against that app.
 *
 * `[BRACKETED]` text is a decision the company has not made yet. It is rendered
 * highlighted on the page. Do not replace one with a guess — the legal-entity
 * name, address and email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" machinery-content.ts
 *
 * No "Data safety" box on this page: the draft keeps that table for the Play
 * Console form only.
 */

export const POLICY_TITLE = "RKF Machinery Owner — Privacy Policy";
export const POLICY_UPDATED = "[DATE]";
export const POLICY_INTRO =
  "This policy is for the RKF Machinery Owner app. Using another Kisan Mitra app? See the {{Kisan Mitra farmer app policy|/apps/kisan-mitra/privacy-policy}} or the {{Transporter app policy|/apps/logistics/privacy-policy}}.";

export const POLICY_SECTIONS: Section[] = [
  {
    id: "who-this-policy-is-for",
    title: "Who this policy is for",
    blocks: [
      {
        type: "p",
        text: "RKF Machinery Owner is for people who own farm machinery (a tractor, harvester, rotavator and so on) and want to rent it out to farmers. In the app you list your machine, take bookings, and see your work hours and money. This policy tells you what data we collect, why, who sees it, how long we keep it, and what you can do.",
      },
      {
        type: "ul",
        items: [
          "App: RKF Machinery Owner (Android package com.rkfglobal.machinery_owner)",
          "Operator: [LEGAL ENTITY NAME], [REGISTERED ADDRESS]",
          "Contact: [PRIVACY CONTACT EMAIL], [PHONE]",
        ],
      },
    ],
  },
  {
    id: "data-we-collect",
    title: "What data we collect",
    blocks: [
      {
        type: "table",
        head: ["What", "When and why"],
        rows: [
          [
            "Mobile number",
            "To log you in (with an OTP) and to identify you.",
          ],
          [
            "Name, village, taluka and district, address, date of birth, language",
            "To create your account and to connect you with farmers in your area.",
          ],
          [
            "Identity documents: PAN, Aadhaar [CONFIRM: which of these we actually take], and driving licence (number, expiry date and photo)",
            "For KYC verification. This data is stored encrypted.",
          ],
          [
            "Machine details: type, registration number, model, photos, RC, insurance and other paperwork, your rate",
            "To list your machine and to verify it.",
          ],
          [
            "Photos and files you choose (from the camera, gallery or files)",
            "For KYC, your machine, complaints and chat attachments.",
          ],
          [
            "Camera",
            "Only when you take a photo or scan a wallet QR.",
          ],
          [
            "Bank or UPI details [CONFIRM]",
            "To pay out money from your wallet (withdrawal).",
          ],
          [
            "Wallet, bookings, working hours, payments and penalty records",
            "To give you the service, to keep accounts, and to meet legal needs.",
          ],
          [
            "Farmer’s booking details: name, job location (pin) and a description of the work",
            "Shown to you so you can carry out the booking. The farmer’s mobile number is shown to you only after the booking is confirmed. [CONFIRM]",
          ],
          [
            "Chats, complaints and support tickets",
            "To help you.",
          ],
          [
            "Device information and notification token",
            "To send you booking notifications and to keep the app running well.",
          ],
        ],
      },
      {
        type: "h3",
        text: "Location (GPS)",
      },
      {
        type: "p",
        text: "This app does not take your phone’s location, and it does not do so in the background either. The farmer’s job location (pin) is shown with the booking. If you open it in a map app, that map app works under its own policy.",
      },
      {
        type: "p",
        text: "We ask you only for the data we need for the service. You can turn the camera permission off at any time in your phone’s settings. Then the photo and QR features stop working, and the rest of the app still works.",
      },
    ],
  },
  {
    id: "why-we-use-data",
    title: "Why we use your data",
    blocks: [
      {
        type: "ul",
        items: [
          "To create your account and log you in.",
          "To show your machine to farmers, to take bookings, and to start and finish a job (with an OTP).",
          "To keep accounts of job payments, wallet, commission, penalties and withdrawals.",
          "To verify your KYC and your machine, and to prevent fraud.",
          "To send you the notifications and OTPs you need.",
          "To handle help requests, complaints and disputes.",
          "To make the app better and safer.",
        ],
      },
      {
        type: "p",
        text: "We do not sell your data. [CONFIRM] We also do not use it for advertising.",
      },
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    blocks: [
      {
        type: "ul",
        items: [
          "The farmer who booked you: your name, your machine details and your rate. After the booking is confirmed, also your mobile number. [CONFIRM] No farmer sees your Aadhaar, PAN or bank details.",
          "RKF staff (VLE, VLM, DLO, TEO and admins): staff for your area can see your profile, KYC, machine and bookings, so they can help and verify you. Each staff member sees only the data of their own area.",
          "The law and the government, when a law or a court order requires it.",
        ],
      },
      {
        type: "h3",
        text: "Our technology partners",
      },
      {
        type: "p",
        text: "These companies work for us. They do not use your data for themselves.",
      },
      {
        type: "ul",
        items: [
          "SMS and OTP provider: [NAME OF SMS GATEWAY]",
          "Document and photo storage: Cloudinary",
          "Push notifications: Google Firebase Cloud Messaging. Your notification token and device ID go to Google.",
          "Cloud server and hosting: [HOSTING PROVIDER AND COUNTRY/REGION]",
          "Google Fonts, and Google ML Kit for QR scanning on your phone: [CONFIRM: still used in this version]",
        ],
      },
    ],
  },
  {
    id: "how-long-we-keep-data",
    title: "How long we keep your data",
    blocks: [
      {
        type: "ul",
        items: [
          "While your account is active, we keep your data.",
          "When you delete your account, we delete or anonymise your personal data: your name, mobile number, address, photos, KYC documents and bank details.",
          "The law requires us to keep records of money transactions, wallet, bookings and billing for [RETENTION PERIOD IN YEARS]. We keep them without your name and mobile number where we can. [CONFIRM: after the company decides]",
          "KYC documents: [RETENTION PERIOD]",
          "Your machine listing and photos after you delete your account: [CONFIRM: removed or made inactive]",
        ],
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      {
        type: "p",
        text: "You can:",
      },
      {
        type: "ul",
        items: [
          "See your data and correct wrong information (in the profile in the app).",
          "Ask us to delete your account and data (see below).",
          "Take back your consent, by turning off a permission.",
          "Make a complaint (see section 10).",
        ],
      },
      {
        type: "h3",
        text: "How to delete your account and data",
      },
      {
        type: "ul",
        items: [
          "In the app: Profile → Delete account. [CONFIRM: say this only after the feature is built, and check the path]",
          "Without the app: follow the steps on {{the delete-account page|/apps/machinery/delete-account}}, or write to [PRIVACY CONTACT EMAIL].",
          "You send us a request to delete. Our team reviews it, approves it, and finishes it within 7 days. [CONFIRM: 7 days] Once deleted, the data does not come back.",
          "If your wallet still has money, you have dues to pay, or you have an open booking, finish it first. We can delete your account only after that.",
          "We delete only your machinery owner account. If you also have an account in another Kisan Mitra service, that account stays.",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "How we keep your data safe",
    blocks: [
      {
        type: "p",
        text: "Data is sent over HTTPS. Sensitive data such as Aadhaar and PAN is stored encrypted. Only authorised people can see it, and we keep a record of every major change. Still, no system is 100% secure. Do not tell your OTP or transaction PIN to anyone.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "This app is not for people under 18 years of age. [CONFIRM]",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "If we change this policy, we will put the new version in the app or on this page, and change the “Last updated” date.",
      },
    ],
  },
  {
    id: "complaints-and-contact",
    title: "Complaints and contact",
    blocks: [
      {
        type: "ul",
        items: [
          "Grievance Officer: [NAME]",
          "Email: [EMAIL]. Phone: [PHONE]. Address: [REGISTERED ADDRESS]",
          "We reply to a complaint within [NUMBER OF] days.",
        ],
      },
    ],
  },
];
