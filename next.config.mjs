/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable client-side router cache so pages never serve stale segments
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },

  // Disable HTTP caching in development
  headers: async () => {
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
