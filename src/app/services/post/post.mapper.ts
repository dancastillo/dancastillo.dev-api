import { PostModel } from '../../db/posts/posts.types.js'
import { Post } from './post.types.js'

export function mapPosts(posts: PostModel[]): Post[] {
  return posts.map((post: PostModel): Post => {
    return {
      id: post.id,
      content: post.content,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      deletedAt: post.deleted_at,
      externalId: post.external_id,
    }
  })
}
