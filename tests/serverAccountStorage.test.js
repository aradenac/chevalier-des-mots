// [utest->req~account.server-database-storage~1]
// [utest->req~stats.server-database-persistence~1]
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { createServerAccountStorage } from "../src/adapters/serverAccountStorage.js";
import { createAccountApiMiddleware } from "../src/server/accountApi.js";
import { createJsonAccountDatabase } from "../src/server/accountDatabase.js";

describe("server account storage", () => {
  it("persiste les comptes dans une base JSON côté serveur", async () => {
    const dir = await mkdtemp(join(tmpdir(), "words-accounts-"));
    const filePath = join(dir, "accounts.json");
    const database = createJsonAccountDatabase({ filePath });

    try {
      await database.writeAccounts([{
        id: "a",
        name: "Alice",
        highestCompletedLevel: 2,
        levelScores: {
          "2": { levelNumber: 2, bestScore: 5, successfulHits: 5, errors: 0 }
        }
      }]);

      expect(await database.readAccounts()).toEqual([
        {
          id: "a",
          name: "Alice",
          highestCompletedLevel: 2,
          levelScores: {
            "2": { levelNumber: 2, bestScore: 5, successfulHits: 5, errors: 0 }
          }
        }
      ]);
      expect(JSON.parse(await readFile(filePath, "utf8")).accounts).toHaveLength(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("encapsule l'accès HTTP au stockage serveur", async () => {
    const calls = [];
    const storage = createServerAccountStorage({
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return {
          ok: true,
          async json() {
            return { accounts: [{ id: "a", name: "Alice", highestCompletedLevel: 1 }] };
          }
        };
      }
    });

    expect(await storage.loadAccounts()).toEqual([
      { id: "a", name: "Alice", highestCompletedLevel: 1 }
    ]);
    expect(await storage.saveAccounts([{ id: "b", name: "Bob", highestCompletedLevel: 0 }])).toEqual([
      { id: "a", name: "Alice", highestCompletedLevel: 1 }
    ]);
    expect(calls.map(call => call.options.method)).toEqual(["GET", "PUT"]);
    expect(calls[1].options.body).toContain("Bob");
  });

  it("expose une API serveur sans authentification ni mot de passe", async () => {
    const database = {
      async readAccounts() {
        return [{ id: "a", name: "Alice", highestCompletedLevel: 0 }];
      },
      async writeAccounts(accounts) {
        return accounts;
      }
    };
    const middleware = createAccountApiMiddleware({ database });
    const response = createResponse();

    await middleware({ url: "/api/accounts", method: "GET" }, response, () => {});

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      accounts: [{ id: "a", name: "Alice", highestCompletedLevel: 0 }]
    });
  });

  it("écrit puis relit les comptes par l'API serveur", async () => {
    let storedAccounts = [];
    const database = {
      async readAccounts() {
        return storedAccounts;
      },
      async writeAccounts(accounts) {
        storedAccounts = accounts;
        return storedAccounts;
      }
    };
    const middleware = createAccountApiMiddleware({ database });
    const writeResponse = createResponse();
    const readResponse = createResponse();

    await middleware(createRequest("PUT", {
      accounts: [{ id: "b", name: "Bob", highestCompletedLevel: 5 }]
    }), writeResponse, () => {});
    await middleware(createRequest("GET"), readResponse, () => {});

    expect(writeResponse.statusCode).toBe(200);
    expect(JSON.parse(readResponse.body)).toEqual({
      accounts: [{ id: "b", name: "Bob", highestCompletedLevel: 5 }]
    });
  });

  it("retourne une erreur 405 pour une méthode non autorisée", async () => {
    const middleware = createAccountApiMiddleware({
      database: {
        async readAccounts() {
          return [];
        },
        async writeAccounts(accounts) {
          return accounts;
        }
      }
    });
    const response = createResponse();

    await middleware(createRequest("POST"), response, () => {});

    expect(response.statusCode).toBe(405);
    expect(JSON.parse(response.body)).toEqual({ error: "method-not-allowed" });
  });

  it("retourne une erreur 500 si le JSON envoyé est invalide", async () => {
    const middleware = createAccountApiMiddleware({
      database: {
        async readAccounts() {
          return [];
        },
        async writeAccounts(accounts) {
          return accounts;
        }
      }
    });
    const request = createRawRequest("PUT", "{invalid-json");
    const response = createResponse();

    await middleware(request, response, () => {});

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: "account-storage-failed" });
  });

  it("laisse passer les routes non liées aux comptes", async () => {
    const middleware = createAccountApiMiddleware({
      database: {
        async readAccounts() {
          return [];
        },
        async writeAccounts(accounts) {
          return accounts;
        }
      }
    });
    const response = createResponse();
    let nextCalled = false;

    await middleware({ url: "/api/other", method: "GET" }, response, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(true);
    expect(response.statusCode).toBe(0);
  });

  it("retourne une liste vide si la base JSON n'existe pas encore", async () => {
    const dir = await mkdtemp(join(tmpdir(), "words-accounts-"));
    const filePath = join(dir, "missing", "accounts.json");
    const database = createJsonAccountDatabase({ filePath });

    try {
      await expect(database.readAccounts()).resolves.toEqual([]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("propage une erreur si la base JSON contient un JSON invalide", async () => {
    const dir = await mkdtemp(join(tmpdir(), "words-accounts-"));
    const filePath = join(dir, "accounts.json");
    const database = createJsonAccountDatabase({ filePath });

    try {
      await import("node:fs/promises").then(({ writeFile }) => writeFile(filePath, "{invalid", "utf8"));
      await expect(database.readAccounts()).rejects.toThrow();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

function createRequest(method, payload) {
  const request = Readable.from(payload ? [JSON.stringify(payload)] : []);
  request.url = "/api/accounts";
  request.method = method;
  return request;
}

function createRawRequest(method, rawPayload) {
  const request = Readable.from(rawPayload ? [rawPayload] : []);
  request.url = "/api/accounts";
  request.method = method;
  return request;
}

function createResponse() {
  return {
    statusCode: 0,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(body) {
      this.body = body;
    }
  };
}
