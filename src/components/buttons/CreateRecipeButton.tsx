"use client";
import type { z } from "zod";
import {
	CreateRecipeForm,
	type recipeFormSchema,
} from "@/components/forms/CreateRecipeForm";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from "@/lib/types";

export function CreateRecipeButton({
	recipe,
}: {
	recipe: z.infer<typeof recipeFormSchema>;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Edit Recipe</Button>
			</DialogTrigger>

			{/* Use flex column + fixed overall height; prevent outer scrollbars */}
			<DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
				<div className="flex h-[85vh] flex-col">
					{" "}
					{/* <-- key: real height */}
					<div className="border-b px-6 py-4">
						<DialogTitle>Edit Recipe</DialogTitle>
					</div>
					{/* This becomes the only scrolling region */}
					<ScrollArea className="flex-1 min-h-0">
						{" "}
						{/* <-- key: min-h-0 */}
						<div className="px-6 py-6">
							{/* IMPORTANT: remove vertical centering from your form wrapper */}
							<CreateRecipeForm recipe={recipe} />
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
}
