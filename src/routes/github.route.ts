import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getGithubContributions } from '../application/github/business/github.service.js'
import { GithubContributionResponse } from './types/github.js'
import { ErrorResponse } from './types/error.js'
import { mapResult } from '../common/result.js'
import { GithubContribution } from '../application/github/data/github.data.types.js'

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
      const contributions = await getGithubContributions(logger)

      const { data, errors } = mapResult<GithubContribution[], GithubContributionResponse[], ErrorResponse>(
        contributions,
        (data) => data ?? [],
        (errors) => errors.map((error) => ({ code: error.code, message: error.title }))
      )

      return reply.code(200).send({ data, errors })
    }
  )
}

export default githubContributions
