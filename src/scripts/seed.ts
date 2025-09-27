import { db } from "@/db/index";
import * as schema from "@/db/schema";
import { insertRecipeSchema } from "@/lib/types";
import { sql } from "drizzle-orm";

async function upsertTagByName(name: string) {
  const [existing] = await db
    .select()
    .from(schema.tagsTable)
    .where(sql`lower(${schema.tagsTable.name}) = lower(${name})`)
    .limit(1);

  if (existing) return existing;

  const [created] = await db
    .insert(schema.tagsTable)
    .values({ name })
    .returning();
  return created;
}

async function upsertIngredientByName(data: {
  name: string;
  description?: string;
  imageUrl?: string;
  nutrition?: unknown;
}) {
  const [existing] = await db
    .select()
    .from(schema.ingredientsTable)
    .where(sql`lower(${schema.ingredientsTable.name}) = lower(${data.name})`)
    .limit(1);

  if (existing) return existing;

  const [created] = await db
    .insert(schema.ingredientsTable)
    .values(data)
    .returning();
  return created;
}

const TAGS = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "High-Protein",
  "Weeknight",
  "Dairy-Free",
  "Quick",
  "Healthy",
];

const INGREDIENTS: Array<{ name: string; description?: string }> = [
  { name: "Olive Oil", description: "Extra virgin olive oil." },
  { name: "Chicken Breast", description: "Boneless, skinless chicken breast." },
  { name: "Salt", description: "Fine sea salt." },
  { name: "Black Pepper", description: "Freshly ground black pepper." },
  { name: "Garlic", description: "Fresh garlic cloves." },
  { name: "Onion", description: "Yellow or white onion." },
  { name: "Tomato", description: "Fresh ripe tomatoes." },
  { name: "Basil", description: "Fresh basil leaves." },
  { name: "Oregano", description: "Dried oregano." },
  { name: "Parmesan Cheese", description: "Grated Parmesan cheese." },
  { name: "Spaghetti" },
  { name: "Ground Beef", description: "Lean ground beef." },
  { name: "Bell Pepper", description: "Red or green bell pepper." },
  { name: "Garlic" },
  { name: "Soy Sauce", description: "Low-sodium soy sauce." },
  { name: "Red Pepper Flakes", description: "Crushed red pepper flakes." },
  { name: "Avocado", description: "Ripe avocado." },
  { name: "Lime", description: "Fresh lime" },
  { name: "Cilantro", description: "Fresh cilantro leaves." },
  { name: "Flour Tortilla", description: "Flour tortillas." },
  { name: "Eggs", description: "Large eggs." },
  { name: "Sourdough Bread", description: "Sourdough bread slices." },
];

