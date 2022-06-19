import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["app/index.ts"],
  outDir: "build",
  clean: true,
});
