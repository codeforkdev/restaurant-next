'use client'
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { EditMenuItemForm } from "../EditMenuItemForm"
import { MenuItem } from "@/types/menu-item"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)
      const id = row.getValue("id") as number
      const name = row.getValue("name") as string
      return (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="link" className="text-blue-500">{name}</Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-2xl flex flex-col ">
            <SheetHeader>
              <SheetTitle>Edit Menu Item</SheetTitle>
            </SheetHeader>
            <div className="flex-1">
            </div>
          </SheetContent>
        </Sheet>
      )
    }
  },
  {
    accessorKey: "category",
    header: "Category",
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
