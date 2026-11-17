import type { DataSafety, Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the Machinery Rental Provider app.
 * This is a DIFFERENT app from Kisan Mitra and from the Transporter app: it
 * uses push notifications (Firebase Cloud Messaging), has NO location data, and
 * handles machine, operator and owner documents. Do not copy text between the
 * files without checking it against the facts for this app.
 *
 * `[BRACKETED]` text is a decision the company has not made yet. It is rendered
 * highlighted on the page. Do not replace one with a guess — the legal-entity
 * name, address and email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" machinery-rental-content.ts
 */

export const POLICY_TITLE = "[PLAY STORE APP NAME] — Privacy Policy";
export const POLICY_UPDATED = "[DATE]";
export const POLICY_INTRO =
  "This policy is for the Machinery Rental app, for machinery owners. Using another Kisan Mitra app? See the {{Kisan Mitra farmer app policy|/privacy-policy}} or the {{Transporter app policy|/apps/logistics/privacy-policy}}.";

/** Mirrors the Play Console "Data safety" form. Keep the two in sync. */
export const DATA_SAFETY: DataSafety = {
  title: "Data safety summary",
  rows: [
    {
      label: "Data we collect",
      value:
        "Personal info (name, email, phone, address, date of birth), financial info (bank account, wallet), photos, files and documents, messages, device or other IDs (push-notification token and installation ID).",
    },
    {
      label: "Data we do not collect",
      value: "Location, audio, contacts, advertising ID.",
    },
    { label: "Shared with others", value: "Yes — see section 8." },
    { label: "Encrypted in transit", value: "Yes (HTTPS)." },
    {
      label: "You can ask us to delete your data",
      value: "Yes — see section 13.",
    },
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
        text: "[PLAY STORE APP NAME] is an app for machinery owners: tractors, harvesters, drones, threshers and other farm equipment. It is part of the RKF Foundation platform and is run by [LEGAL ENTITY NAME]. In this policy, “we” means [LEGAL ENTITY NAME] and “you” means the machinery owner who uses the app.",
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
          "You log in with your mobile number and a one-time password (OTP). You then add your profile, your documents and your machines. Our staff check them.",
          "We collect your identity documents, your machine details, your bank details and your wallet records. We also keep your chats and support tickets.",
          "The app does not collect your location. It does not use your microphone, contacts or SMS.",
          "The app sends you push notifications. For that, it sends a notification token from your phone to our server. Logging out removes the token.",
          "We use your data to verify you, to run rental jobs and payments, to keep quality, to prevent fraud, to support you and to follow the law.",
          "We share data with our staff, with the farmer who books your machine, and with a few service companies: Cloudinary and Google (Firebase Cloud Messaging and Google Fonts). See section 8.",
          "We do not sell your data. We do not show ads. The app has no analytics or crash-report tool. All data between the app and our server travels over HTTPS.",
          "You can ask us to delete your account. See {{how to delete your account|/delete-account/machinery}}.",
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
        text: "This policy applies to adult machinery owners who register in the app. The app is not meant for children. If you think a child has registered, please contact us (section 17) and we will look into it.",
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
            "Mobile number, preferred language, session tokens, and whether you have set a transaction PIN",
            "To log you in with an OTP and keep you signed in.",
            "Required",
          ],
          [
            "Full name, email, date of birth, gender, village, taluka, district, division, state, pin code, address, profile photo",
            "To set up your owner profile.",
            "Asked at registration. [CONFIRM which fields are required]",
          ],
          [
            "PAN number and Aadhaar number",
            "To verify your identity. See section 14.",
            "[CONFIRM: required or optional]",
          ],
          [
            "Emergency contact: the mobile number of another person",
            "To have someone we can reach in an emergency. See section 15.",
            "Asked at registration. [CONFIRM required or optional]",
          ],
          [
            "Photos of Aadhaar (front and back) and PAN card; driving licence number, expiry date and photo",
            "To check your identity and eligibility. Our staff review them. Adding or replacing any document puts your account back to “pending verification”.",
            "Asked for verification. [CONFIRM which are required]",
          ],
          [
            "Your availability (online or offline), rating, number of reviews, number of jobs completed, approval status and the reason if we reject you",
            "To show your status and decide whether you get job offers. You set your availability. We set the rest.",
            "Created by the app and our staff",
          ],
          [
            "Machine details: type, model, year, horsepower or capacity, details specific to the machine type, photos, village, availability, verification status, and documents for each machine",
            "To verify your machines and match them with rental jobs.",
            "Required to add a machine",
          ],
          [
            "Operator details for a machine: name, mobile number, photo. The operator may not use the app themselves.",
            "To tell the farmer who will run the machine. See section 15.",
            "Optional",
          ],
          [
            "Job details about farmers: name, mobile number, village, taluka, district and state, the job address and its map coordinates, plot name and area, date, time slot, duration, extra time, the farmer’s note, fare, extension or overtime charges, payment mode, status times, and the farmer’s rating and review",
            "To carry out the job. This is other people’s data. We show it to you only for jobs you take.",
            "Collected for each job",
          ],
          [
            "Strikes: penalty records against you, and your replies",
            "For quality control.",
            "Created by our staff and the app",
          ],
          [
            "Wallet balance and transactions, top-up requests with a payment-proof image, withdrawals, wallet-to-wallet transfers, your transaction PIN, your earnings",
            "To run your wallet and pay you. The app has no payment gateway inside it.",
            "When you use the wallet",
          ],
          [
            "Bank details: account holder name, account number, IFSC, bank and branch name, UPI ID, photo of the passbook",
            "To pay out withdrawals. The app only gets back the last 4 digits of the account number.",
            "When you ask for a withdrawal",
          ],
          [
            "Chat messages with the assistance team, support tickets (text and photos from your gallery) and replies, in-app notifications",
            "To help and support you.",
            "When you use these features",
          ],
          [
            "Push-notification token, your phone’s platform, and the app name",
            "So that notifications reach your phone. See section 6.",
            "Sent automatically when you log in",
          ],
          [
            "IP address and a device label stored with your login sessions; an audit log of sensitive actions with who did it and when",
            "For security and fraud prevention.",
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
          "Your location. The app has no location feature.",
          "Your contacts, SMS or call log.",
          "Audio from your microphone.",
          "Your advertising ID.",
          "Analytics or crash-report data from the app.",
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
            "To talk to our server.",
            "Always",
          ],
          [
            "Camera",
            "To scan wallet or payment QR codes, and to take photos of your profile, your machines and your documents.",
            "Only when you tap the button that needs it",
          ],
          [
            "Notifications (Android 13 and above)",
            "To show you job and wallet alerts.",
            "The app asks after you log in",
          ],
          [
            "Receive push messages from Firebase Cloud Messaging",
            "To receive notifications sent through Google’s Firebase Cloud Messaging.",
            "Automatic",
          ],
          [
            "Keep the phone awake",
            "Added by the Firebase libraries so a notification can be handled.",
            "Automatic",
          ],
        ],
      },
      {
        type: "ul",
        items: [
          "The app does not ask for location, microphone, contacts, SMS, call log or phone state.",
          "You choose photos and files through the Android system picker, so the app does not need storage permission.",
          "You can refuse any permission, or turn it off later in your phone’s settings.",
        ],
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications and background activity",
    blocks: [
      {
        type: "ul",
        items: [
          "The app starts Firebase when it opens. After you log in, it asks for notification permission and sends a Firebase Cloud Messaging (push) token to our server. This lets us send notifications to your phone.",
          "What is sent: the token, your phone’s platform, and the app name.",
          "When you log out, the app removes the token from our server.",
          "When a notification arrives while the app is open, the app refreshes your unread count. When the app is closed or in the background, your phone’s system shows the notification. The app itself does nothing in the background.",
          "A notification is only a reminder. The real record is always loaded from our server.",
          "To stop notifications, turn them off in your phone’s settings, or log out.",
          "The app does not track your location. It has no background service, no scheduled job and no background sync.",
          "While the app is open it keeps a live connection to our server so chat updates at once. The connection closes when you close the app.",
          "The job address and its map coordinates come from the farmer’s booking. They are not your phone’s location.",
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
          "To create and verify your account, your documents and your machines.",
          "To match you with rental jobs and to run them, including the 6-digit OTP check when a job starts and when it ends.",
          "To run your wallet, pay your earnings and handle withdrawals.",
          "For strikes and quality control.",
          "For fraud prevention.",
          "To send you notifications about jobs and your wallet.",
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
        text: "We do not sell your data. We share it with the following.",
      },
      {
        type: "ul",
        items: [
          "Our servers. Our API is at api.rkf.co.in and runs on a cloud server in [HOSTING COUNTRY/REGION]. All traffic uses HTTPS.",
          "RKF staff and admins. They check your identity, machines and bank account, review strikes, and help and support you. Each staff member can see only their own role and region.",
          "The farmer who books your machine. The farmer sees your name or the operator’s name, mobile number, the machine details and photos, and the job status. [CONFIRM the exact fields the farmer sees]",
          "Other platform users, where needed to finish a payment. For example, a person you send money to from your wallet sees the account holder’s name when they look up the wallet.",
          "Cloudinary, a cloud file service. It stores the images and documents you upload, such as identity documents, machine photos, bank and chat images. Sensitive files are kept as private files.",
          "Google Firebase Cloud Messaging and Google Play services. They deliver push notifications. They receive your push token, an installation ID and app instance data.",
          "Google ML Kit. It reads QR codes on your phone. No image leaves your phone for this.",
          "Google Fonts. The app loads its fonts from Google while it runs, so Google receives your phone’s IP address.",
          "Apps you choose to open: your phone dialer, SMS composer, WhatsApp and a maps app with the job’s coordinates. They open when you tap Call, Message, Navigate or a chat button, and we do not control them.",
          "SMS provider for OTP: [NAME OF SMS GATEWAY]. It will receive your mobile number to deliver the OTP.",
          "Authorities, where the law, a court order or fraud prevention requires it.",
        ],
      },
    ],
  },
  {
    id: "technical-data",
    title: "Technical data",
    blocks: [
      {
        type: "ul",
        items: [
          "We store your IP address and a device label with your login sessions, for security.",
          "The Firebase libraries create an installation ID on your phone so that push notifications can be delivered.",
          "When you open the app, it checks your saved session with our server to decide whether to show the login screen or your dashboard.",
          "Fonts load from Google while the app runs (see section 8).",
        ],
      },
    ],
  },
  {
    id: "on-your-phone",
    title: "Data on your phone",
    blocks: [
      {
        type: "ul",
        items: [
          "Your login tokens are kept in the phone’s encrypted secure storage (Android Keystore). Logging out removes them.",
          "Your language and theme choices.",
          "A temporary QR image when you share or save your wallet QR. Saving it to your gallery is your choice.",
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
          "Audit log of sensitive actions: kept permanently. It is built so that it cannot be edited or deleted.",
          "Wallet, financial and KYC records: when deleted, we mark them as deleted but do not erase them, because they are legal and financial records. We keep them for [RETENTION PERIOD].",
          "Push token: removed when you log out. [CONFIRM: what happens to the token if you uninstall the app without logging out]",
          "Chats, support tickets, documents, job history, strikes and reviews: [RETENTION PERIODS]",
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
          "Aadhaar and PAN numbers are encrypted in our database. Document images are private and are opened with short-lived signed links.",
          "Staff access depends on role and region. When a staff member’s rights change, their access tokens are revoked.",
          "Withdrawals from your wallet need your transaction PIN.",
          "Starting and finishing a job are each confirmed with a 6-digit OTP that the farmer receives.",
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
      { type: "h3", text: "What you can do in the app" },
      {
        type: "ul",
        items: [
          "Edit your profile and bank details, and replace your documents.",
          "Add or remove machines.",
          "Set yourself online or offline.",
          "Change your language.",
          "Delete notifications.",
          "Turn off notifications or camera access in your phone’s settings.",
          "Log out. This also removes your push token from our server.",
          "Contact support through tickets, chat or the helpline.",
        ],
      },
      { type: "h3", text: "What you can ask us to do" },
      {
        type: "ul",
        items: [
          "Tell you what personal data we hold about you.",
          "Correct data that is wrong.",
          "Stop using optional data you gave us (Aadhaar, camera, notifications) by withdrawing your consent.",
          "Delete your account and data. The app has no delete button yet. Follow the steps on {{the delete-account page|/delete-account/machinery}}. Records we must keep by law are explained in section 11.",
        ],
      },
      {
        type: "p",
        text: "To make a request, write to [PRIVACY CONTACT EMAIL]. You may have these rights under the Digital Personal Data Protection Act, 2023 and under the Information Technology Act, 2000 and the SPDI Rules, 2011, as they apply to us. [LEGAL REVIEW: confirm the rights wording]",
      },
    ],
  },
  {
    id: "aadhaar-pan-licence",
    title: "Aadhaar, PAN and driving licence",
    blocks: [
      {
        type: "ul",
        items: [
          "We use your Aadhaar, PAN and driving licence only to check who you are and that you are eligible. Our staff review them.",
          "The Aadhaar and PAN numbers are stored encrypted. The app shows you back only the last 4 digits of your Aadhaar.",
          "We do not show your Aadhaar, PAN or licence to farmers.",
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
    id: "other-people",
    title: "Information about other people",
    blocks: [
      {
        type: "p",
        text: "You may give us the name, mobile number and photo of a machine operator, and the mobile number of an emergency contact. These people may never read this policy. By giving us their details, you confirm that you have their permission to do so.",
      },
      {
        type: "p",
        text: "During a job we also show you the farmer’s name, mobile number, village and the job address. Use them only for that job.",
      },
    ],
  },
  {
    id: "outside-india",
    title: "Transfer outside India",
    blocks: [
      {
        type: "p",
        text: "Cloudinary and Google (including Firebase Cloud Messaging and Google Fonts) may process data on servers outside India. Our own server is in [HOSTING COUNTRY/REGION]. [CONFIRM: where each provider processes data]",
      },
    ],
  },
  {
    id: "changes-and-contact",
    title: "Changes to this policy; contact and grievance",
    blocks: [
      {
        type: "p",
        text: "If we change this policy, we will put the new version on this page and change the “Last updated” date at the top. [CONFIRM: also notify users inside the app?]",
      },
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
