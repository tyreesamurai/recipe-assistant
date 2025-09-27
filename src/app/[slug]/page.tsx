import { db } from "@/db/index";
import { recipesTable as recipes } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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
      .from(recipes)
      .where(
        sql`lower(${recipes.name}) = lower(${slug.trim().replaceAll(/-/g, " ")})`,
      )
      .limit(1);
  } else {
    [recipe] = await db
      .select()
      .from(recipes)
      .where(eq(recipes.id, Number(slug)))
      .limit(1);
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      ID: {recipe.id}, Name: {recipe.name}, created at:{" "}
      {recipe.createdAt.toString()}
    </div>
  );
}
