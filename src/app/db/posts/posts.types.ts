import { Nullable } from '../../../common/types.js'

export type PostModel = {
  id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
  deleted_at: Nullable<Date>
  external_id: string
}

export type PostMetaModel = {
  title: string
  updated_at: Date
  external_id: string
}

export type PostContentModel = {
  title: string
  content: string
  updated_at: Date
  external_id: string
}
