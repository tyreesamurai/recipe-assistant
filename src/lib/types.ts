import { z } from "zod";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import {
  recipesTable,
  ingredientsTable,
  tagsTable,
  recipeIngredientsTable,
  recipeTagsTable,
  ingredientTagsTable,
} from "@/db/schema";

// Shared
export const nutritionSchema = z
  .object({
    calories: z.number().min(0).optional(),
    carbs: z.number().min(0).optional(),
    fats: z.number().min(0).optional(),
    protein: z.number().min(0).optional(),
  })
  .optional();

export const cookingTimeSchema = z
  .object({
    prep: z.number().min(0).optional(),
    cook: z.number().min(0).optional(),
    cool: z.number().min(0).optional(),
    additional: z.number().min(0).optional(),
    rest: z.number().min(0).optional(),
    total: z.number().min(0),
  })
  .optional();

export type Nutrition = z.infer<typeof nutritionSchema>;

export type CookingTime = z.infer<typeof cookingTimeSchema>;

// ===== SELECT schemas (DB → app)
export const recipeBase = createSelectSchema(recipesTable);
export const ingredientBase = createSelectSchema(ingredientsTable);
export const tagBase = createSelectSchema(tagsTable);

export const ingredientSchema = ingredientBase.extend({
  tags: z.array(tagBase).optional(),
  nutrition: nutritionSchema,
  quantity: z.number().min(0).optional(), // present only when joined via recipe_ingredients
  unit: z.string().max(50).optional(),
});

export const recipeSchema = recipeBase.extend({
  instructions: z.array(z.string().max(1000)),
  description: z.string().max(1000).optional(),
  ingredients: z.array(ingredientSchema).optional(),
  tags: z.array(tagBase).optional(),
  nutrition: nutritionSchema,
  cookingTime: cookingTimeSchema,
});

export type Recipe = z.infer<typeof recipeSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;

// ===== INSERT / UPDATE schemas (app → DB)
export const insertTagSchema = createInsertSchema(tagsTable)
  .omit({ id: true })
  .extend({ name: z.string().trim().min(1).max(100) });

export const insertIngredientSchema = createInsertSchema(ingredientsTable)
  .omit({ id: true })
  .extend({
    name: z.string().trim().min(1).max(255),
    description: z.string().max(1000).optional(),
    imageUrl: z.string().url().optional(),
    nutrition: nutritionSchema,
  });

export const insertRecipeSchema = createInsertSchema(recipesTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    name: z.string().trim().min(1).max(255),
    description: z.string().max(1000).optional(),
    // Form can send multi-line string → normalize to string[]
    instructions: z
      .union([
        z.array(z.string().min(1)),
        z.string().transform((s) =>
          s
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean),
        ),
      ])
      .default([]),
    servings: z.coerce.number().int().positive().optional(),
    imageUrl: z.string().url().optional(),
    inputUrl: z.string().url().optional(),
    nutrition: nutritionSchema,
    cookingTime: cookingTimeSchema,
  });

export const insertRecipeIngredientSchema = createInsertSchema(
  recipeIngredientsTable,
).extend({
  recipeId: z.coerce.number().int().positive(),
  ingredientId: z.coerce.number().int().positive(),
  // numeric comes back as string; accept both and coerce
  quantity: z.coerce.number().nonnegative().optional(),
  unit: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
});

export const insertRecipeTagSchema = createInsertSchema(recipeTagsTable).extend(
  {
    recipeId: z.coerce.number().int().positive(),
    tagId: z.coerce.number().int().positive(),
  },
);

export const insertIngredientTagSchema = createInsertSchema(
  ingredientTagsTable,
).extend({
  ingredientId: z.coerce.number().int().positive(),
  tagId: z.coerce.number().int().positive(),
});

// Bulk helpers
export const insertRecipeIngredientBulkSchema = z
  .array(insertRecipeIngredientSchema)
  .min(1);
export const insertRecipeTagBulkSchema = z.array(insertRecipeTagSchema).min(1);
export const insertIngredientTagBulkSchema = z
  .array(insertIngredientTagSchema)
  .min(1);
