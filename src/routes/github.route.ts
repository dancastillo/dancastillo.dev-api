import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getGithubContributions } from '../application/github/business/github.service.js'

const githubContributions = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    '/github-contributions',
    {
      schema: {
        response: {
          '2xx': {
            type: 'object',
            required: ['data', 'errors'],
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
              errors: {
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
      },
    },
    async function (_: FastifyRequest, reply: FastifyReply) {
      const logger = fastify.log
      const cache = fastify.cache
      const contributionsResult = await getGithubContributions(cache, logger)

      const { data, errors } = contributionsResult.mapTo(
        (data) => data ?? [],
        (errors) => errors.map((error) => ({ code: error.code, message: error.title }))
      )

      return reply.code(200).send({ data, errors })
    }
  )
}

export default githubContributions
