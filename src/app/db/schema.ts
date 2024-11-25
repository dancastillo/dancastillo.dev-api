import { randomUUID } from 'node:crypto'
import { sql, SQL } from 'drizzle-orm'
import { pgTable, varchar, text, uuid, index, timestamp } from 'drizzle-orm/pg-core'

export const postsTable = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    content: text().notNull(),
    created_at: timestamp({ mode: 'date' }).notNull().defaultNow(),
    updated_at: timestamp({ mode: 'date' })
      .notNull()
      .defaultNow()
      .$onUpdateFn((): SQL => sql`now()`),
    deleted_at: timestamp({ mode: 'date' }).default(sql`NULL`),
    external_id: varchar().default(`pos_${randomUUID()}`).notNull(),
  },
  (table) => {
    return {
      externalIdIdx: index('external_id_idx').on(table.external_id),
    }
  }
)
