import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { DatabaseService, getDbService } from '../../app/db/db.service.js'
import * as schema from '../../app/db/schema.js'

declare module 'fastify' {
  export interface FastifyInstance {
    databaseService: DatabaseService
  }
}

export const autoConfig = (fastify: FastifyInstance) => {
  return {
    client: 'drizzle',
    connection: {
      databaseUrl: fastify.config.DATABASE_URL,
    },
    pool: { min: 2, max: 10 },
  }
}

export default fp(
  async (fastify: FastifyInstance, _opts): Promise<void> => {
    const databaseUrl = fastify.config.DATABASE_URL
    const pool = new pg.Pool({
      connectionString: databaseUrl,
    })
    const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema: schema })

    fastify.decorate('databaseService', getDbService(db))

    fastify.addHook('onClose', async (_instance): Promise<void> => {
      await pool.end()
    })
  },
  { name: 'drizzle' }
)
