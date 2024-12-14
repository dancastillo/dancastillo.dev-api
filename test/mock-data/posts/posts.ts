import { PostMetaModel } from '../../../src/app/db/posts/posts.types.js'
import { createRandomDate, createRandomSentence, createRandomUuid } from '../random.js'

export function createPostMetaMock(): PostMetaModel {
  return {
    title: createRandomSentence(),
    external_id: createRandomUuid(),
    updated_at: createRandomDate(),
  }
}
