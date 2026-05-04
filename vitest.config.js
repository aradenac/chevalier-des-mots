import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.js"],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "build/coverage",
      thresholds: {
        lines: 40,
        functions: 40,
        branches: 30,
        statements: 40
      }
    }
  }
});
