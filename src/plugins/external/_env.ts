import env from '@fastify/env'
import { join } from 'path'

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number
      RATE_LIMIT_MAX: number
      DATABASE_URL: string
      GITHUB_API_URL: string
      GITHUB_API_TOKEN: string
      GITHUB_USERNAME: string
      CACHE_DURATION: number
    }
  }
}

const schema = {
  type: 'object',
  required: ['DATABASE_URL', 'GITHUB_API_URL', 'GITHUB_API_TOKEN', 'GITHUB_USERNAME', 'CACHE_DURATION'],
  properties: {
    RATE_LIMIT_MAX: {
      type: 'number',
      // Put it to 4 in your .env.test file for tests
      default: 100,
    },
    DATABASE_URL: {
      type: 'string',
    },
    GITHUB_API_TOKEN: {
      type: 'string',
    },
    GITHUB_API_URL: {
      type: 'string',
    },
    GITHUB_USERNAME: {
      type: 'string',
    },
    CACHE_DURATION: {
      type: 'number',
      default: 60,
    },
  },
}

export type Envs = {
  PORT: number
  RATE_LIMIT_MAX: number
  DATABASE_URL: string
  GITHUB_API_URL: string
  GITHUB_API_TOKEN: string
  GITHUB_USERNAME: string
  [key: string]: unknown
}

const testRun = process.env.NODE_ENV === 'test'
const envPath = testRun ? join(process.cwd(), '.env.test') : join(process.cwd(), '.env')

export const autoConfig = {
  // Decorate Fastify instance with `config` key
  // Optional, default: 'config'
  confKey: 'config',
  // Schema to validate
  schema,
  dotenv: {
    path: envPath,
  },
  data: process.env,
  // data: process.env as unknown as AutoConfigDate,
}

/**
 * This plugins helps to check environment variables.
 *
 * @see {@link https://github.com/fastify/fastify-env}
 */
export default env
