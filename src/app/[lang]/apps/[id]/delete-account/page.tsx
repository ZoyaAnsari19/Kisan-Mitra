import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale } from "@/i18n/config";
import {
  LegalShell,
  Rich,
  SectionView,
  legalMetadata,
  requireEnglish,
  type Section,
} from "../../../legal-ui";

/**
 * Delete-account page for each app, at /apps/<id>/delete-account — the same
 * format as /apps/<id>/privacy-policy. An app only has one if it is listed in
 * APPS below; any other id is a 404.
 *
 * The apps have no in-app "Delete my account" and the backend has no endpoint
 * for it, so these pages describe a support-led process. The process itself is
 * not decided yet — every [BRACKETED] value is an open decision.
 * Do not claim the user can delete from inside an app unless that is built.
 */
type AppDeletion = {
  /** Page heading. A placeholder until the Play Store name is final. */
  heading: string;
  /** Used in the intro, e.g. "This page is for the Transporter app." */
  appLabel: string;
  /** Short name for the page title and the email subject. */
  shortName: string;
  policyHref: string;
  /** "[N]" until the company has decided how many days. */
  days: string;
  /** What we erase — the exact list is still to be confirmed per app. */
  erasedText: string;
  /** What we must keep; shown as a list after the retention sentence. */
  financialRecords: string;
  /** What else needs a decision before the account is deleted. */
  keepQuestion: string;
  /** Things that must be settled before we can delete. */
  beforeYouAsk?: string[];
  /** Which account is removed, when the user has other Kisan Mitra apps. */
  scopeNote?: string;
  /** Things the user can do in the app without deleting the account. */
  inAppActions: string[];
  /** What to write to us to remove, beyond the in-app actions. */
  removeOnRequest: string;
};

const APPS: Record<string, AppDeletion> = {
  "kisan-mitra": {
    heading: "Kisan Mitra — Delete your account",
    appLabel: "Kisan Mitra farmer app",
    shortName: "Kisan Mitra",
    policyHref: "/apps/kisan-mitra/privacy-policy",
    days: "[N]",
    erasedText:
      "We delete or anonymise your personal data: your name, mobile number, address, photos, KYC documents, land documents and bank details.",
    financialRecords:
      "Financial records: wallet, bookings, orders, membership, udhaar and payment records.",
    keepQuestion:
      "whether these records are kept without your name and mobile number",
    beforeYouAsk: [
      "If your wallet still has money, you have unpaid udhaar or dues, you have a top-up or withdrawal pending, or you have an open booking or order, settle that first. We can delete your account only after that.",
    ],
    scopeNote:
      "We delete only your farmer account. Accounts in other RKF apps are not affected.",
    inAppActions: [
      "Delete a saved address, notifications, price alerts, and items in your cart or wishlist.",
      "Replace your KYC documents.",
      "Refuse or turn off camera, microphone and location in your phone’s settings.",
    ],
    removeOnRequest: "your Aadhaar or PAN",
  },
  logistics: {
    heading: "[PLAY STORE APP NAME] — Delete your account",
    appLabel: "Transporter app",
    shortName: "Transporter",
    policyHref: "/apps/logistics/privacy-policy",
    days: "[N]",
    erasedText:
      "We delete your account and the personal data tied to it. [CONFIRM: list of what is erased — profile, documents and their photos, Aadhaar and PAN numbers, vehicles, driver and emergency-contact details, bank details, chats, tickets, trip trail and location points]",
    financialRecords:
      "Financial records: wallet, withdrawal and transfer records, and bank and transaction records.",
    keepQuestion:
      "what happens to any balance left in your wallet, and to completed trip records that also belong to the farmer",
    inAppActions: [
      "Edit your profile and bank details.",
      "Replace your documents.",
      "Remove a vehicle.",
      "Delete notifications.",
      "Refuse or turn off location, camera and photo access in your phone’s settings. Trips still work without location. Only the sharing stops.",
    ],
    removeOnRequest: "your Aadhaar, PAN or driving licence",
  },
  // The Machinery Owner policy and delete page live at /apps/machinery/...,
  // not /apps/machinery-rental/... — that is the URL the app and the Play
  // Console are given. (/apps/machinery-rental/... redirects here.)
  machinery: {
    heading: "RKF Machinery Owner — Delete your account",
    appLabel: "RKF Machinery Owner app",
    shortName: "Machinery Owner",
    policyHref: "/apps/machinery/privacy-policy",
    days: "7",
    erasedText:
      "We delete or anonymise your personal data: your name, mobile number, address, photos, KYC documents and bank details. Your machine listings are made inactive, and their personal details and photos are removed.",
    financialRecords:
      "Financial records: money transactions, wallet, bookings and billing records.",
    keepQuestion:
      "whether these records are kept without your name and mobile number",
    beforeYouAsk: [
      "If your wallet still has money, you have dues or a penalty to pay, you have a top-up or withdrawal pending, you have an open booking, or your account is suspended, settle that first. We can delete your account only after that.",
    ],
    scopeNote:
      "We delete only your machinery owner account. If you also have an account in another Kisan Mitra service, that account stays.",
    inAppActions: [
      "Edit your profile and bank details.",
      "Replace your documents.",
      "Delete notifications.",
      "Turn off camera access in your phone’s settings. The photo and QR features then stop working, and the rest of the app still works.",
    ],
    removeOnRequest: "your Aadhaar, PAN or driving licence",
  },
  storage: {
    heading: "RKF Storage Provider — Delete your account",
    appLabel: "RKF Storage Provider app",
    shortName: "Storage Provider",
    policyHref: "/apps/storage/privacy-policy",
    days: "7",
    erasedText:
      "We delete or anonymise your personal data: your name, mobile number, address, photos, KYC documents and bank details. Your godown is made inactive, and its name, address, photos, documents and map pin are removed. [CONFIRM: company decision of 18-11-2026, to be confirmed once the backend is built]",
    financialRecords:
      "Financial records: money transactions, wallet, bookings, bills and penalty records.",
    keepQuestion:
      "whether these records are kept without your name and mobile number",
    beforeYouAsk: [
      "If your wallet still has money, you have dues or a penalty to pay, you have a top-up or withdrawal pending, you have an open booking, a farmer’s goods are still stored in your facility, or your account is suspended, settle that first. We can delete your account only after that.",
    ],
    scopeNote:
      "We delete only your storage owner account. If you also have an account in another Kisan Mitra service, that account stays.",
    inAppActions: [
      "See your data and correct wrong information in your profile.",
      "Turn off camera or location access in your phone’s settings. The photo, QR and “use my location” features then stop working, and the rest of the app still works.",
    ],
    removeOnRequest: "your Aadhaar, PAN or other ID documents",
  },
};

