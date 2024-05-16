'use client'
import { DataTable } from "@/components/DataTable";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Job } from "@/db/schema";
import { Switch } from "@/components/ui/switch"
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { listJobs, updateJob } from "@/app/actions/jobs";

export function JobsTable({ jobs }: { jobs: Job[] }) {
  const query = useQuery({
    queryKey: ['jobs-table'],
    queryFn: async () => {
      return await listJobs()
    },
    initialData: jobs
  })
  const columns: ColumnDef<Job>[] = [
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
          <Sheet>
            <SheetTrigger>{name}</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{name}</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        )
      }
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => {
        const id = row.getValue("id") as number
        const isActive = row.getValue("isActive") as boolean
        return (
          <Switch defaultChecked={isActive} onCheckedChange={async (isChecked) => {
            await updateJob(id, { isActive: isChecked })
          }} />
        )
      }
    }
  ]

  const table = useReactTable({
    data: query.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  })

  return <DataTable table={table} />
}
