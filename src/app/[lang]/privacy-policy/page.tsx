import type { Metadata } from "next";

import { defaultLocale } from "@/i18n/config";
import { PolicyDocument, legalMetadata, requireEnglish } from "../legal-ui";
import {
  DATA_SAFETY,
  POLICY_INTRO,
  POLICY_SECTIONS,
  POLICY_TITLE,
  POLICY_UPDATED,
} from "./policy-content";

const DESCRIPTION =
  "How the Kisan Mitra app collects, uses, shares and protects your information, and how to ask us to delete it.";

/** English only for now: `/mr/privacy-policy` is a 404 until a Marathi text exists. */
export function generateStaticParams() {
  return [{ lang: defaultLocale }];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  return legalMetadata(
    params,
    "/privacy-policy",
    `${POLICY_TITLE} · Kisan Mitra`,
    DESCRIPTION,
  );
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = await requireEnglish(params);

  return (
    <PolicyDocument
      lang={lang}
      title={`Kisan Mitra — ${POLICY_TITLE}`}
      updated={POLICY_UPDATED}
      intro={POLICY_INTRO}
      dataSafety={DATA_SAFETY}
      sections={POLICY_SECTIONS}
    />
  );
}
