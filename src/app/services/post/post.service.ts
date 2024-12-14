import { PostContent, PostMeta } from './post.types.js'
import { FastifyBaseLogger } from 'fastify'
import { CacheInstance } from '@dancastillo/cache'
import { DatabaseService } from '../../db/db.service.js'
import { createError, DCError } from '@dancastillo/error'
import { createFailureResult, createSuccessfulResult, Result } from '@dancastillo/nothrow'
import { CACHE_KEY } from '../../../common/cache.js'
import { Nullable } from '../../../common/types.js'

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
}: ServiceDependencies): Promise<Result<PostMeta[], DCError>> {
  try {
    const cachedPosts = cache.get<PostMeta[]>(CACHE_KEY.POSTS)

    if (cachedPosts) {
      return createSuccessfulResult(cachedPosts)
    }

    const posts: PostMeta[] = await databaseService.posts.getAllMeta()

    cache.set(CACHE_KEY.POSTS, posts)

    return createSuccessfulResult(posts)
  } catch (error: unknown) {
    logger.error({ error }, `${LOG_PREFIX} :: getAllPosts :: An error occurred while getting all posts`)
    return createFailureResult([createError(500, 'Unknown error', 'An error occurred while getting all posts')])
  }
}

export async function getPostByExternalId(
  { logger, cache, databaseService }: ServiceDependencies,
  externalId: string
): Promise<Result<Nullable<PostContent>, DCError>> {
  try {
    const cachedPosts = cache.get<PostContent>(`${CACHE_KEY.POST_CONTENT}:${externalId}`)

    if (cachedPosts) {
      return createSuccessfulResult(cachedPosts)
    }

    const post: Nullable<PostContent> = await databaseService.posts.getContentById(externalId)

    if (!post) {
      cache.set(`${CACHE_KEY.POST_CONTENT}:${externalId}`, post)
    }

    return createSuccessfulResult(post)
  } catch (error: unknown) {
    logger.error(
      { error },
      `${LOG_PREFIX} :: getPostByExternalId :: An error occurred while getting a post content by ID`
    )
    return createFailureResult([
      createError(500, 'Unknown error', 'An error occurred while getting a post content by ID'),
    ])
  }
}
