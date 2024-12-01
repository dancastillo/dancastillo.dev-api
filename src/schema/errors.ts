import { Type } from '@sinclair/typebox'

export const ErrorSchema = Type.Object({
  message: Type.String(),
  code: Type.Number(),
})
