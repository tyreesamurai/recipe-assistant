"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertRecipeSchema } from "@/lib/types";

const formSchema = insertRecipeSchema.extend({
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(0).optional(),
        unit: z.string().max(50).optional(),
      }),
    )
    .min(1, "At least one ingredient is required"),
});

export function CreateRecipeForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: [""],
      nutrition: {
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
      },
      cookingTime: {
        prep: 0,
        cook: 0,
        total: 0,
      },
      ingredients: [{ name: "", quantity: 0, unit: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  } as never);

  const handleAddIngredient = () => {
    appendIngredient({ name: "", quantity: 0, unit: "" });
  };

  const handleRemoveIngredient = (index: number) => {
    removeIngredient(index);
  };

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control: form.control,
    name: "instructions",
  } as never);

  const handleAddInstruction = () => {
    appendInstruction("");
  };

  const handleRemoveInstruction = (index: number) => {
    removeInstruction(index);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success(JSON.stringify(data, null, 2));
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Instructions Field Array */}
          <div>
            {instructionFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`instructions.${index}` as const}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instruction {index + 1}</FormLabel>
                    <FormControl>
                      <Textarea {...field} /> {/* ← use the provided field */}
                    </FormControl>
                    <FormMessage />
                    {index === instructionFields.length - 1 && (
                      <div className="mt-2 flex gap-2">
                        <Button type="button" onClick={handleAddInstruction}>
                          Plus
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemoveInstruction(index)}
                          disabled={instructionFields.length === 1}
                        >
                          Minus
                        </Button>
                      </div>
                    )}
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Nutrition */}
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="nutrition.calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutrition.carbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carbs</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutrition.protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protein</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nutrition.fats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fats</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Cooking Times */}
          <div className="flex justify-between w-full">
            <FormField
              control={form.control}
              name="cookingTime.total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cookingTime.prep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prep Time</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cookingTime.cook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cook Time</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Ingredients Field Array */}
          <div className="flex-col items-end">
            {ingredientFields.map((field, index) => (
              <div className="flex justify-between " key={field.id}>
                <FormField
                  name={`ingredients.${index}.name` as const}
                  render={() => (
                    <FormItem>
                      <FormLabel>Ingredient {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Name"
                          {...form.register(
                            `ingredients.${index}.name` as const,
                            { required: true },
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`ingredients.${index}.quantity` as const}
                  render={() => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...(form.register(
                            `ingredients.${index}.quantity` as const,
                          ),
                          { required: false })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name={`ingredients.${index}.unit` as const}
                  render={() => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Unit"
                          {...(form.register(
                            `ingredients.${index}.unit` as const,
                          ),
                          { required: false })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {index == ingredientFields.length - 1 && (
                  <div>
                    <Button type="button" onClick={() => handleAddIngredient()}>
                      Plus
                    </Button>
                    <Button
                      onClick={() => handleRemoveIngredient(index)}
                      disabled={ingredientFields.length === 1}
                      type="button"
                    >
                      Minus
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
