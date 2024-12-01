import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PostContent, PostMeta } from '../../../app/services/post/post.types.js'
import { getAllPosts, getPostByExternalId } from '../../../app/services/post/post.service.js'
import { DCError } from '@dancastillo/error'
import { Result } from '@dancastillo/nothrow'
import { mapPostContentByIdReply, mapPostMetaReply } from '../../model/mapper/post-reply.mapper.js'
import { mapErrorsReply } from '../../model/mapper/errors-reply.mapper.js'
import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'
import { PostContentResultSchema, PostMetaResultSchema, RequestParamsPostContentById } from '../../../schema/posts.js'
import { Nullable } from '../../../common/types.js'

const posts: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: PostMetaResultSchema,
        },
        tags: ['Posts'],
      },
    },
    async function (_: FastifyRequest, reply: FastifyReply): Promise<void> {
      // Pull out service dependencies
      const logger = fastify.log
      const cache = fastify.cache
      const databaseService = fastify.databaseService
      const posts: Result<PostMeta[], DCError> = await getAllPosts({ logger, databaseService, cache })

      const { data, errors } = posts.mapTo(
        (data) => (data && data.length ? data.map((post) => mapPostMetaReply(post)) : []),
        (errors) => mapErrorsReply(errors)
      )

      return reply.code(200).send({ data: data, errors: errors })
    }
  )

  fastify.get(
    '/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String(),
        }),
        response: {
          200: PostContentResultSchema,
        },
        tags: ['Posts'],
      },
    },
    async function (request: FastifyRequest<RequestParamsPostContentById>, reply: FastifyReply): Promise<void> {
      // Pull out service dependencies
      const logger = fastify.log
      const cache = fastify.cache
      const databaseService = fastify.databaseService
      const externalId = request.params.id

      const post: Result<Nullable<PostContent>, DCError> = await getPostByExternalId(
        {
          logger,
          databaseService,
          cache,
        },
        externalId
      )

      console.log('post', post)
      const { data, errors } = post.mapTo(
        (data) => (data ? mapPostContentByIdReply(data) : null),
        (errors) => mapErrorsReply(errors)
      )

      console.log('data', data)
      return reply.code(200).send({ data: data, errors: errors })
    }
  )
}

export default posts
