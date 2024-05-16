'use client'
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { createCategory } from "@/app/actions";
import { useState } from "react";


const schema = z.object({
  name: z.string()
})

type Schema = z.infer<typeof schema>

export function CreateCategoryDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }

  } = useForm<Schema>({ resolver: zodResolver(schema) })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(async ({ name }) => {
          const result = await createCategory(name)
          console.log('result', result)
          if (result.ok) {
            reset()
            setOpen(false)
          }
        })}>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>

  )
}
