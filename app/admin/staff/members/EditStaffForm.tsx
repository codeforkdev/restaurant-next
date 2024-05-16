import { getStaff, updateStaff } from "@/app/actions/staff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewStaff, Role } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form"
import * as z from 'zod';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  roleId: z.coerce.number().nullable(),
})

type Schema = z.infer<typeof schema>

export function EditStaffForm({ staffId, roles }: { staffId: number, roles: Role[] }) {
  const client = useQueryClient()
  const query = useQuery({
    queryKey: [`staff-${staffId}`],
    queryFn: async () => {
      return await getStaff(staffId)
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: { id: number, data: NewStaff }) => {
      await updateStaff(data)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['staff-' + staffId] })
      client.invalidateQueries({ queryKey: ['staff-table'] })
    }
  })

  const { control, reset, register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: query.data
  })

  useEffect(() => {
    reset(query.data)
  }, [query.data])

  if (query.isLoading) {
    return <div className="h-full flex items-center justify-center"><div className="border-8 h-32 w-32 border-gray-300 border-t-slate-900 rounded-full animate-spin" /></div>
  }

  if (!query.data) {
    return <div> Error occured</div>
  }

  return (
    <form onSubmit={handleSubmit((data) => {
      mutation.mutate({ id: staffId, data })
    })} className="flex flex-col gap-4">

      <div>
        <Label>First name</Label>
        <Input {...register("firstName")} />
      </div>


      <div>
        <Label>Last name</Label>
        <Input {...register("lastName")} />
      </div>

      <div>
        <Label>Role</Label>
        <Controller
          name="roleId"
          control={control}
          render={({ field }) => {
            return (
              <Select
                defaultValue={query.data?.roleId?.toString() ?? ""}
                onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id.toString()} >{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          }}
        />
      </div>
      <Button>Update</Button>
    </form>
  )
}
