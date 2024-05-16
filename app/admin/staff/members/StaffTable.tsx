'use client'
import { DataTable } from "@/components/DataTable";
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Role } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { EditStaffForm } from "./EditStaffForm";
import { listStaff } from '@/app/actions/staff'

interface DataTableProps {
  data: { id: number, name: string, role: { id: number, name: string } | null, dob: Date }[]
  roles: Role[]
}

export function StaffTable({ data, roles }: DataTableProps) {
  const query = useQuery({
    queryKey: ['staff-table'],
    queryFn: async () => {
      return (await listStaff()).map(i => ({ ...i, name: `${i.firstName} ${i.lastName}` }))
    },
    initialData: data
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<{ id: number, name: string, role: { id: number, name: string } | null, dob: Date }>[] = [
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
              <SheetHeader>
                <SheetTitle>Edit Staff</SheetTitle>
              </SheetHeader>

              <EditStaffForm staffId={id} roles={roles} />
            </SheetContent>
          </Sheet>
        )
      }
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue('role') as Role
        return <div>{role?.name}</div>
      }
    },

    {
      accessorKey: "dob",
      header: "Birthday",
      cell: ({ row }) => {
        const dob = row.getValue('dob') as Date
        return <div>{dob.toLocaleDateString('en-US')}</div>
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

  return <DataTable table={table} />
}
