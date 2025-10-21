import { RecipeCards } from "@/components/RecipeCards";
import { db } from "@/db/index";
import { recipesTable } from "@/db/schema";
import type { Recipe } from "@/lib/types";

export async function HomeView() {
	const recipes = await db.select().from(recipesTable);

	return (
		<div>
			<div></div>

			<div className="container flex">
				<RecipeCards recipes={recipes as Recipe[]} />
			</div>
		</div>
	);
}
