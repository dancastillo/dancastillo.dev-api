export type Post = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  externalId: string
}
