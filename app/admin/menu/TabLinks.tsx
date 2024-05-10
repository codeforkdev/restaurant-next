'use client'
import { cn } from "@/lib/utils";
import { BoxesIcon, ImagesIcon, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

export function Navigation() {
  const pathname = usePathname()
  const segments = useSelectedLayoutSegments()
  const page = segments[0]
  console.log(pathname)
  console.log(segments)
  return (
    <ul className="border-b flex bg-white flex justify-center xl:justify-start">
      <li className="flex-1 xl:flex-none">
        <Link href="/admin/menu/dishes" className={cn("py-6 xl:px-6  block border-b border-transparent flex gap-2 items-center w-full flex justify-center", {
          "border-orange-500": page === "dishes",

        })}>
          <Utensils size={16} />
          Dishes
        </Link>
      </li>
      <li className="flex-1 xl:flex-none">
        <Link href="/admin/menu/categories"
          className={cn("py-6 xl:px-6 block border-b border-transparent flex gap-2 items-center w-full flex justify-center", {
            "border-orange-500": page === "categories",
          })}
        >
          <BoxesIcon size={16} />
          Categories
        </Link>
      </li>
      <li className="flex-1 xl:flex-none">
        <Link href="/admin/menu/gallery"
          className={cn("py-6 xl:px-6 block border-b flex gap-2 items-center border-transparent w-full flex justify-center", {
            "border-orange-500": page === "gallery",
          })}
        >
          <ImagesIcon size={16} />
          Gallery
        </Link>
      </li>
    </ul>
  )
}
