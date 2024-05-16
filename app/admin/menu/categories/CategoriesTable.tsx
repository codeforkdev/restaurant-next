'use client'
import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import { EditCategorySheet } from "./EditCategorySheet"
import { useQuery } from "@tanstack/react-query"
import { listCategories } from "@/app/actions"
import { Dish } from '@/db/schema'

interface DataTableProps {
  data: { id: number, name: string, dishes: Dish[] }[]
}



export function CategoriesTable({ data }: DataTableProps) {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await listCategories()
    },
    initialData: data
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<{ id: number, name: string, dishes: Dish[] }>[] = [
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
          <EditCategorySheet id={id}>
            <Button variant="link" className="text-blue-500">{name}</Button>
          </EditCategorySheet>
        )
      }
    },
    {
      accessorKey: "dishes",
      header: "Dishes",
      cell: ({ row }) => {
        const dishes = row.getValue("dishes") as Dish[]
        return (
          <div>{dishes.length}</div>
        )
      }
    },

  ]

  const table = useReactTable({
    data: query.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })



  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <DataTable table={table} />
    </div>
  )
}
