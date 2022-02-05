import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import syncDir from "./syncDir.mjs";

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const isMinify = mode == "production";

esbuild
  .build({
    entryPoints: ["pages/index.js"],
    outdir: "dist",
    bundle: true,
    sourcemap: false,
    plugins: [cssModulesPlugin()],
    minify: isMinify,
    loader: {
      ".png": "dataurl",
      ".jpg": "dataurl",
      ".jpeg": "dataurl",
      ".webp": "dataurl",
      ".svg": "text",
    },
  })
  .catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["pages/index.css"],
  outdir: "dist",
  minify: isMinify,
});

syncDir("public", "dist");
