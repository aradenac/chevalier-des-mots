// [utest->req~tech.core-adapters-separation~1]
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function listFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      return listFiles(path);
    }
    return [path];
  });
}

describe("core separation", () => {
  it("n'utilise pas d'API navigateur directe dans src/core", () => {
    const forbidden = /\b(document|window|navigator|localStorage|AudioContext|speechSynthesis)\b/;
    const files = listFiles("src/core").filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const content = readFileSync(file, "utf8");
      expect(content, file).not.toMatch(forbidden);
    }
  });
});
