import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { getAllPosts, getPostContentById } from './posts/post.data.service.js'
import { PostContent, PostMeta } from '../services/post/post.types.js'
import * as schema from '../db/schema.js'
import { Nullable } from '../../common/types.js'

export type DatabaseService = {
  posts: {
    getAllMeta: () => Promise<PostMeta[]>
    getContentById: (id: string) => Promise<Nullable<PostContent>>
  }
}

export function getDbService(db: NodePgDatabase<typeof schema>): DatabaseService {
  return {
    posts: {
      getAllMeta: async () => await getAllPosts(db),
      getContentById: async (externalId: string) => await getPostContentById(db, externalId),
    },
  }
}
