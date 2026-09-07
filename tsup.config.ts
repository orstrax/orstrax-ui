import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx", "src/runtime.ts", "src/styles.css"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  minify: false,
  treeshake: true,
  // No loader needed - using external URL
});
