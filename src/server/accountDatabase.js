import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

// [impl->req~account.server-database-storage~1]
// [impl->req~stats.server-database-persistence~1]
export function createJsonAccountDatabase({ filePath }) {
  async function readAccounts() {
    try {
      const content = await readFile(filePath, "utf8");
      const payload = JSON.parse(content);
      return Array.isArray(payload.accounts) ? payload.accounts : [];
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  async function writeAccounts(accounts) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify({ accounts }, null, 2) + "\n", "utf8");
    return accounts;
  }

  return {
    readAccounts,
    writeAccounts
  };
}
