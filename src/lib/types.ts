import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {
	ingredientsTable,
	ingredientTagsTable,
	recipeIngredientsTable,
	recipesTable,
	recipeTagsTable,
	tagsTable,
} from "@/db/schema";

// Shared
export const nutritionSchema = z
	.object({
		calories: z.coerce.number().min(0).optional(),
		carbs: z.coerce.number().min(0).optional(),
		fats: z.coerce.number().min(0).optional(),
		protein: z.coerce.number().min(0).optional(),
	})
	.optional();

export const cookingTimeSchema = z
	.object({
		prep: z.coerce.number().min(0).optional(),
		cook: z.coerce.number().min(0).optional(),
		cool: z.coerce.number().min(0).optional(),
		additional: z.coerce.number().min(0).optional(),
		rest: z.coerce.number().min(0).optional(),
		total: z.coerce.number().min(0),
	})
	.optional();

export type Nutrition = {
	calories?: number;
	carbs?: number;
	protein?: number;
	fats?: number;
};

export type CookingTime = {
	prep?: number;
	cook?: number;
	cool?: number;
	additional?: number;
	rest?: number;
	total: number;
};

// ===== SELECT schemas (DB → app)
export const recipeBase = createSelectSchema(recipesTable);
export const ingredientBase = createSelectSchema(ingredientsTable);
export const tagBase = createSelectSchema(tagsTable);

export const ingredientSchema = ingredientBase.extend({
	tags: z.array(tagBase).optional(),
	nutrition: nutritionSchema,
	quantity: z.coerce.number().min(0).optional(), // present only when joined via recipe_ingredients
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

export const insertIngredientSchema = createInsertSchema(ingredientsTable).omit(
	{ id: true },
);

export const insertRecipeSchema = createInsertSchema(recipesTable).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
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
