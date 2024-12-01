import { Type } from '@sinclair/typebox'
import { ErrorSchema } from './errors.js'

//---------------------------------------------------------------------
// Get All Posts - Meta
//---------------------------------------------------------------------

export const PostMetaSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  updatedAt: Type.String({ format: 'date-time' }),
})

export const PostMetaResultSchema = Type.Object({
  data: Type.Array(PostMetaSchema),
  errors: Type.Array(ErrorSchema),
})

//---------------------------------------------------------------------
// Get Post Content By ID - Meta
//---------------------------------------------------------------------
export type RequestParamsPostContentById = { Params: { id: string } }

export const PostContentSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  content: Type.String(),
  updatedAt: Type.String({ format: 'date-time' }),
})

export const PostContentResultSchema = Type.Object({
  data: PostContentSchema,
  errors: Type.Array(ErrorSchema),
})
