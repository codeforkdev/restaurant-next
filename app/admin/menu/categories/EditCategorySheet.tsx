'use client'
import Image from 'next/image'
import { getCategoryWithDishes, getMenuItemById, updateCategory } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod'

export function EditCategorySheet({ id, children }: { id: number, children: React.ReactNode }) {
  const query = useQuery({ queryKey: ['category-' + id], queryFn: () => getCategoryWithDishes(id), })
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      {query.data && (
        <SheetContent side="right" className="sm:max-w-2xl flex flex-col ">
          <SheetHeader>
            <SheetTitle>Edit Category: {query.data.name}</SheetTitle>
          </SheetHeader>
          <div className="flex-1">
            <EditCategoryForm category={query.data} onSuccess={() => setOpen(false)} />
          </div>
        </SheetContent>
      )
      }
    </Sheet>
  )
}

const schema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  image: z.instanceof(FileList).nullable()
})

function EditCategoryForm({ category, onSuccess }: { category: any, onSuccess: () => void }) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: { category: Partial<Category>, image?: FormData }) => {
      console.log("mutate")
      return updateCategory(category.id, data.category, data.image)
    },
    onSuccess: (data) => {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category-' + category.id] })
    }
  })
  const { image, ...rest } = category
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: rest })


  useEffect(() => {
    console.log("errors", errors)
  }, [errors])

  return (
    <form autoFocus={false} onSubmit={handleSubmit(async (data) => {
      const formData = new FormData()
      const { image, ...category } = data
      if (image && image[0]) {
        formData.append("file", image[0])
        mutation.mutate({ category, image: formData })
      } else {
        mutation.mutate({ category })
      }
    })} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input autoFocus={false} {...register('name')} />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Description</Label>
        <Textarea {...register('description')} />
      </div>

      <div className="">
        <Label htmlFor="image">Image</Label>
        <br />
        <Label htmlFor="image" className="">
          <Input id="image" type="file" {...register('image')} className="hidden" />
        </Label>
        {category.image &&
          <>
            <Label htmlFor="image" className="text-blue-500 w-fit hover:cursor-pointer hover:underline mb-3 inline-block">replace image</Label>
            <div className="relative h-52 w-52 rounded-lg overflow-clip">
              <Image src={category.image} alt="category" fill />
            </div>
          </>
        }
      </div>

      <Button type="submit">Update</Button>
    </form>
  )
}
