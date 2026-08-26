import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Every page here is prerendered at build time and there is no ISR, so no
 * incremental cache override (R2/KV) is needed — the defaults are enough.
 */
export default defineCloudflareConfig();
