import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function CreateRecipe() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Create Recipe</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h2>Create from URL</h2>
            <Input />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
