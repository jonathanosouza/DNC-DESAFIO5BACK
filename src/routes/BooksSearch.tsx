import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { knex } from '../database'
import { z } from "zod";
import { error } from "console";

export  async function BooksSearchRoutes(app: FastifyInstance) {

    app.post('/livros', async (req, reply) => { 
        const createBookSchema = z.object({
            title : z.string(),
            pagenumber: z.number(),
            cod_isbn: z.number(),
            publishing_company : z.string()
        })

        const {title, pagenumber , cod_isbn, publishing_company} = createBookSchema.parse(req.body)

        await knex('books').insert({
            id: randomUUID(),
            title,
            pagenumber,
            cod_isbn,
            publishing_company
        })
        return reply.status(201).send('Livro Criado com Sucesso')
    })


    app.get('/livros' , async (req, reply) => {
        const books = await knex('books').select('*')
        return {books}
    })

    app.get('/livros/:id' , async (req, reply) => {
        const getBooksParamsSchema = z.object({
            id: z.string().uuid(),
          })
        const { id } = getBooksParamsSchema.parse(req.params)
        const books = await knex('books').select('*').where('id' , id).first()
        
        if(books){
            return {books}
        }else{
            reply.status(200).send({error:'Books not Found'})
        }
    })

    app.delete('/livros', async (req, reply) => {
        await  knex('books').del()
        return reply.status(201).send('Livro Excluído com Sucesso')  
    })

    app.delete('/livros/:id', async (req, reply) => {
        const deleteBooksParamsSchema = z.object({
            id: z.string().uuid(),
          })
        const { id } = deleteBooksParamsSchema.parse(req.params)

        await  knex('books').del().where('id', id)
          return reply.status(201).send('Livro Excluído com Sucesso')  
    })



    app.put('/livros/:id', async (req, reply) => {
        const createBookSchema = z.object({
          title: z.string(),
          pagenumber: z.number(),
          cod_isbn: z.number(),
          publishing_company: z.string()
        });
      
        const putBooksParamsSchema = z.object({
          id: z.string().uuid(),
        });
      
        try {
          const { id } = putBooksParamsSchema.parse(req.params);
          const { title, pagenumber, cod_isbn, publishing_company } = createBookSchema.parse(
            req.body
          );
     
          await knex('books')
            .update({
              id: id,
              title,
              pagenumber,
              cod_isbn,
              publishing_company
            })
            .where('id', id);
      
          return reply.status(200).send('Livro Atualizado com Sucesso');
        } catch (error) {
          return reply.status(400).send('Erro ao atualizar o livro');
        }
      });
}

