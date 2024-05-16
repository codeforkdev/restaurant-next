'use client'
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { EditDishForm } from "../EditDishForm";

export function EditDishSheet({ dishId, categories, children }: { dishId: number, categories: any[], name: string, children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="sm:max-w-2xl flex flex-col ">
        <SheetHeader>
          <SheetTitle>Edit Menu Item</SheetTitle>
        </SheetHeader>
        <div className="flex-1">
          <EditDishForm id={dishId} onSuccess={() => setOpen(false)} categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

