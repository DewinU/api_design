import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm/relations'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  username: varchar('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export type Tag = InferSelectModel<typeof tags>
export type NewTag = InferInsertModel<typeof tags>

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id),
})

export type Product = InferSelectModel<typeof products>
export type NewProduct = InferInsertModel<typeof products>

export const updateStatuses = pgEnum('updateStatuses', [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'SHIPPED',
])

export const updates = pgTable('updates', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: updateStatuses('status').default('PENDING'),
  version: text('version'),
  media: text('media'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  productId: uuid('productId')
    .notNull()
    .references(() => products.id),
})

export type Update = InferSelectModel<typeof updates>
export type Newupdate = InferInsertModel<typeof updates>

export const changelogs = pgTable('changelogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  updateId: uuid('updateId')
    .notNull()
    .references(() => updates.id),
})

export type Changelog = InferSelectModel<typeof changelogs>
export type NewChangelog = InferInsertModel<typeof changelogs>

export const productTags = pgTable(
  'productTags',
  {
    productId: uuid('productId')
      .notNull()
      .references(() => products.id),
    tagId: uuid('tagId')
      .notNull()
      .references(() => tags.id),
  },
  t => ({
    pk: primaryKey({
      columns: [t.productId, t.tagId],
    }),
  }),
)

export type ProductTag = InferSelectModel<typeof productTags>
export type NewProductTag = InferInsertModel<typeof productTags>

export const userRelations = relations(users, ({ many }) => ({
  products: many(products),
}))

export const productRelations = relations(products, ({ many, one }) => ({
  users: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  updates: many(updates),
  productTags: many(productTags),
}))

export const productTagsRelation = relations(productTags, ({ one }) => ({
  products: one(products, {
    fields: [productTags.productId],
    references: [products.id],
  }),
  tags: one(tags, {
    fields: [productTags.tagId],
    references: [tags.id],
  }),
}))

export const updateRelations = relations(updates, ({ one, many }) => ({
  products: one(products, {
    fields: [updates.productId],
    references: [products.id],
  }),
  changelogs: many(changelogs),
}))

export const changelogRelations = relations(changelogs, ({ one }) => ({
  updates: one(updates, {
    fields: [changelogs.updateId],
    references: [updates.id],
  }),
}))