function buildSections(a: AppDeletion): Section[] {
  const sections: Section[] = [
    {
      id: "how-to-request",
      title: "How to ask us to delete your account",
      blocks: [
        {
          type: "p",
          text: `The ${a.appLabel} does not have a delete button yet. You can ask us to delete your account and data in this way. [CONFIRM: final deletion process]`,
        },
        {
          type: "ul",
          items: [
            `Write to [PRIVACY CONTACT EMAIL] with the subject “Delete my ${a.shortName} account”. [CONFIRM: also accept a support ticket from inside the app]`,
            "Tell us the mobile number you registered with.",
            "We will send an OTP to that number to check that the request is yours. [CONFIRM: OTP verification, once the SMS service is live]",
            `Our team reviews your request and approves it. We will finish the deletion within ${a.days} days${a.days === "[N]" ? "" : " [CONFIRM: number of days]"} and tell you when it is done. After that, the data does not come back.`,
          ],
        },
      ],
    },
  ];

  if (a.beforeYouAsk) {
    sections.push({
      id: "before-you-ask",
      title: "Before you ask",
      blocks: [{ type: "ul", items: a.beforeYouAsk }],
    });
  }

  sections.push(
    {
      id: "what-we-delete",
      title: "What we delete",
      blocks: [
        { type: "p", text: a.erasedText },
        ...(a.scopeNote ? [{ type: "p" as const, text: a.scopeNote }] : []),
      ],
    },
    {
      id: "what-we-keep",
      title: "What we keep, and why",
      blocks: [
        {
          type: "p",
          text: "Some records are legal and financial records. We cannot erase them. We mark them as deleted and keep them for [RETENTION PERIOD].",
        },
        {
          type: "ul",
          items: [
            a.financialRecords,
            "KYC records.",
            "The audit log of sensitive actions. It is built so that it cannot be edited or deleted.",
          ],
        },
        { type: "p", text: `[CONFIRM: ${a.keepQuestion}]` },
      ],
    },
    {
      id: "delete-only-some",
      title: "If you only want to remove some data",
      blocks: [
        {
          type: "p",
          text: "You do not have to delete your whole account. In the app you can:",
        },
        { type: "ul", items: a.inAppActions },
        {
          type: "p",
          text: `To remove ${a.removeOnRequest}, or to ask what data we hold about you, write to [PRIVACY CONTACT EMAIL]. See the {{${a.appLabel} privacy policy|${a.policyHref}}} for details.`,
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
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
  );

  return sections;
}

type Params = Promise<{ lang: string; id: string }>;

/** English only for now: `/mr/apps/<id>/delete-account` is a 404 until a Marathi text exists. */
export function generateStaticParams() {
  return Object.keys(APPS).map((id) => ({ lang: defaultLocale, id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = APPS[id];
  if (!entry) notFound();
  return legalMetadata(
    params,
    `/apps/${id}/delete-account`,
    `Delete your ${entry.shortName} account · Kisan Mitra`,
    `How to ask for your ${entry.appLabel} account and data to be deleted, and which records we must keep by law.`,
  );
}

export default async function AppDeleteAccountPage({
  params,
}: {
  params: Params;
}) {
  const lang = await requireEnglish(params);
  const { id } = await params;
  const entry = APPS[id];
  if (!entry) notFound();

  const others = Object.entries(APPS).filter(([key]) => key !== id);

  return (
    <LegalShell lang={lang}>
      <h1 className="font-serif text-huge text-forest">
        <Rich text={entry.heading} />
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-forest/70">
        <Rich
          text={`This page is for the ${entry.appLabel}. Using another Kisan Mitra app? See how to delete your ${others
            .map(([key, o]) => `{{${o.shortName}|/apps/${key}/delete-account}}`)
            .join(" or ")} account.`}
        />
      </p>

      {buildSections(entry).map((section, i) => (
        <SectionView key={section.id} section={section} number={i + 1} />
      ))}
    </LegalShell>
  );
}
