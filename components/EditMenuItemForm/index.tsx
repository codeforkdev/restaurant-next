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
import { deleteMenuItem, getMenuItemById, updateMenuItem } from "@/app/actions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MenuItem } from "@/types/menu-item"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useEffect } from "react"



type Props = {
  id: number
  close: () => void
  categories: { id: number, name: string }[]
}

const schema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  categoryId: z.number().nullable(),
  status: z.string(),
  description: z.string().nullable()
})

type Schema = z.infer<typeof schema>


function Form({ menuItem, close, categories }: { menuItem: MenuItem, close: () => void, categories: { id: number, name: string }[] }) {
  const { toast } = useToast()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: menuItem
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: Partial<MenuItem> }) => await updateMenuItem(id, data),
    onSuccess: (data) => {
      reset(data)
      queryClient.invalidateQueries({ queryKey: ['menu-item-' + data?.id] })
      toast({
        title: `Updated ${menuItem.name}`,
      })
    }
  })


  useEffect(() => {
    console.log("errors", errors)
  }, [errors])

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
              <Select defaultValue={field.value?.toString() ?? ""} onValueChange={(val) => field.onChange(Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
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
                await deleteMenuItem(menuItem.id)
                close()
                toast({
                  title: `Deleted ${menuItem.name}`
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

export function EditMenuItemForm({ id, close, categories }: Props) {

  const query = useQuery({ queryKey: ['menu-item-' + id], queryFn: () => getMenuItemById(id), })

  if (query.isLoading) {
    return <div>Loading</div>
  }

  if (!query.data) {
    return <div> Error occured</div>
  }

  const menuItem = query.data

  return (
    <Form menuItem={menuItem} close={close} categories={categories} />
  )
}
