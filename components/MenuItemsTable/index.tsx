'use client'
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { ChangeEvent, useState } from "react"
import { MenuItem } from "@/types/menu-item"
import { Input } from "../ui/input"
import CreateMenuItemForm from "../CreateMenuItemForm"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { DataTable } from "../DataTable"
import { CreateCategoryDialog } from "./CreateCategoryDialog"
import { Button } from "../ui/button"
import { EditDishSheet } from "../EditMenuItemSheet"
import { useRouter, useSearchParams } from "next/navigation"

interface DataTableProps<TData, TValue> {
  data: MenuItem[]
  categories: { id: number, name: string }[]
  search: string
}




export default function MenuItemsTable<TValue>({ data, categories, search }: DataTableProps<MenuItem, TValue>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [searchVal, setSearchVal] = useState(search)

  const columns: ColumnDef<MenuItem>[] = [
    {
      accessorKey: "id",
      header: "ID"
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const id = row.getValue("id") as number
        const name = row.getValue("name") as string
        return (
          <EditDishSheet dishId={id} name={name} categories={categories} >
            <Button variant="link" className="text-blue-500">{name}</Button>
          </EditDishSheet>
        )
      }
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue('category') as any
        console.log(category)
        return (
          <div>{category?.name}</div>
        )

      }
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
        return <div>{formatted}</div>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
    },

  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    
    state: {
      columnFilters
    }
  })

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

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.currentTarget.value)
    const value = event.currentTarget.value?.trim()
    const params = new URLSearchParams(searchParams.toString())

    if (!value) {
      params.delete("search")
    } else {
      params.set("search", value)
    }
    router.push("/admin/menu/dishes" + "?" + params.toString())
    router.refresh()
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 py-4 items-end">
        <div className="flex-1 flex flex-col gap-2 w-full">
          <Label>Filter</Label>
          <Input
            className="w-full"
            placeholder="Filter by name..."
            value={searchVal}
            onChange={handleFilter}
          />

        </div>

        <div className="w-full flex flex-col gap-2 md:max-w-[300px]">
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
        <CreateMenuItemForm categories={categories}>
          <Button className="w-full md:w-fit">+ Dish</Button>
        </CreateMenuItemForm>
      </div>
      <DataTable table={table} />
    </div>
  )
}

