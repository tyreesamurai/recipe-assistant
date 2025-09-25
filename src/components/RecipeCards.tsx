import { Recipe } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RecipeCards({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="w-72">
          <CardTitle>{recipe.name}</CardTitle>
          <CardHeader>Servings: {recipe.servings}</CardHeader>
          <CardDescription>{recipe.description}</CardDescription>
          <CardContent>{recipe.imageUrl}</CardContent>
        </Card>
      ))}
    </div>
  );
}
