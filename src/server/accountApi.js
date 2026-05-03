// [impl->req~account.server-database-storage~1]
// [impl->req~stats.server-database-persistence~1]
export function createAccountApiMiddleware({ database }) {
  return async function accountApiMiddleware(req, res, next) {
    if (!req.url?.startsWith("/api/accounts")) {
      next();
      return;
    }

    try {
      if (req.method === "GET") {
        const accounts = await database.readAccounts();
        sendJson(res, 200, { accounts });
        return;
      }

      if (req.method === "PUT") {
        const body = await readJsonBody(req);
        const accounts = Array.isArray(body.accounts) ? body.accounts : [];
        const savedAccounts = await database.writeAccounts(accounts);
        sendJson(res, 200, { accounts: savedAccounts });
        return;
      }

      sendJson(res, 405, { error: "method-not-allowed" });
    } catch {
      sendJson(res, 500, { error: "account-storage-failed" });
    }
  };
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}
