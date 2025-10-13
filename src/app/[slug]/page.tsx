import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import { CreateRecipeButton } from "@/components/buttons/CreateRecipeButton";
import { db } from "@/db/index";
import {
	ingredientsTable,
	recipeIngredientsTable,
	recipesTable,
} from "@/db/schema";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let recipe;

	if (isNaN(Number(slug))) {
		[recipe] = await db
			.select()
			.from(recipesTable)
			.where(
				sql`lower(${recipesTable.name}) = lower(${slug.trim().replaceAll(/-/g, " ")})`,
			)
			.limit(1);
	} else {
		[recipe] = await db
			.select()
			.from(recipesTable)
			.where(eq(recipesTable.id, Number(slug)))
			.limit(1);
	}

	if (!recipe) {
		return <div>Recipe not found</div>;
	}

	const ingredients = await db
		.select({
			name: ingredientsTable.name,
			quantity: recipeIngredientsTable.quantity,
			unit: recipeIngredientsTable.unit,
		})
		.from(recipeIngredientsTable)
		.leftJoin(
			ingredientsTable,
			eq(ingredientsTable.id, recipeIngredientsTable.ingredientId),
		)
		.where(eq(recipeIngredientsTable.recipeId, recipe.id));

	return (
		<div className="">
			<Image
				src={recipe.imageUrl!}
				alt={recipe.description!}
				width={200}
				height={200}
			/>
			<h1>
				Recipe {recipe.id}: {recipe.name}
			</h1>
			<h3>{recipe.description}</h3>
			<h3>{recipe.instructions}</h3>
			<div>
				{recipe.nutrition?.calories} calories
				{recipe.nutrition?.carbs} carbs
				{recipe.nutrition?.fats} fats
				{recipe.nutrition?.protein} protein
			</div>
			<div>
				{recipe.cookingTime?.prep} min prep
				{recipe.cookingTime?.cook} min cook
				{recipe.cookingTime?.total} min total
			</div>
			<h3>Servings: {recipe.servings}</h3>
			<h3>{recipe.createdAt.toTimeString()}</h3>
			<h3>{recipe.updatedAt.toTimeString()}</h3>

			<h1>
				ingredients:{" "}
				{ingredients.map(
					(ingredient) =>
						`${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}\n`,
				)}
			</h1>
			<CreateRecipeButton
				recipe={{
					...recipe,
					ingredients: ingredients!.map((i) => ({
						name: i.name ?? "",
						quantity: i.quantity ?? 0,
						unit: i.unit ?? "",
					})),
				}}
			/>
		</div>
	);
}
