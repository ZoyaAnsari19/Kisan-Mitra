import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Every app's legal pages follow /apps/<id>/privacy-policy and
    // /apps/<id>/delete-account. These are the earlier URLs, kept so links that
    // were already shared keep working. (Temporary redirects: the scheme may
    // still change, and a permanent one would be cached by browsers.)
    return [
      {
        source: "/privacy-policy",
        destination: "/apps/kisan-mitra/privacy-policy",
        permanent: false,
      },
      {
        source: "/delete-account",
        destination: "/apps/kisan-mitra/delete-account",
        permanent: false,
      },
      {
        source: "/delete-account/logistic",
        destination: "/apps/logistics/delete-account",
        permanent: false,
      },
      {
        source: "/delete-account/machinery",
        destination: "/apps/machinery/delete-account",
        permanent: false,
      },
      // The site's app id is "machinery-rental", but the Machinery Owner
      // policy lives at /apps/machinery/... (the URL given to the app).
      {
        source: "/apps/machinery-rental/privacy-policy",
        destination: "/apps/machinery/privacy-policy",
        permanent: false,
      },
      // Same for Man Power: the site's app id is "labor-provider", the legal
      // pages live at /apps/man-power/... (the URL given to the app).
      {
        source: "/apps/labor-provider/privacy-policy",
        destination: "/apps/man-power/privacy-policy",
        permanent: false,
      },
      {
        source: "/apps/labor-provider/delete-account",
        destination: "/apps/man-power/delete-account",
        permanent: false,
      },
      // Mini Mart: listed on the site as "SuperMart" (app id "supermart-pos").
      {
        source: "/apps/supermart-pos/privacy-policy",
        destination: "/apps/mini-mart/privacy-policy",
        permanent: false,
      },
      // Staff App: the site's app id is "staff-app", the policy lives at
      // /apps/staff/... (the URL given to the app).
      {
        source: "/apps/staff-app/privacy-policy",
        destination: "/apps/staff/privacy-policy",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
