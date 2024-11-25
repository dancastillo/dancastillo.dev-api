import { FastifyBaseLogger } from 'fastify'
import { requestGithubContributions } from '../data/github.data.service.js'
import { GithubContribution } from '../data/github.data.types.js'
import { CacheInstance } from '@dancastillo/cache'
import { CACHE_KEY } from '../../../common/cache.js'
import { createFailureResult, Result, createSuccessfulResult } from '@dancastillo/nothrow'
import { createError, type DCError } from '@dancastillo/error'
import { Envs } from '../../../plugins/external/_env.js'

type ServiceDependencies = {
  cache: CacheInstance
  logger: FastifyBaseLogger
  envs: Envs
}

const LOG_PREFIX = 'GithubService'

export async function getGithubContributions({
  cache,
  logger,
  envs,
}: ServiceDependencies): Promise<Result<GithubContribution[], DCError>> {
  try {
    const cachedContributions = cache.get<GithubContribution[]>(CACHE_KEY.GITHUB_CONTRIBUTIONS)

    if (cachedContributions) {
      return createSuccessfulResult(cachedContributions)
    }

    const contributions: GithubContribution[] = await requestGithubContributions(envs)

    if (!contributions || contributions.length === 0) {
      return createSuccessfulResult([])
    }

    const sortedDescContributions = contributions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    // Set cache for github contributions
    cache.set(CACHE_KEY.GITHUB_CONTRIBUTIONS, sortedDescContributions)

    return createSuccessfulResult(sortedDescContributions)
  } catch (error: unknown) {
    logger.error({ error }, `${LOG_PREFIX} :: An error occurred while getting Github contributions`)
    return createFailureResult([
      createError(500, 'Unknown error', 'An error occurred while getting Github contributions'),
    ])
  }
}
