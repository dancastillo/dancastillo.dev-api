import { FastifyInstance } from 'fastify'

export const shemaConfig = (fastify: FastifyInstance) => {
  fastify.addSchema({
    $id: 'githubContributionResponse',
    response: {
      '2xx': {
        type: 'object',
        required: ['data', 'error'],
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                createdAt: { type: 'string' },
                url: { type: 'string' },
                type: { type: 'string' },
                title: { type: 'string' },
                repositoryName: { type: 'string' },
                repositoryUrl: { type: 'string' },
              },
            },
          },
          error: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
}

/**
 * This defines the schemas for the routes
 *
 * @see {@link https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validation-and-serialization}
 */
export default shemaConfig
