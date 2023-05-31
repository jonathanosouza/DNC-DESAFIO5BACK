import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'pg',
  connection: env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],

  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
 useNullAsDefault   : true
}

export const knex = setupKnex(config)
