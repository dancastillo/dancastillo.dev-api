import { Post } from './post.types.js'
import { FastifyBaseLogger } from 'fastify'
import { CacheInstance } from '@dancastillo/cache'
import { DatabaseService } from '../../db/db.service.js'
import { createError, DCError } from '@dancastillo/error'
import { createFailureResult, createSuccessfulResult, Result } from '@dancastillo/nothrow'
import { CACHE_KEY } from '../../../common/cache.js'

type ServiceDependencies = {
  databaseService: DatabaseService
  cache: CacheInstance
  logger: FastifyBaseLogger
}

const LOG_PREFIX = 'PostService'

export async function getAllPosts({
  logger,
  cache,
  databaseService,
}: ServiceDependencies): Promise<Result<Post[], DCError>> {
  try {
    const cachedPosts = cache.get<Post[]>(CACHE_KEY.POSTS)

    if (cachedPosts) {
      return createSuccessfulResult(cachedPosts)
    }

    const posts: Post[] = await databaseService.posts.getAll()

    cache.set(CACHE_KEY.POSTS, posts)

    return createSuccessfulResult(posts)
  } catch (error: unknown) {
    logger.error({ error }, `${LOG_PREFIX} :: getAllPosts :: An error occurred while getting all posts`)
    return createFailureResult([createError(500, 'Unknown error', 'An error occurred while getting all posts')])
  }
}
