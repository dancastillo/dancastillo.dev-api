import { Nullable } from '../../../common/types.js'

export type PostModel = {
  id: string
  content: string
  created_at: Date
  updated_at: Date
  deleted_at: Nullable<Date>
  external_id: string
}
