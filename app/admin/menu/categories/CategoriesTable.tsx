'use client'
import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { ChangeEvent, useState } from "react"
import { EditCategorySheet } from "./EditCategorySheet"
import { useQuery } from "@tanstack/react-query"
import { listCategories } from "@/app/actions"

interface DataTableProps {
  data: { id: number, name: string }[]
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

  const columns: ColumnDef<{ id: number, name: string }>[] = [
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
