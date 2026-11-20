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
  POLICY_INTRO as LOGISTICS_INTRO,
  POLICY_SECTIONS as LOGISTICS_SECTIONS,
  POLICY_TITLE as LOGISTICS_TITLE,
  POLICY_UPDATED as LOGISTICS_UPDATED,
} from "./logistics-content";
import {
  POLICY_INTRO as KISAN_INTRO,
  POLICY_SECTIONS as KISAN_SECTIONS,
  POLICY_TITLE as KISAN_TITLE,
  POLICY_UPDATED as KISAN_UPDATED,
} from "./kisan-mitra-content";
import {
  POLICY_INTRO as MINI_MART_INTRO,
  POLICY_SECTIONS as MINI_MART_SECTIONS,
  POLICY_TITLE as MINI_MART_TITLE,
  POLICY_UPDATED as MINI_MART_UPDATED,
} from "./mini-mart-content";
import {
  POLICY_INTRO as MAN_POWER_INTRO,
  POLICY_SECTIONS as MAN_POWER_SECTIONS,
  POLICY_TITLE as MAN_POWER_TITLE,
  POLICY_UPDATED as MAN_POWER_UPDATED,
} from "./man-power-content";
import {
  POLICY_INTRO as MACHINERY_INTRO,
  POLICY_SECTIONS as MACHINERY_SECTIONS,
  POLICY_TITLE as MACHINERY_TITLE,
  POLICY_UPDATED as MACHINERY_UPDATED,
} from "./machinery-content";
import {
  POLICY_INTRO as STAFF_INTRO,
  POLICY_SECTIONS as STAFF_SECTIONS,
  POLICY_TITLE as STAFF_TITLE,
  POLICY_UPDATED as STAFF_UPDATED,
} from "./staff-content";
import {
  POLICY_INTRO as STORAGE_INTRO,
  POLICY_SECTIONS as STORAGE_SECTIONS,
  POLICY_TITLE as STORAGE_TITLE,
  POLICY_UPDATED as STORAGE_UPDATED,
} from "./storage-content";

/**
 * Per-app privacy policy at /apps/<id>/privacy-policy. An app only has one if
 * it is listed here (and in PRIVACY_POLICY_HREF in apps-data.ts, which decides
 * which app pages show the "Privacy Policy" button); any other id is a 404.
 */
type AppPolicy = {
  metaTitle: string;
  description: string;
  title: string;
  updated: string;
  /** Label before the date. Defaults to "Last updated". */
  dateLabel?: string;
  intro: string;
  /** Omit to leave the "Data safety" box off the page. */
  dataSafety?: DataSafety;
  sections: Section[];
};

const POLICIES: Record<string, AppPolicy> = {
  "kisan-mitra": {
    metaTitle: "Kisan Mitra App Privacy Policy · Kisan Mitra",
    description:
      "How the Kisan Mitra app collects, uses, shares and protects your information, and how to ask us to delete it.",
    title: KISAN_TITLE,
    updated: KISAN_UPDATED,
    dateLabel: "Effective date",
    intro: KISAN_INTRO,
    sections: KISAN_SECTIONS,
  },
  logistics: {
    metaTitle: "RKF Logistics App Privacy Policy · Kisan Mitra",
    description:
      "How the RKF Logistics app collects, uses, shares and protects your information, including live location during a trip, and how to ask us to delete it.",
    title: LOGISTICS_TITLE,
    updated: LOGISTICS_UPDATED,
    dateLabel: "Effective date",
    intro: LOGISTICS_INTRO,
    sections: LOGISTICS_SECTIONS,
  },
  // Served at /apps/machinery/... (not the site's app id "machinery-rental"):
  // that is the URL given to the app and the Play Console.
  // /apps/machinery-rental/privacy-policy redirects here (next.config.ts).
  machinery: {
    metaTitle: "RKF Machinery Owner App Privacy Policy · Kisan Mitra",
    description:
      "How the RKF Machinery Owner app collects, uses, shares and protects your information, and how to ask us to delete it.",
    title: MACHINERY_TITLE,
    updated: MACHINERY_UPDATED,
    dateLabel: "Effective date",
    intro: MACHINERY_INTRO,
    sections: MACHINERY_SECTIONS,
  },
  storage: {
    metaTitle: "RKF Storage Provider App Privacy Policy · Kisan Mitra",
    description:
      "How the RKF Storage Provider app collects, uses, shares and protects your information, including the one-time location for your godown pin, and how to ask us to delete it.",
    title: STORAGE_TITLE,
    updated: STORAGE_UPDATED,
    dateLabel: "Effective date",
    intro: STORAGE_INTRO,
    sections: STORAGE_SECTIONS,
  },
  // Served at /apps/man-power/... (not the site's app id "labor-provider"):
  // that is the URL given to the app and the Play Console.
  // /apps/labor-provider/privacy-policy redirects here (next.config.ts).
  "man-power": {
    metaTitle: "RKF Man Power App Privacy Policy · Kisan Mitra",
    description:
      "How the RKF Man Power app collects, uses, shares and protects the information of labour contractors and workers, and how to ask us to delete it.",
    title: MAN_POWER_TITLE,
    updated: MAN_POWER_UPDATED,
    dateLabel: "Effective date",
    intro: MAN_POWER_INTRO,
    sections: MAN_POWER_SECTIONS,
  },
  // The Mini Mart app is listed on the site as "SuperMart" (app id
  // "supermart-pos"); its policy lives at /apps/mini-mart/..., the URL given to
  // the app. /apps/supermart-pos/privacy-policy redirects here (next.config.ts).
  // It has no delete-account page: accounts are closed through the Super Store / RKF.
  "mini-mart": {
    metaTitle: "RKF Mini Mart App Privacy Policy · Kisan Mitra",
    description:
      "How the RKF Mini Mart app collects, uses, shares and protects the information of shop owners and staff, and the farmers' and customers' data they handle, and how to ask for an account to be closed.",
    title: MINI_MART_TITLE,
    updated: MINI_MART_UPDATED,
    dateLabel: "Effective date",
    intro: MINI_MART_INTRO,
    sections: MINI_MART_SECTIONS,
  },
  // Served at /apps/staff/... (not the site's app id "staff-app"): that is the
  // URL given to the app and the Play Console.
  // /apps/staff-app/privacy-policy redirects here (next.config.ts).
  // It has no delete-account page: RKF creates and closes staff accounts (HR).
  staff: {
    metaTitle: "RKF Staff App Privacy Policy · Kisan Mitra",
    description:
      "How the RKF Staff App collects, uses, shares and protects the information of RKF field staff, including location for attendance and land survey, and the farmers' data they handle, and how to ask for an account to be closed.",
    title: STAFF_TITLE,
    updated: STAFF_UPDATED,
    dateLabel: "Effective date",
    intro: STAFF_INTRO,
    sections: STAFF_SECTIONS,
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
      dateLabel={policy.dateLabel}
      intro={policy.intro}
      dataSafety={policy.dataSafety}
      sections={policy.sections}
    />
  );
}
