import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first, WebP as the fallback — both a fraction of the JPEG's weight.
    // On Workers these are produced by the IMAGES binding in wrangler.jsonc,
    // not by Next's own sharp pipeline, which cannot run there.
    formats: ["image/avif", "image/webp"],
    // The widths Next renders into the srcset. 384 already comes from the
    // default imageSizes, so listing it here would only duplicate the entry.
    deviceSizes: [640, 828, 1080, 1280, 1920, 2048],
  },
};

// Makes the Cloudflare bindings reachable from `next dev`, so local development
// behaves like the deployed worker.
initOpenNextCloudflareForDev();

export default nextConfig;
