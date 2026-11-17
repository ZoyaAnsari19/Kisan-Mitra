import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultLocale } from "@/i18n/config";
import {
  PolicyDocument,
  legalMetadata,
  requireEnglish,
  type DataSafety,
  type Section,
} from "../../../legal-ui";
import {
  DATA_SAFETY as LOGISTICS_DATA_SAFETY,
  POLICY_INTRO as LOGISTICS_INTRO,
  POLICY_SECTIONS as LOGISTICS_SECTIONS,
  POLICY_TITLE as LOGISTICS_TITLE,
  POLICY_UPDATED as LOGISTICS_UPDATED,
} from "./logistics-content";
import {
  DATA_SAFETY as MACHINERY_DATA_SAFETY,
  POLICY_INTRO as MACHINERY_INTRO,
  POLICY_SECTIONS as MACHINERY_SECTIONS,
  POLICY_TITLE as MACHINERY_TITLE,
  POLICY_UPDATED as MACHINERY_UPDATED,
} from "./machinery-rental-content";

/**
 * Per-app privacy policy at /apps/<id>/privacy-policy. An app only has one if
 * it is listed here (and in PRIVACY_POLICY_HREF in apps-data.ts, which decides
 * where the "Privacy Policy" link is shown); any other id is a 404.
 * The Kisan Mitra farmer app's policy lives at /privacy-policy.
 */
type AppPolicy = {
  metaTitle: string;
  description: string;
  title: string;
  updated: string;
  intro: string;
  dataSafety: DataSafety;
  sections: Section[];
};

const POLICIES: Record<string, AppPolicy> = {
  logistics: {
    metaTitle: "Transporter App Privacy Policy · Kisan Mitra",
    description:
      "How the Transporter app collects, uses, shares and protects your information, including live location during a trip, and how to ask us to delete it.",
    title: LOGISTICS_TITLE,
    updated: LOGISTICS_UPDATED,
    intro: LOGISTICS_INTRO,
    dataSafety: LOGISTICS_DATA_SAFETY,
    sections: LOGISTICS_SECTIONS,
  },
  "machinery-rental": {
    metaTitle: "Machinery Rental App Privacy Policy · Kisan Mitra",
    description:
      "How the Machinery Rental app collects, uses, shares and protects your information, including push notifications, and how to ask us to delete it.",
    title: MACHINERY_TITLE,
    updated: MACHINERY_UPDATED,
    intro: MACHINERY_INTRO,
    dataSafety: MACHINERY_DATA_SAFETY,
    sections: MACHINERY_SECTIONS,
  },
};

type Params = Promise<{ lang: string; id: string }>;

/** English only for now: `/mr/apps/<id>/privacy-policy` is a 404 until a Marathi text exists. */
export function generateStaticParams() {
  return Object.keys(POLICIES).map((id) => ({ lang: defaultLocale, id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const policy = POLICIES[id];
  if (!policy) notFound();
  return legalMetadata(
    params,
    `/apps/${id}/privacy-policy`,
    policy.metaTitle,
    policy.description,
  );
}

export default async function AppPrivacyPolicyPage({
  params,
}: {
  params: Params;
}) {
  const lang = await requireEnglish(params);
  const { id } = await params;
  const policy = POLICIES[id];
  if (!policy) notFound();

  return (
    <PolicyDocument
      lang={lang}
      title={policy.title}
      updated={policy.updated}
      intro={policy.intro}
      dataSafety={policy.dataSafety}
      sections={policy.sections}
    />
  );
}
