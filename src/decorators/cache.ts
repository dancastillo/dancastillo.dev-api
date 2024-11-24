import { FastifyInstance } from 'fastify'
import cache, { CacheInstance } from '@dancastillo/cache'

declare module 'fastify' {
  interface FastifyInstance {
    cache: CacheInstance
  }
}

export function addCacheDecorator(fastify: FastifyInstance) {
  const cacheInstance = cache({
    duration: {
      // Default cache duration is 7 days
      seconds: Number(process.env.CACHE_DURATION) ?? 604800,
    },
  })
  fastify.decorate('cache', cacheInstance)
}
