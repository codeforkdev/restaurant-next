'use client'
import { createRole } from "@/app/actions/roles";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewRole } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  name: z.string()
})

type Props = {
  children: React.ReactNode
}

export function CreateRoleDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: NewRole) => {
      await createRole(data)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['roles-table'] })
      setOpen(false)
    }
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(async (data) => {
          mutation.mutate(data)
        })} className="flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