const RECIPES: Array<{
  recipe: Parameters<(typeof insertRecipeSchema)["parse"]>[0];
  ingredients: Array<{
    name: string;
    quantity?: string | number;
    unit?: string;
    notes?: string;
  }>;
  tags: string[];
}> = [
  {
    recipe: {
      name: "Spaghetti Aglio e Olio",
      description: "Classic 20-minute pasta with garlic, chili, and olive oil.",
      instructions: [
        "Boil spaghetti in salted water until al dente.",
        "Gently sizzle sliced garlic in olive oil; add red pepper flakes.",
        "Toss pasta with oil; add pasta water to emulsify.",
        "Season with salt; finish with more oil if needed.",
      ],
      cookingTime: { prep: 5, cook: 15, total: 20 },
      nutrition: { calories: 650, carbs: 75, fats: 28, protein: 16 },
      servings: 2,
      imageUrl: "https://example.com/images/aglio-olio.jpg",
      inputUrl: "https://example.com/recipes/aglio-olio",
    },
    ingredients: [
      { name: "Spaghetti", quantity: "200", unit: "g" },
      { name: "Olive Oil", quantity: "3", unit: "tbsp" },
      { name: "Garlic", quantity: "4", unit: "clove", notes: "thinly sliced" },
      { name: "Red Pepper Flakes", quantity: "0.5", unit: "tsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
    ],
    tags: ["Quick", "Vegetarian", "Weeknight"],
  },
  {
    recipe: {
      name: "Chicken Fajitas",
      description:
        "Skillet-seared chicken with peppers and onions; party-friendly.",
      instructions: [
        "Slice chicken and veggies.",
        "Toss chicken with oil, salt, pepper, and lime juice.",
        "Sear chicken, then sauté peppers and onions.",
        "Warm tortillas and serve with toppings.",
      ],
      cookingTime: { prep: 10, cook: 20, total: 30 },
      nutrition: { calories: 520, carbs: 48, fats: 14, protein: 42 },
      servings: 4,
      imageUrl: "https://example.com/images/chicken-fajitas.jpg",
      inputUrl: "https://example.com/recipes/chicken-fajitas",
    },
    ingredients: [
      { name: "Chicken Breast", quantity: "500", unit: "g", notes: "sliced" }, // you seeded Chicken Breast earlier
      { name: "Olive Oil", quantity: "1", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Black Pepper", quantity: "0.5", unit: "tsp" },
      { name: "Bell Pepper", quantity: "2", unit: "piece", notes: "sliced" },
      { name: "Onion", quantity: "1", unit: "piece", notes: "sliced" },
      { name: "Lime", quantity: "1", unit: "piece", notes: "juiced" },
      { name: "Flour Tortillas", quantity: "6", unit: "piece" },
    ],
    tags: ["High-Protein", "Weeknight"],
  },
  {
    recipe: {
      name: "Avocado Toast with Egg",
      description:
        "Creamy avocado, soft egg, and crunchy toast—perfect breakfast.",
      instructions: [
        "Toast bread.",
        "Mash avocado with salt and pepper.",
        "Cook eggs to preference.",
        "Assemble toast and drizzle with olive oil.",
      ],
      cookingTime: { prep: 5, cook: 10, total: 15 },
      nutrition: { calories: 420, carbs: 32, fats: 24, protein: 16 },
      servings: 2,
      imageUrl: "https://example.com/images/avocado-toast.jpg",
      inputUrl: "https://example.com/recipes/avocado-toast-egg",
    },
    ingredients: [
      { name: "Sourdough Bread", quantity: "2", unit: "slice" },
      { name: "Avocado", quantity: "1", unit: "piece" },
      { name: "Eggs", quantity: "2", unit: "piece" },
      { name: "Olive Oil", quantity: "1", unit: "tsp" },
      { name: "Salt", quantity: "0.25", unit: "tsp" },
      { name: "Black Pepper", quantity: "0.25", unit: "tsp" },
    ],
    tags: ["Breakfast", "Quick", "Vegetarian"],
  },
];

async function seed() {
  await db.transaction(async (tx) => {
    console.log("Seeding database...");

    // 1) Tags
    const tagMap = new Map<string, { id: number }>();
    for (const t of TAGS) {
      const tag = await upsertTagByName(t);
      tagMap.set(t, tag);
    }

    // 2) Ingredients
    const ingMap = new Map<string, { id: number }>();
    for (const ing of INGREDIENTS) {
      const row = await upsertIngredientByName(ing);
      ingMap.set(ing.name, row);
    }

    // 3) Recipes + joins
    for (const entry of RECIPES) {
      const recipeInput = insertRecipeSchema.parse(entry.recipe);
      const [recipe] = await tx
        .insert(schema.recipesTable)
        .values(recipeInput)
        .returning();

      // recipe ingredients
      const riRows = entry.ingredients.map((i) => ({
        recipeId: recipe.id,
        ingredientId:
          ingMap.get(i.name)?.id ??
          (async () => {
            const created = await upsertIngredientByName({ name: i.name });
            ingMap.set(i.name, created);
            return created.id;
          })(),
        quantity: i.quantity ? Number(i.quantity) : null,
        unit: i.unit,
        notes: i.notes,
      }));

      const resolvedRiRows = await Promise.all(
        riRows.map(async (r) => ({
          ...r,
          ingredientId:
            typeof r.ingredientId === "number"
              ? r.ingredientId
              : await r.ingredientId,
        })),
      );

      await tx
        .insert(schema.recipeIngredientsTable)
        .values(resolvedRiRows)
        .onConflictDoNothing();

      // recipe_tags
      const tagRows = entry.tags
        .map((name) => tagMap.get(name))
        .filter((t): t is { id: number } => !!t)
        .map((t) => ({ recipeId: recipe.id, tagId: t.id }));

      if (tagRows.length) {
        await tx
          .insert(schema.recipeTagsTable)
          .values(tagRows)
          .onConflictDoNothing();
      }
    }
  });
  console.log("Seeding completed.");
}

seed();
