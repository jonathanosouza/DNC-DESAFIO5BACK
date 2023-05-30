import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 await knex.schema.createTable('books', (table) => {
    table.uuid('id').primary(),
    table.text('title').notNullable(),
    table.decimal ('pagenumber').notNullable(),
    table.decimal('cod_isbn').notNullable(),
    table.text('publishing_company').notNullable()
    table.time('created_at').defaultTo(knex.fn.now()).notNullable()
 })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('books')
}

