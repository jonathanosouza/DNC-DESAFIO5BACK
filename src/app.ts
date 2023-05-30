import fastify from 'fastify';
import { env } from './env';
import cookie from '@fastify/cookie';
import { BooksSearchRoutes } from './routes/BooksSearch';
import fastifyCors from 'fastify-cors';

export const app = fastify();

// app.register(cookie);
app.register(BooksSearchRoutes, { prefix: 'livros' });

// Registre o plugin fastify-cors
app.register(fastifyCors, {
  origin: true, // Habilita todas as origens (pode ajustar conforme necessário)
});
