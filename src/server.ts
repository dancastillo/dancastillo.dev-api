import Fastify from 'fastify'
import fp from 'fastify-plugin'

import closeWithGrace from 'close-with-grace'

import serviceApp from './app.js'

function getLoggerOptions() {
  // Only if the program is running in an interactive terminal
  if (process.stdout.isTTY) {
    return {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    }
  }

  return { level: process.env.LOG_LEVEL ?? 'silent' }
}
const app = Fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all',
    },
  },
})

await app.register(fp(serviceApp))

closeWithGrace({ delay: 500 }, async ({ err }): Promise<void> => {
  if (err != null) {
    app.log.error(err)
  }

  await app.close()
})

await app.ready()

try {
  await app.listen({ host: process.env.HOST, port: process.env.PORT })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

export { app }
