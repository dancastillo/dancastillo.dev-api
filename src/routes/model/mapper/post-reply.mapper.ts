import { PostContent, PostMeta } from '../../../app/services/post/post.types.js'
import { PostContentReply, PostMetaReply } from '../types/posts.js'

export function mapPostMetaReply(post: PostMeta): PostMetaReply {
  return {
    id: post.externalId,
    title: post.title,
    updatedAt: post.updatedAt,
  }
}

export function mapPostContentByIdReply(post: PostContent): PostContentReply {
  return {
    id: post.externalId,
    title: post.title,
    content: post.content,
    updatedAt: post.updatedAt,
  }
}
