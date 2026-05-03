// [impl->req~account.server-database-storage~1]
export function createServerAccountStorage({ baseUrl = "", fetchImpl = fetch } = {}) {
  const endpoint = baseUrl + "/api/accounts";

  async function request(method, body) {
    const response = await fetchImpl(endpoint, {
      method,
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) throw new Error("account-storage-request-failed");
    return response.json();
  }

  return {
    async loadAccounts() {
      const payload = await request("GET");
      return Array.isArray(payload.accounts) ? payload.accounts : [];
    },
    async saveAccounts(accounts) {
      const payload = await request("PUT", { accounts });
      return Array.isArray(payload.accounts) ? payload.accounts : [];
    }
  };
}
