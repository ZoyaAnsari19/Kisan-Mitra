import type { DataSafety, Section } from "../../../legal-ui";

/**
 * Privacy Policy copy (English) for the Logistic / Transporter provider app.
 * This is a DIFFERENT app from Kisan Mitra (live driver tracking, vehicle and
 * driving-licence documents, Firebase Analytics) — do not copy text between the
 * two files without checking it against the facts for this app.
 *
 * `[BRACKETED]` text is a decision the company has not made yet. It is rendered
 * highlighted on the page. Do not replace one with a guess — the legal-entity
 * name, address and email must match the Play Console account exactly.
 * To list what is still open:  grep -o "\[[^]]*\]" logistics-content.ts
 */

export const POLICY_TITLE = "[PLAY STORE APP NAME] — Privacy Policy";
export const POLICY_UPDATED = "[DATE]";
export const POLICY_INTRO =
  "This policy is for the Transporter app, for vehicle owners and drivers. Using another Kisan Mitra app? See the {{Kisan Mitra farmer app policy|/privacy-policy}} or the {{Machinery Rental app policy|/apps/machinery-rental/privacy-policy}}.";

/** Mirrors the Play Console "Data safety" form. Keep the two in sync. */
export const DATA_SAFETY: DataSafety = {
  title: "Data safety summary",
  rows: [
    {
      label: "Data we collect",
      value:
        "Personal info (name, email, phone, address), financial info (bank account, wallet), location (precise and approximate), photos, files and documents, messages, app activity, device or other IDs (app instance ID, and possibly the advertising ID).",
    },
    {
      label: "Shared with others",
      value:
        "Yes — including your live location, which the farmer who booked the trip can see. See sections 5 and 8.",
    },
    { label: "Encrypted in transit", value: "Yes (HTTPS)." },
    {
      label: "You can ask us to delete your data",
      value: "Yes — see section 13.",
    },
    {
      label: "Collected for advertising",
      value: "No. [CONFIRM after the Firebase and advertising ID decision]",
    },
  ],
};

