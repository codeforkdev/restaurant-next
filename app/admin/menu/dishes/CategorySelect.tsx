'use client'
import { CreateCategoryDialog } from "@/components/MenuItemsTable/CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/db/schema";
import { useRouter, useSearchParams } from "next/navigation";

export function CategorySelect({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const handleSelectCategory = (value: string) => {
    console.log('category', value)
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    router.push("/admin/menu/dishes" + "?" + params.toString())
    router.refresh()
  }

  return <div className="w-full flex flex-col gap-2 md:max-w-[300px]">
    <Label>Category</Label>
    <Select onValueChange={handleSelectCategory} defaultValue="all">
      <SelectTrigger>
        <SelectValue placeholder="filter category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {categories.map(c =>
          <SelectItem key={c.id} value={c.id.toString()} className="flex-1">
            {c.name}
          </SelectItem>
        )}
        <SelectSeparator />
        <CreateCategoryDialog >
          <Button className="w-full">+ Category</Button>
        </CreateCategoryDialog >
      </SelectContent>
    </Select>
  </div>
}

