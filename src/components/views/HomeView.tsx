import { RecipeCards } from "@/components/RecipeCards";
import { db } from "@/db/index";
import { recipesTable } from "@/db/schema";
import { Recipe } from "@/lib/types";

export async function HomeView() {
  const recipes = await db.select().from(recipesTable);

  return (
    <div>
      <div></div>

      <div>
        <RecipeCards recipes={recipes as Recipe[]} />
      </div>
    </div>
  );
}
