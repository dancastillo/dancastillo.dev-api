import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { PostContent, PostMeta } from '../../services/post/post.types.js'
import { PostContentModel, PostMetaModel } from './posts.types.js'
import { postsTable } from '../schema.js'
import { mapPostContent, mapPostsMeta } from '../../services/post/post.mapper.js'
import * as schema from '../schema.js'
import { Nullable } from '../../../common/types.js'

export async function getAllPosts(db: NodePgDatabase<typeof schema>): Promise<PostMeta[]> {
  const dbPosts: PostMetaModel[] = await db
    .select({
      external_id: postsTable.external_id,
      title: postsTable.title,
      updated_at: postsTable.updated_at,
    })
    .from(postsTable)

  const posts = mapPostsMeta(dbPosts)
  return posts
}

export async function getPostContentById(
  db: NodePgDatabase<typeof schema>,
  externalId: string
): Promise<Nullable<PostContent>> {
  const dbPost: PostContentModel | undefined = await db.query.postsTable.findFirst({
    columns: {
      external_id: true,
      title: true,
      content: true,
      updated_at: true,
    },
    where: (posts, { and, eq, isNull }) => and(eq(posts.external_id, externalId), isNull(posts.deleted_at)),
  })

  if (!dbPost) {
    return null
  }

  const posts = mapPostContent(dbPost)
  return posts
}
