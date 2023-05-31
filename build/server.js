"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/routes/BooksSearch.tsx
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
async function BooksSearchRoutes(app2) {
  app2.post("/livros", async (req, reply) => {
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
  app2.get("/livros", async (req, reply) => {
    const books = await knex("books").select("*");
    return { books };
  });
  app2.get("/livros/:id", async (req, reply) => {
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
  app2.delete("/livros", async (req, reply) => {
    await knex("books").del();
    return reply.status(201).send("Livro Exclu\xEDdo com Sucesso");
  });
  app2.delete("/livros/:id", async (req, reply) => {
    const deleteBooksParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = deleteBooksParamsSchema.parse(req.params);
    await knex("books").del().where("id", id);
    return reply.status(201).send("Livro Exclu\xEDdo com Sucesso");
  });
  app2.put("/livros/:id", async (req, reply) => {
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

// src/app.ts
var import_fastify_cors = __toESM(require("fastify-cors"));
var app = (0, import_fastify.default)();
app.register(BooksSearchRoutes);
app.get("/", async (req, reply) => {
  return "Rota Get Accesada com Sucesso";
});
app.register(import_fastify_cors.default, {
  origin: true
  // Habilita todas as origens (pode ajustar conforme necessário)
});

// src/server.ts
app.listen({
  port: env.PORT
}).then(() => {
  console.log("HTTP SERVER Running");
});
