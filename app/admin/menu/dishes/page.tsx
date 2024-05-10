import MenuItemsTable from "@/components/MenuItemsTable"
import { db } from "@/db";
import { asc, sql } from "drizzle-orm";
import { menuItems } from "@/db/schema";
import * as z from 'zod'

const searchParamsSchema = z.object({
  category: z.coerce.number(),
  search: z.string(),
}).partial()


export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const parsedSearchParams = searchParamsSchema.safeParse(searchParams)
  const whereSql = sql` TRUE `

  if (parsedSearchParams.success) {
    console.log('parsed data', parsedSearchParams.data)
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
  } else {

      console.log('parse errors:', parsedSearchParams.error)
  }

  const categories = await db.query.menuCategories.findMany()
  const items = await db.query.menuItems.findMany({
    orderBy: [asc(menuItems.id)],
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
    <div className="max-w-7xl mx-auto w-full p-4">
      <MenuItemsTable data={items} categories={categories} search={parsedSearchParams.data?.search ?? ""} />
    </div>
  );
}
