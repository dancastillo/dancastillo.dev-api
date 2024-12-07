import { Type } from '@sinclair/typebox'
import { ErrorSchema } from './errors.js'

//---------------------------------------------------------------------
// Get All Posts - Meta
//---------------------------------------------------------------------

export const PostMetaOutputDtoSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  updatedAt: Type.String({ format: 'date-time' }),
})

export const GetAllPostsOutputDtoSchema = Type.Object({
  data: Type.Array(PostMetaOutputDtoSchema),
  errors: Type.Array(ErrorSchema),
})

//---------------------------------------------------------------------
// Get Post Content By ID - Meta
//---------------------------------------------------------------------
export type RequestParamsPostContentById = { Params: { id: string } }

export const PostContentOutputDtoSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  content: Type.String(),
  updatedAt: Type.String({ format: 'date-time' }),
})

export const GetPostContentByIdOutputDtoSchema = Type.Object({
  data: PostContentOutputDtoSchema,
  // errors: Type.Array(ErrorSchema),
})
