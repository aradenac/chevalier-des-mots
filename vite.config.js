import { defineConfig } from "vite";
import { resolve } from "node:path";
import { createAccountApiMiddleware } from "./src/server/accountApi.js";
import { createJsonAccountDatabase } from "./src/server/accountDatabase.js";

const accountDatabase = createJsonAccountDatabase({
  filePath: resolve("server-data/accounts.json")
});

function accountsApiPlugin() {
  return {
    name: "accounts-api",
    configureServer(server) {
      server.middlewares.use(createAccountApiMiddleware({ database: accountDatabase }));
    },
    configurePreviewServer(server) {
      server.middlewares.use(createAccountApiMiddleware({ database: accountDatabase }));
    }
  };
}

export default defineConfig({
  plugins: [accountsApiPlugin()]
});
