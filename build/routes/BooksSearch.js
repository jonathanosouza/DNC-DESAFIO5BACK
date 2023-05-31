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

// src/routes/BooksSearch.tsx
var BooksSearch_exports = {};
__export(BooksSearch_exports, {
  BooksSearchRoutes: () => BooksSearchRoutes
});
module.exports = __toCommonJS(BooksSearch_exports);
var import_crypto = require("crypto");

// src/database.ts
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

// src/routes/BooksSearch.tsx
var import_zod2 = require("zod");
async function BooksSearchRoutes(app) {
  app.post("/livros", async (req, reply) => {
    const createBookSchema = import_zod2.z.object({
      title: import_zod2.z.string(),
      pagenumber: import_zod2.z.number(),
      cod_isbn: import_zod2.z.number(),
      publishing_company: import_zod2.z.string()
    });
    const { title, pagenumber, cod_isbn, publishing_company } = createBookSchema.parse(req.body);
    await knex("books").insert({
      id: (0, import_crypto.randomUUID)(),
      title,
      pagenumber,
      cod_isbn,
      publishing_company
    });
    return reply.status(201).send("Livro Criado com Sucesso");
  });
  app.get("/livros", async (req, reply) => {
    const books = await knex("books").select("*");
    return { books };
  });
  app.get("/livros/:id", async (req, reply) => {
    const getBooksParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getBooksParamsSchema.parse(req.params);
    const books = await knex("books").select("*").where("id", id).first();
    if (books) {
      return { books };
    } else {
      reply.status(200).send({ error: "Books not Found" });
    }
  });
  app.delete("/livros", async (req, reply) => {
    await knex("books").del();
    return reply.status(201).send("Livro Exclu\xEDdo com Sucesso");
  });
  app.delete("/livros/:id", async (req, reply) => {
    const deleteBooksParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = deleteBooksParamsSchema.parse(req.params);
    await knex("books").del().where("id", id);
    return reply.status(201).send("Livro Exclu\xEDdo com Sucesso");
  });
  app.put("/livros/:id", async (req, reply) => {
    const createBookSchema = import_zod2.z.object({
      title: import_zod2.z.string(),
      pagenumber: import_zod2.z.number(),
      cod_isbn: import_zod2.z.number(),
      publishing_company: import_zod2.z.string()
    });
    const putBooksParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    try {
      const { id } = putBooksParamsSchema.parse(req.params);
      const { title, pagenumber, cod_isbn, publishing_company } = createBookSchema.parse(
        req.body
      );
      await knex("books").update({
        id,
        title,
        pagenumber,
        cod_isbn,
        publishing_company
      }).where("id", id);
      return reply.status(200).send("Livro Atualizado com Sucesso");
    } catch (error) {
      return reply.status(400).send("Erro ao atualizar o livro");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BooksSearchRoutes
});
