import type { Metadata } from "next";

import { defaultLocale } from "@/i18n/config";
import {
  LegalShell,
  Rich,
  SectionView,
  legalMetadata,
  requireEnglish,
  type Section,
} from "../legal-ui";

const TITLE = "Delete your account · Kisan Mitra";
const DESCRIPTION =
  "How to ask for your Kisan Mitra account and data to be deleted, and which records we must keep by law.";

/**
 * The app has no in-app "Delete my account" and the backend has no endpoint for
 * it, so this page describes a support-led process. The process itself is not
 * decided yet — every [BRACKETED] value is an open decision (see policy-content.ts).
 * Do not claim the user can delete from inside the app unless that is built.
 */
const SECTIONS: Section[] = [
  {
    id: "how-to-request",
    title: "How to ask us to delete your account",
    blocks: [
      {
        type: "p",
        text: "The Kisan Mitra app does not have a delete button yet. You can ask us to delete your account and data in this way. [CONFIRM: final deletion process]",
      },
      {
        type: "ul",
        items: [
          "Write to [PRIVACY CONTACT EMAIL] with the subject “Delete my Kisan Mitra account”. [CONFIRM: also accept a support ticket from inside the app]",
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
        text: "We delete your account and the personal data tied to it. [CONFIRM: list of what is erased — profile, addresses, KYC photos and numbers, chats, uploaded files, notifications]",
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
          "Financial records: wallet, credit and settlement records, and bank and transaction records.",
          "KYC records.",
          "The audit log of sensitive actions. It is built so that it cannot be edited or deleted.",
        ],
      },
      {
        type: "p",
        text: "[CONFIRM: what happens to any balance left in your wallet when the account is deleted]",
      },
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
      {
        type: "ul",
        items: [
          "Delete a saved address, notifications, price alerts, and items in your cart or wishlist.",
          "Replace your KYC documents.",
          "Refuse or turn off camera, microphone and location in your phone’s settings.",
        ],
      },
      {
        type: "p",
        text: "To remove your Aadhaar or PAN, or to ask what data we hold about you, write to [PRIVACY CONTACT EMAIL]. See the {{Privacy Policy|/privacy-policy}} for details.",
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

/** English only for now: `/mr/delete-account` is a 404 until a Marathi text exists. */
export function generateStaticParams() {
  return [{ lang: defaultLocale }];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  return legalMetadata(params, "/delete-account", TITLE, DESCRIPTION);
}

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = await requireEnglish(params);

  return (
    <LegalShell lang={lang}>
      <h1 className="font-serif text-huge text-forest">
        Kisan Mitra — Delete your account
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-forest/70">
        <Rich text="This page is for the Kisan Mitra farmer app. Using a partner app? See how to delete your {{Transporter|/delete-account/logistic}} or {{Machinery Rental|/delete-account/machinery}} account." />
      </p>

      {SECTIONS.map((section, i) => (
        <SectionView key={section.id} section={section} number={i + 1} />
      ))}
    </LegalShell>
  );
}
