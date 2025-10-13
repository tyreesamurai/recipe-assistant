import {
  integer,
  pgTable,
  varchar,
  text,
  primaryKey,
  doublePrecision,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { Nutrition, CookingTime } from "@/lib/types";
import { relations } from "drizzle-orm";

export const recipesTable = pgTable("recipes", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
  instructions: text().array(),
  cookingTime: jsonb("cooking_times").$type<CookingTime | null>(),
  nutrition: jsonb().$type<Nutrition | null>(),
  servings: integer(),
  imageUrl: text("image_url"),
  inputUrl: text("input_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ingredientsTable = pgTable("ingredients", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  nutrition: jsonb().$type<Nutrition | null>(),
  imageUrl: text("image_url"),
});

export const recipeIngredientsTable = pgTable(
  "recipe_ingredients",
  {
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => ingredientsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    quantity: doublePrecision(),
    unit: varchar({ length: 50 }),
    notes: text(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.ingredientId] }),
  }),
);

export const tagsTable = pgTable("tags", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 100 }).notNull().unique(),
});

export const recipeTagsTable = pgTable(
  "recipe_tags",
  {
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tagsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.tagId] }),
  }),
);

export const ingredientTagsTable = pgTable(
  "ingredient_tags",
  {
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => ingredientsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tagsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.ingredientId, table.tagId] }),
  }),
);

export const recipesRelations = relations(recipesTable, ({ many }) => ({
  ingredients: many(recipeIngredientsTable),
  tags: many(recipeTagsTable),
}));

export const ingredientsRelations = relations(ingredientsTable, ({ many }) => ({
  recipes: many(recipeIngredientsTable),
  tags: many(ingredientTagsTable),
}));
