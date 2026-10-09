import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

function injectSdkUrl(sdkUrl: string): Plugin {
  return {
    name: "inject-sdk-url",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replace("%PASSTHROUGH_SDK_URL%", sdkUrl),
    },
  };
}

export default defineConfig(({ mode }) => {
  const { PASSTHROUGH_SDK_URL } = loadEnv(mode, import.meta.dirname, "");
  if (!PASSTHROUGH_SDK_URL) {
    throw new Error("PASSTHROUGH_SDK_URL must be set (see .env.example)");
  }

  return {
    root: path.resolve(import.meta.dirname, "frontend"),
    base: "/",
    publicDir: false,
    resolve: {
      alias: {
        components: path.resolve(import.meta.dirname, "frontend/components"),
        services: path.resolve(import.meta.dirname, "frontend/services"),
      },
    },
    plugins: [react(), injectSdkUrl(PASSTHROUGH_SDK_URL)],
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/backend/public"),
      // The SDK dist is mounted/symlinked at dist/backend/public/sdk
      emptyOutDir: false,
      sourcemap: true,
    },
  };
});
