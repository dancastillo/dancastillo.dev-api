// Name _env to run this first in autoload
import env from '@fastify/env'

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number
      RATE_LIMIT_MAX: number
      DATABASE_URL: string
    }
  }
}

const schema = {
  type: 'object',
  required: ['DATABASE_URL'],
  properties: {
    RATE_LIMIT_MAX: {
      type: 'number',
      // Put it to 4 in your .env file for tests
      default: 100,
    },
    DATABASE_URL: {
      type: 'string',
    },
  },
}

export const autoConfig = {
  // Decorate Fastify instance with `config` key
  // Optional, default: 'config'
  confKey: 'config',
  // Schema to validate
  schema,
  // Needed to read .env in root folder
  dotenv: true,
  data: process.env,
}

/**
 * This plugins helps to check environment variables.
 *
 * @see {@link https://github.com/fastify/fastify-env}
 */
export default env
