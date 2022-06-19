import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/index.ts"],
  outDir: "build",
  clean: true,
});
