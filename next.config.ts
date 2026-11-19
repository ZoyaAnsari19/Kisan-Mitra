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
    ];
  },
};

export default nextConfig;
