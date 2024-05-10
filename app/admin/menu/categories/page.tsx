import { db } from "@/db"
import { CategoriesTable } from "./CategoriesTable"
import { asc } from "drizzle-orm"
import { menuCategories } from "@/db/schema"




export default async function Page() {
  const categories = await db.query.menuCategories.findMany({
    orderBy: asc(menuCategories.id)
  })
  return (
    <CategoriesTable data={categories} />
  )
}



