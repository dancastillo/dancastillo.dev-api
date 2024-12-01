import path from 'node:path'
import fastifyAutoload from '@fastify/autoload'
import fastifyPrintRoutes from 'fastify-print-routes'
import { FastifyError, FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import { addCacheDecorator } from './decorators/cache.js'

export default async function serviceApp(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  await fastify.register(fastifyPrintRoutes)

  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins/external'),
    forceESM: true,
    options: { ...opts },
  })

  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins/custom'),
    forceESM: true,
    options: { ...opts },
  })

  // Load all routes as last autoload
  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'routes'),
    autoHooks: true,
    cascadeHooks: true,
    ignorePattern: /model/,
    options: { ...opts },
  })

  // Add decorators
  addCacheDecorator(fastify)

  fastify.setErrorHandler((err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    request.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      'Unhandled error occurred'
    )

    reply.code(err.statusCode ?? 500)

    let message = 'Internal Server Error'
    if (err.statusCode === 401) {
      message = err.message
    }

    return { message }
  })

  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit({
        max: 3,
        timeWindow: 500,
      }),
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        'Resource not found'
      )

      reply.code(404)

      return { message: 'Not Found' }
    }
  )
}
