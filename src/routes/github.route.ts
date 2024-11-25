import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getGithubContributions } from '../application/github/business/github.service.js'
import { Envs } from '../plugins/external/_env.js'
import { mapErrorsReply } from './model/mapper/errors-reply.mapper.js'
import { mapGithubContributionReply } from './model/mapper/github-reply.mapper.js'

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

    async function (_: FastifyRequest, reply: FastifyReply): Promise<void> {
      // Pull out service dependencies
      const envs = fastify.getEnvs<Envs>()
      const logger = fastify.log
      const cache = fastify.cache

      // Get Github contributions
      const contributionsResult = await getGithubContributions({ cache, logger, envs })

      const { data, errors } = contributionsResult.mapTo(
        (data) => (data && data.length ? data.map((contribution) => mapGithubContributionReply(contribution)) : []),
        (errors) => mapErrorsReply(errors)
      )

      return reply.code(200).send({ data, errors })
    }
  )
}

export default githubContributions
