"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/database.ts
var database_exports = {};
__export(database_exports, {
  config: () => config,
  knex: () => knex
});
module.exports = __toCommonJS(database_exports);
var import_knex = require("knex");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "teste", "production"]).default("production"),
  PG_CONNECTION_STRING: import_zod.z.string(),
  PORT: import_zod.z.number().default(3e3)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment Variables", _env.error.format());
  throw new Error("Invalid environment Variables");
}
var env = _env.data;

// src/database.ts
var config = {
  client: "pg",
  connection: env.PG_CONNECTION_STRING,
  searchPath: ["knex", "public"],
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  },
  useNullAsDefault: true
};
var knex = (0, import_knex.knex)(config);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  knex
});
