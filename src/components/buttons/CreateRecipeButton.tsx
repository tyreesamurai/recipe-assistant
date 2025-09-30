"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  CreateRecipeForm,
  recipeFormSchema,
} from "@/components/forms/CreateRecipeForm";
import { Recipe } from "@/lib/types";

export function CreateRecipeButton({
  recipe,
}: {
  recipe: z.infer<typeof recipeFormSchema>;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Recipe</Button>
        </DialogTrigger>
        <DialogContent>
          <CreateRecipeForm recipe={recipe} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
