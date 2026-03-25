import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

function blogMetadataPlugin() {
  const virtualId = "virtual:blog-metadata";
  const resolvedId = "\0" + virtualId;

  return {
    name: "blog-metadata",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id === resolvedId) {
        const blogDir = path.resolve("src/content/blog");
        if (!fs.existsSync(blogDir)) {
          return `export default {}`;
        }
        const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
        const metadata = {};
        for (const file of files) {
          const stats = fs.statSync(path.join(blogDir, file));
          metadata[`/src/content/blog/${file}`] = {
            birthtime: stats.birthtime.toISOString(),
          };
        }
        return `export default ${JSON.stringify(metadata)}`;
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [blogMetadataPlugin(), react(), tailwindcss()],
});
