'use client'
import { listRolesWithStaff } from "@/app/actions/roles";
import { DataTable } from "@/components/DataTable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Staff } from "@/db/schema";
import { RoleWithStaff } from "@/db/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";


export function RolesTable({ roles }: { roles: RoleWithStaff[] }) {
  const query = useQuery({
    queryKey: ['roles-table'],
    queryFn: async () => {
      return await listRolesWithStaff()
    },
    initialData: roles
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<RoleWithStaff>[] = [
    {
      accessorKey: "id",
      header: "ID"
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const id = row.getValue('id') as number
        const name = row.getValue('name') as string

        return (
          <Sheet>
            <SheetTrigger className="text-blue-500 hover:underline" >
              {name}
            </SheetTrigger>

            <SheetContent>
              Role
            </SheetContent>
          </Sheet>
        )
      }
    },
    {
      accessorKey: 'staff',
      header: 'Staff',
      cell: ({ row }) => {
        const staff = row.getValue('staff') as Staff[]
        return (
          <div>{staff?.length ?? 0}</div>
        )
      }
    }
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
  return <DataTable table={table} />
}
