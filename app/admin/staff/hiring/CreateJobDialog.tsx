'use client'
import { createJob } from "@/app/actions/jobs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewJob } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod'

type Props = {
  children: React.ReactNode
}

const schema = z.object({
  name: z.string()
})

type Schema = z.infer<typeof schema>

export function CreateJobDialog({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm<Schema>({ resolver: zodResolver(schema) })
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newJob: NewJob) => {
      return createJob(newJob)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['jobs-table'] })
      setOpen(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        reset()
      }
      setOpen(isOpen)
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Job
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => {
          mutation.mutate(data)
        })} className="flex flex-col gap-2">
          <div>
            <Label>Name</Label>
            <Input {...register("name")} />
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}




