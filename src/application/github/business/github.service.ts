import { FastifyBaseLogger } from 'fastify'
import { createFailureResult, createSuccessfulResult, Result } from '../../../common/result.js'
import { requestGithubContributions } from '../data/github.data.service.js'
import { GithubContribution } from '../data/github.data.types.js'

const LOG_PREFIX = 'GithubService'

export async function getGithubContributions(logger: FastifyBaseLogger): Promise<Result<GithubContribution[]>> {
  try {
    const contributions: Result<GithubContribution[]> = await requestGithubContributions()

    if (!contributions.success) {
      return contributions
    }

    const sortedDescContributions = contributions.data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return createSuccessfulResult(sortedDescContributions)
  } catch (error: unknown) {
    logger.error({ error }, `${LOG_PREFIX} :: An error occurred while getting Github contributions`)
    return createFailureResult<GithubContribution[]>([
      { code: 500, title: 'Internal Server Error', detail: 'Error while getting Github contributions', meta: error },
    ])
  }
}
