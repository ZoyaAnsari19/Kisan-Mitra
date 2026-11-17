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
} from "../../legal-ui";

/**
 * Delete-account page for each partner app, at /delete-account/<app>.
 * (The Kisan Mitra farmer app's page is /delete-account.)
 *
 * The apps have no in-app "Delete my account" and the backend has no endpoint
 * for it, so these pages describe a support-led process. The process itself is
 * not decided yet — every [BRACKETED] value is an open decision.
 * Do not claim the user can delete from inside an app unless that is built.
 */
type AppDeletion = {
  /** Used in the intro, e.g. "This page is for the Transporter app." */
  appLabel: string;
  /** Short name for the page title and the email subject. */
  shortName: string;
  policyHref: string;
  /** What we erase — the exact list is still to be confirmed per app. */
  erasedList: string;
  /** What else needs a decision before the account is deleted. */
  keepQuestion: string;
  /** Things the user can do in the app without deleting the account. */
  inAppActions: string[];
  /** What to write to us to remove, beyond the in-app actions. */
  removeOnRequest: string;
};

const APPS: Record<string, AppDeletion> = {
  logistic: {
    appLabel: "Transporter app",
    shortName: "Transporter",
    policyHref: "/apps/logistics/privacy-policy",
    erasedList:
      "profile, documents and their photos, Aadhaar and PAN numbers, vehicles, driver and emergency-contact details, bank details, chats, tickets, trip trail and location points",
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
  machinery: {
    appLabel: "Machinery Rental app",
    shortName: "Machinery Rental",
    policyHref: "/apps/machinery-rental/privacy-policy",
    erasedList:
      "profile, documents and their photos, Aadhaar and PAN numbers, machines, operator and emergency-contact details, bank details, chats, tickets, push token",
    keepQuestion:
      "what happens to any balance left in your wallet, and to completed job records that also belong to the farmer",
    inAppActions: [
      "Edit your profile and bank details.",
      "Replace your documents.",
      "Remove a machine.",
      "Delete notifications.",
      "Turn off notifications or camera access in your phone’s settings.",
      "Log out. This also removes your push token from our server.",
    ],
    removeOnRequest: "your Aadhaar, PAN or driving licence",
  },
};

function buildSections(a: AppDeletion): Section[] {
  return [
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
            "We will finish the deletion within [N] days and tell you when it is done.",
          ],
        },
      ],
    },
    {
      id: "what-we-delete",
      title: "What we delete",
      blocks: [
        {
          type: "p",
          text: `We delete your account and the personal data tied to it. [CONFIRM: list of what is erased — ${a.erasedList}]`,
        },
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
            "Financial records: wallet, withdrawal and transfer records, and bank and transaction records.",
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
  ];
}

type Params = Promise<{ lang: string; app: string }>;

/** English only for now: `/mr/delete-account/<app>` is a 404 until a Marathi text exists. */
export function generateStaticParams() {
  return Object.keys(APPS).map((app) => ({ lang: defaultLocale, app }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { app } = await params;
  const entry = APPS[app];
  if (!entry) notFound();
  return legalMetadata(
    params,
    `/delete-account/${app}`,
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
  const { app } = await params;
  const entry = APPS[app];
  if (!entry) notFound();

  return (
    <LegalShell lang={lang}>
      <h1 className="font-serif text-huge text-forest">
        <Rich text="[PLAY STORE APP NAME] — Delete your account" />
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-forest/70">
        <Rich
          text={`This page is for the ${entry.appLabel}. Using the Kisan Mitra farmer app? See {{how to delete your Kisan Mitra account|/delete-account}}.`}
        />
      </p>

      {buildSections(entry).map((section, i) => (
        <SectionView key={section.id} section={section} number={i + 1} />
      ))}
    </LegalShell>
  );
}
