import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'teste', 'production'])
    .default('production'),
  PG_CONNECTION_STRING: z.string(),
  PORT: z.number().default(3000),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment Variablees', _env.error.format())

  throw new Error('Invalid environment Variables')
}

export const env = _env.data
