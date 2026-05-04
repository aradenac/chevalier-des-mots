import { defineConfig } from "vitest/config";
import baseConfig from "./vitest.config.js";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["tests/*.test.js", "tests/unit/**/*.test.js"],
    exclude: ["tests/integration/**/*.test.js"]
  }
});
