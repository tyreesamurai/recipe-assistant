import {
  pgTable,
  integer,
  varchar,
  text,
  json,
  primaryKey,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core'

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  instructions: text('instructions'),
  description: text('description'),
  cookingTime: json('cooking_time'),
  nutrition: json('nutrition'),
  sourceUrl: varchar('source_url', { length: 255 }),
  imageUrl: varchar('image_url', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  nutrition: json('nutrition'),
  imageUrl: varchar('image_url', { length: 255 }),
})

export const recipeIngredients = pgTable(
  'recipe_ingredients',
  {
    recipeId: integer('recipe_id').notNull(),
    ingredientId: integer('ingredient_id').notNull(),
    quantity: varchar('quantity', { length: 255 }),
    unit: varchar('unit', { length: 50 }),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.ingredientId] })],
)

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const recipeTags = pgTable(
  'recipe_tags',
  {
    recipeId: integer('recipe_id').notNull(),
    tagId: integer('tag_id').notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.tagId] })],
)
