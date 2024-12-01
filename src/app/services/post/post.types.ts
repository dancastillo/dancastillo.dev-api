export type Post = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  externalId: string
}

export type PostMeta = {
  title: string
  updatedAt: Date
  externalId: string
}

export type PostContent = {
  title: string
  content: string
  updatedAt: Date
  externalId: string
}
