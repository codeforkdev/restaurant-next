'use client'
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { DataTable } from "../DataTable"
import { Button } from "../ui/button"
import { EditDishSheet } from "../EditDishSheet"
import { Dish } from "@/db/schema"
import { useState } from "react"

interface DataTableProps {
  data: Dish[]
  categories: { id: number, name: string }[]
}




export default function DishesTable({ data, categories }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Dish>[] = [
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
          <EditDishSheet dishId={id} name={name} categories={categories}>
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


  return (
    <DataTable table={table} />
  )
}

