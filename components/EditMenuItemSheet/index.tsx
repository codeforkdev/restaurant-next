'use client'
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { EditMenuItemForm } from "../EditMenuItemForm";

export function EditDishSheet({ dishId,  name, categories, children}:{dishId: number, categories: any[], name: string, children: React.ReactNode}) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="sm:max-w-2xl flex flex-col ">
        <SheetHeader>
          <SheetTitle>Edit Menu Item</SheetTitle>
        </SheetHeader>
        <div className="flex-1">
          <EditMenuItemForm id={dishId} close={() => setOpen(false)} categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

