"use client";
import { Recipe } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function RecipeCards({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();
  return (
    <>
      {recipes.map((recipe) => (
        <Card key={recipe.id}>
          <CardTitle>{recipe.name}</CardTitle>
          <CardHeader>Servings: {recipe.servings}</CardHeader>
          <CardDescription>{recipe.description}</CardDescription>
          <CardContent>
            <Image
              src={recipe.imageUrl!}
              alt={recipe.description!}
              width={100}
              height={100}
            />
          </CardContent>
          <Button
            onClick={() =>
              router.push(`/${recipe.name.trim().replaceAll(/ /g, "-")}`)
            }
          >
            Go To
          </Button>
        </Card>
      ))}
    </>
  );
}