export const POLICY_SECTIONS: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are and how to contact us",
    blocks: [
      {
        type: "p",
        text: "[PLAY STORE APP NAME] is an app for transporters (vehicle owners) and their drivers. It is part of the RKF Foundation platform and is run by [LEGAL ENTITY NAME]. In this policy, “we” means [LEGAL ENTITY NAME] and “you” means the transporter or vehicle owner who uses the app.",
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
          "You log in with your mobile number and a one-time password (OTP). You then add your profile, your documents and your vehicles. Our staff check them.",
          "We share your live location with the farmer who booked you, during a trip, and only while the app is open. We take your location only during an active trip.",
          "We collect your identity and licence documents, your vehicle details, your bank details and your wallet records. We also keep your chats and support tickets.",
          "We use this to verify you, to run trips and payments, to keep trips safe, to prevent fraud, to support you and to follow the law.",
          "We share data with our staff, with the farmer on your trip, and with a few service companies: Cloudinary, a map provider, Google (including Firebase Analytics) and, when it is live, an SMS provider. See section 8.",
          "The app uses Firebase Analytics, so Google receives some usage and device data from the app. See section 9.",
          "We do not sell your data. All data between the app and our server travels over HTTPS.",
          "You can ask us to delete your account. See {{how to delete your account|/delete-account/logistic}}.",
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
        text: "This policy applies to adult transporters and drivers who register in the app. The app is not meant for children. If you think a child has registered, please contact us (section 17) and we will look into it.",
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
            "Full name, locality or village, email, date of birth, gender, pin code, address, profile photo",
            "To set up your transporter profile.",
            "Asked at registration. [CONFIRM which fields are required]",
          ],
          [
            "PAN number",
            "To verify your identity. See section 14.",
            "Required",
          ],
          [
            "Aadhaar number",
            "To verify your identity. See section 14.",
            "Optional",
          ],
          [
            "Emergency contact: the mobile number of another person",
            "To have someone we can reach in an emergency. See section 15.",
            "Asked at registration. [CONFIRM required or optional]",
          ],
          [
            "Photos of Aadhaar (front and back), PAN card and driving licence; driving licence number and expiry date",
            "To check your identity and that you may drive. Our staff review them. Adding or replacing any document puts your account back to “pending verification”.",
            "Asked for verification. [CONFIRM which are required]",
          ],
          [
            "Vehicle details: registration number, type, body, model, year, loading size, capacity, availability; photos of the RC, insurance and permit; insurance number and expiry; vehicle photos; owner name; vehicle reviews",
            "To verify your vehicles and match them with transport requests.",
            "Required to add a vehicle",
          ],
          [
            "Driver details for each vehicle: name, mobile number, photo. The driver may not use the app themselves.",
            "To tell the farmer who is driving. See section 15.",
            "Asked when you add a driver. [CONFIRM required or optional]",
          ],
          [
            "Your availability (online or offline)",
            "To decide whether you get transport requests.",
            "You set it",
          ],
          [
            "Trip details about farmers: name, mobile number, pickup and drop place (text and coordinates), distance, date and time, goods type, quantity, the farmer’s note, fare, payment mode, and when the trip was accepted, picked up, delivered or cancelled",
            "To carry out the trip. This is other people’s data. We show it to you only for trips you take.",
            "Collected for each trip",
          ],
          [
            "Live location during a trip: latitude, longitude and speed in km/h",
            "So the farmer can follow the trip. See section 5.",
            "Only during an active trip",
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
            "Chat messages with the assistance team (text, photos, voice messages you receive), support tickets and replies, in-app notifications",
            "To help and support you.",
            "When you use these features",
          ],
          [
            "IP address and a device label stored with your login sessions; an audit log of sensitive actions with who did it and when",
            "For security and fraud prevention.",
            "Collected automatically",
          ],
          [
            "Usage and device data collected automatically by Firebase Analytics",
            "To see how the app is used and improve it. See section 9.",
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
          "Your contacts, SMS or call log.",
          "Audio from your microphone. The app can play voice messages but cannot record.",
        ],
      },
    ],
  },
  {
    id: "location",
    title: "Your location and live tracking",
    blocks: [
      {
        type: "p",
        text: "This app shares your live position with the farmer during a trip. Please read this section.",
      },
      { type: "h3", text: "What we take" },
      {
        type: "ul",
        items: [
          "Your position (latitude and longitude) and your speed in km/h.",
        ],
      },
      { type: "h3", text: "When we take it" },
      {
        type: "ul",
        items: [
          "Only during an active trip. That starts after you accept a booking and the trip is under way, when the trip screen opens in its active stage. It stops when the trip is delivered or cancelled, or when you close the screen.",
          "Only while the app is on your screen. The app does not use your location in the background and does not run a background service. When the app is not on screen, sharing pauses.",
          "We ask for the location permission when a trip starts.",
          "The app sends a reading at most once every 30 seconds, and only after the phone has moved about 25 metres. If a reading fails to send, it is dropped. Readings at 0,0 are not sent.",
          "Our server keeps one live position for each driver and adds a trail point about once a minute.",
        ],
      },
      { type: "h3", text: "Who can see it" },
      {
        type: "ul",
        items: [
          "The farmer who booked the trip can see your live position and the trail of the trip.",
          "[CONFIRM: who else can see it, for example assigned staff]",
        ],
      },
      { type: "h3", text: "Why" },
      {
        type: "ul",
        items: [
          "So the farmer can follow their goods and know when you will arrive. We keep the trail as a record of the trip. [CONFIRM: how long the trail is kept]",
        ],
      },
      { type: "h3", text: "How to stop it" },
      {
        type: "ul",
        items: [
          "Refuse the location permission, or turn it off later in your phone’s settings.",
          "The trip still works without location. The app tells you once that the farmer cannot follow the trip, and only the sharing stops.",
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
            "To scan wallet or payment QR codes, and to take photos of documents, your vehicle, your profile, payment proof, and chat or ticket attachments.",
            "Only when you tap the button that needs it",
          ],
          [
            "Photos (Android 13 and above) or storage read (Android 12 and below)",
            "To let you choose existing photos from your gallery.",
            "Only when you tap “gallery”",
          ],
          [
            "Location (precise and approximate)",
            "To share your live position with the farmer during a trip. See section 5.",
            "Only while the app is open. Asked when a trip starts.",
          ],
          [
            "Keep the phone awake",
            "To keep the phone awake while a voice message plays.",
            "Only during playback",
          ],
          [
            "Advertising ID and ad-services permissions",
            "The Firebase Analytics library adds these to the app automatically. The app shows no ads. Firebase Analytics may use the advertising ID. See section 9.",
            "Automatic",
          ],
        ],
      },
      {
        type: "ul",
        items: [
          "The app does not ask for background location, microphone, contacts, SMS, call log or phone state.",
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
          "To create and verify your account, your documents and your vehicles.",
          "To match you with transport requests and to run trips, including the 6-digit OTP check at pickup and at delivery.",
          "For safety: to let the farmer follow the trip.",
          "To run your wallet, pay your earnings and handle withdrawals.",
          "For fraud prevention.",
          "To answer your chats and support tickets.",
          "To see how the app is used, with analytics, and to improve it.",
          "To follow the law.",
          "We do not use your information for advertising. [CONFIRM]",
        ],
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
          "RKF staff and admins. They check your identity, vehicles and bank account, and they help and support you. Each staff member can see only their own role and region.",
          "The farmer who booked you. During the trip the farmer sees your name or the driver’s name, mobile number, photo, the vehicle number and model, and your live position and trail. [CONFIRM the exact fields the farmer sees]",
          "Other platform users, where needed to finish a trip or a payment. For example, a person you send money to from your wallet sees the account holder’s name when they look up the wallet.",
          "Cloudinary, a cloud file service. It stores the images you upload, such as documents, vehicle, bank and chat images. Sensitive files are kept as private files.",
          "A map provider. The phone loads map pictures straight from the provider the server chooses: Mapbox when it is turned on, or OpenStreetMap (tile.openstreetmap.org) when the server has no map set up. The provider sees your phone’s IP address and the map area you look at. Our server also uses Mapbox for place search and road distance. [CONFIRM which provider is live in production]",
          "Google Firebase Analytics and Google Play services. See section 9.",
          "Google ML Kit. It reads QR codes on your phone. No image leaves your phone for this.",
          "Google Fonts. The app loads its fonts from Google while it runs, so Google receives your phone’s IP address.",
          "Apps you choose to open: your phone dialer when you call the farmer or the helpline, a maps app with coordinates for directions, and a browser or WhatsApp link from the assistance team screen. They open when you tap, and we do not control them.",
          "SMS provider for OTP: [NAME OF SMS GATEWAY]. It will receive your mobile number to deliver the OTP.",
          "Authorities, where the law, a court order or fraud prevention requires it.",
        ],
      },
    ],
  },
  {
    id: "analytics-and-technical",
    title: "Analytics and technical data",
    blocks: [
      {
        type: "ul",
        items: [
          "The app includes Google Firebase Analytics. It automatically collects how the app is used (events), an app-instance ID, device and app information, and your approximate location from your IP address. It may also use the advertising ID. [CONFIRM what is switched on in the Firebase console, and whether Firebase Analytics stays in the app]",
          "We store your IP address and a device label with your login sessions, for security.",
          "While the app is open, it keeps a live connection to our server so chat and notifications update at once. The connection closes when you close the app.",
          "When you open the app, it checks your saved session with our server to decide whether to show the login screen or your dashboard.",
          "The app has no background service and no scheduled job. This version does not register for push notifications.",
          "Fonts load from Google, and map pictures load from the map provider (see section 8).",
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
          "Temporary files for QR images you share or save. You can save your wallet QR to your gallery.",
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
          "Trip trail and location points: [RETENTION PERIOD]",
          "Chats, support tickets, documents and analytics data: [RETENTION PERIODS]",
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
          "Pickup and delivery are each confirmed with a 6-digit OTP that the farmer receives.",
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
          "Add or remove vehicles.",
          "Set yourself online or offline.",
          "Change your language.",
          "Delete notifications.",
          "Refuse or turn off location, camera and photo access in your phone’s settings. Trips still work without location. Only the sharing stops.",
          "Log out.",
          "Contact support through tickets, chat or the helpline.",
        ],
      },
      { type: "h3", text: "What you can ask us to do" },
      {
        type: "ul",
        items: [
          "Tell you what personal data we hold about you.",
          "Correct data that is wrong.",
          "Stop using optional data you gave us (Aadhaar, location, camera) by withdrawing your consent.",
          "Delete your account and data. The app has no delete button yet. Follow the steps on {{the delete-account page|/delete-account/logistic}}. Records we must keep by law are explained in section 11.",
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
          "PAN is required. Aadhaar is optional. We also ask for a driving licence.",
          "We use them only to check who you are and that you may drive. Our staff review them.",
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
        text: "You may give us the name, mobile number and photo of a driver, and the mobile number of an emergency contact. These people may never read this policy. By giving us their details, you confirm that you have their permission to do so.",
      },
      {
        type: "p",
        text: "During a trip we also show you the farmer’s name, mobile number, pickup and drop place and trip details. Use them only for that trip.",
      },
    ],
  },
  {
    id: "outside-india",
    title: "Transfer outside India",
    blocks: [
      {
        type: "p",
        text: "Cloudinary, Google (including Firebase Analytics and Google Fonts) and the map provider may process data on servers outside India. Our own server is in [HOSTING COUNTRY/REGION]. [CONFIRM: where each provider processes data]",
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
