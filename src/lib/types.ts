import { z } from "zod";
import {
  recipesTable,
  ingredientsTable,
  recipeIngredientsTable,
  tagsTable,
  recipeTagsTable,
  ingredientTagsTable,
} from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

const recipeBase = createSelectSchema(recipesTable);

const ingredientBase = createSelectSchema(ingredientsTable);

const tagBase = createSelectSchema(tagsTable);

const nutritionSchema = z
  .object({
    calories: z.number().min(0).optional(),
    carbs: z.number().min(0).optional(),
    fats: z.number().min(0).optional(),
    protein: z.number().min(0).optional(),
  })
  .optional();

export const ingredientSchema = ingredientBase.extend({
  tags: z.array(tagBase).optional(),
  nutrition: nutritionSchema,
  quantity: z.number().min(0).optional(),
  unit: z.string().max(50).optional(),
});

const tagsSchema = createSelectSchema(tagsTable);

export const recipeSchema = recipeBase.extend({
  description: z.string().max(1000).optional(),
  ingredients: z.array(ingredientSchema).optional(),
  tags: z.array(tagsSchema).optional(),
  nutrition: nutritionSchema,
  cookingTime: z
    .object({
      prep: z.number().min(0).optional(),
      cook: z.number().min(0).optional(),
      total: z.number().min(0).optional(),
    })
    .optional(),
});

export type Recipe = z.infer<typeof recipeSchema>;

export type Ingredient = z.infer<typeof ingredientSchema>;
