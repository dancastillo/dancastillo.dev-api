import { PostContentModel, PostMetaModel, PostModel } from '../../db/posts/posts.types.js'
import { Post, PostContent, PostMeta } from './post.types.js'

export function mapPosts(posts: PostModel[]): Post[] {
  return posts.map((post: PostModel): Post => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      deletedAt: post.deleted_at,
      externalId: post.external_id,
    }
  })
}

export function mapPostsMeta(posts: PostMetaModel[]): PostMeta[] {
  return posts.map((post: PostMetaModel): PostMeta => {
    return {
      title: post.title,
      updatedAt: post.updated_at,
      externalId: post.external_id,
    }
  })
}

export function mapPostContent(post: PostContentModel): PostContent {
  return {
    title: post.title,
    content: post.content,
    updatedAt: post.updated_at,
    externalId: post.external_id,
  }
}
