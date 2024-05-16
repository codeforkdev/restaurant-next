import { db } from "@/db";
import { dishes } from "@/db/schema";
import { asc, sql } from "drizzle-orm";
import * as z from 'zod'
import { SearchInput } from "./SearchInput";
import { CategorySelect } from "./CategorySelect";
import { Button } from "@/components/ui/button";
import DishesTable from "@/components/MenuItemsTable";
import CreateDishDialog from "@/components/CreateDishDialog";

const searchParamsSchema = z.object({
  category: z.coerce.number(),
  search: z.string(),
}).partial()


export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const parsedSearchParams = searchParamsSchema.safeParse(searchParams)
  const whereSql = sql` TRUE `

  if (parsedSearchParams.success) {
    Object.entries(parsedSearchParams.data).forEach(([key, val]) => {
      switch (key) {
        case "category":
          whereSql.append(sql` AND category_id = ${val} `)
          break
        case "search":
          whereSql.append(sql` AND LOWER(name) LIKE '%' || LOWER(${val}) || '%' `)
        default:
          break
      }
    })
  }
  const categories = await db.query.menuCategories.findMany()
  const items = await db.query.dishes.findMany({
    orderBy: [asc(dishes.id)],
    with: {
      category: {
        columns: {
          id: true,
          name: true
        }
      }
    },
    where: whereSql
  })

  return (
    <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-4">
      <div className=" flex flex-col md:flex-row md:items-end gap-4">
        <SearchInput defaultSearch={parsedSearchParams.data?.search ?? ""} />
        <CategorySelect categories={categories} />
        <CreateDishDialog categories={categories}>
          <Button className="w-full md:w-fit">+ Dish</Button>
        </CreateDishDialog>
      </div>
      <DishesTable data={items} categories={categories} />
    </div>
  );
}
