"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Dish } from "@/db/schema"
import { deleteDish, getDish, updateDish } from "@/app/actions"
import { useEffect } from "react"



type Props = {
  id: number
  onSuccess: () => void
  categories: { id: number, name: string }[]
}

const schema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  categoryId: z.coerce.number().nullable(),
  status: z.string(),
  description: z.string().nullable()
})

type Schema = z.infer<typeof schema>


export function EditDishForm({ id, onSuccess, categories }: Props) {
  const { data: dish, isLoading } = useQuery({ queryKey: ['dish-' + id], queryFn: async () => await getDish(id), })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, defaultValues }
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: dish
  })
  useEffect(() => {
    reset(dish)
  }, [dish])

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: Partial<Dish> }) => await updateDish(id, data),
    onSuccess: (data) => {
      reset(data)
      queryClient.invalidateQueries({ queryKey: ['dish-' + data?.id] })
      onSuccess()
      toast({
        title: `Updated ${dish?.name}`,
      })
    }
  })

  if (isLoading) {

    return <div className="h-full flex items-center justify-center"><div className="border-8 h-32 w-32 border-gray-300 border-t-slate-900 rounded-full animate-spin" /></div>
  }

  if (!dish) {
    return <div> Error occured</div>
  }

  console.log('dish', dish)
  console.log('categories', categories)

  console.log('default values', defaultValues)

  return (
    <form onSubmit={handleSubmit(async (data) => {
      console.log(data)
      const { id, ...rest } = data
      mutation.mutate({ id, data: rest })
    })} className="flex flex-col gap-4 h-full">
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
              <Select defaultValue={dish.id.toString()} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                  ))}
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
            return <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="serving">Serving</SelectItem>
                  <SelectItem value="not-serving">Not Serving</SelectItem>
                  <SelectItem value="development">In Development</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          }}
        />
      </div>

      <Button type="submit" className="mt-auto">Update</Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteDish(dish.id)
                close()
                toast({
                  title: `Deleted ${dish.name}`
                })
              }}
              asChild
            >
              <Button variant="destructive">Confirm</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )

}
