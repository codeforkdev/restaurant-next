'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css'
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import React from "react";
import { Role } from "@/db/schema";
import { CreateRoleDialog } from "./CreateRoleDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaff } from "@/app/actions/staff";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  roleId: z.number()
})

type Schema = z.infer<typeof schema>

type Props = {
  children: React.ReactNode
  roles: Role[]
}

export function CreateStaffDialog({ children, roles }: Props) {
  const [open, setOpen] = useState(false)
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: Schema) => {
      await createStaff(data)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['staff-table'] })
      setOpen(false)
    }
  })
  const { watch, register, control,
    handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Staff</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(async (data) => {
          mutation.mutate(data)
        })} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div>
              <Label>First name</Label>
              <Input type="text" {...register("firstName")} />
            </div>
            <div>
              <Label>Last name</Label>
              <Input type="text" {...register("lastName")} />
            </div>
          </div>
          <div>
            <Label>Date of birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !null && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch('dob') ? format(watch('dob'), "PPP") : <span>Pick a date</span>}
                </Button>

              </PopoverTrigger>
              <PopoverContent>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => {
                    return <Calendar onChange={(value, event) => {
                      field.onChange(value)

                    }} value={field.value} />
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Role</Label>
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="role"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => {
                        return <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>
                      })}
                      <SelectSeparator />
                      <CreateRoleDialog>
                        <Button className="w-full">+ Role</Button>
                      </CreateRoleDialog>
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )

}
