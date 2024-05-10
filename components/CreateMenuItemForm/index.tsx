'use client'
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { createMenuItem } from "@/app/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CreateCategoryDialog } from "../MenuItemsTable/CreateCategoryDialog";

const schema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  categoryId: z.number(),
  status: z.string(),
  description: z.string()

})

type Schema = z.infer<typeof schema>

export default function CreateMenuItemDialog({ categories, children }: { categories: { id: number, name: string }[], children: React.ReactNode }) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema) })
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Create menu item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(async (data) => {
          console.log(data)
          await createMenuItem(data)
          reset()
          setOpen(false)
        })} className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" {...register("price")} />
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => {
                return (
                  <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={field.value?.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map(c => (
                          <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                        ))}
                        <CreateCategoryDialog>
                          <Button className="w-full">Create category</Button>
                        </CreateCategoryDialog>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )
              }}

            />

          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Status</Label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent >
                      <SelectGroup>
                        <SelectItem value="serving">Serving</SelectItem>
                        <SelectItem value="not-serving">Not Serving</SelectItem>
                        <SelectItem value="development">In Development</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectGroup>
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
