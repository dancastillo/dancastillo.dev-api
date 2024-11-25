import { Post } from '../../../app/services/post/post.types.js'
import { PostReply } from '../types/posts.js'

export function mapPostReply(post: Post): PostReply {
  return {
    externalId: post.externalId,
    content: post.content,
    updatedAt: post.updatedAt,
  }
}
