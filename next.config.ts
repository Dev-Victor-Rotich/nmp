import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // ✅ This makes Vercel build ignore linting errors
        ignoreDuringBuilds: true,
    },
    typescript: {
        // (Optional) allow production builds to succeed even with type errors
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
