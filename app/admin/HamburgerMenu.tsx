'use client'
import Image from 'next/image'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { SideNavigation } from "./SideNavigation";
import { useState } from "react";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="hover:border-slate-700 border border-transparent rounded-lg p-2">
          <MenuIcon className="text-gray-50" />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0 bg-slate-900 border-none" closeBtn={false}>

        <div className="flex gap-4 items-center p-4 border-b border-slate-700">
          <div className="relative h-10 w-10">
            <Image src={'https://demartinolatin.com/wp-content/uploads/2019/04/Logo_Web_Final_Footer.png'} alt="logo" fill />
          </div>
          <p className="text-gray-50">De Martinos</p>
        </div>
        <SideNavigation onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

