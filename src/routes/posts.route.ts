import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Post } from '../app/services/post/post.types.js'
import { getAllPosts } from '../app/services/post/post.service.js'
import { DCError } from '@dancastillo/error'
import { Result } from '@dancastillo/nothrow'
import { mapPostReply } from './model/mapper/post-reply.mapper.js'
import { mapErrorsReply } from './model/mapper/errors-reply.mapper.js'

const posts = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/posts', async function (_: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Pull out service dependencies
    const logger = fastify.log
    const cache = fastify.cache
    const databaseService = fastify.databaseService

    const posts: Result<Post[], DCError> = await getAllPosts({ logger, databaseService, cache })

    const { data, errors } = posts.mapTo(
      (data) => (data && data.length ? data.map((post) => mapPostReply(post)) : []),
      (errors) => mapErrorsReply(errors)
    )

    return reply.code(200).send({ data: data, errors: errors })
  })
}

export default posts
