'use client'
import { cn } from "@/lib/utils";
import { ConciergeBellIcon, FileTextIcon, TelescopeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export function TabLinks() {
  const segments = useSelectedLayoutSegments()
  const page = segments[0]
  return (
    <ul className="border-b flex bg-white flex justify-center xl:justify-start">
      <li className="flex-1 xl:flex-none">
        <Link href="/admin/staff/members" className={cn("py-6 xl:px-6  block border-b border-transparent flex gap-2 items-center w-full flex justify-center", {
          "border-orange-500": page === "members",

        })}>
          <UsersIcon size={16} />
          Members
        </Link>
      </li>
      <li className="flex-1 xl:flex-none">
        <Link href="/admin/staff/roles"
          className={cn("py-6 xl:px-6 block border-b border-transparent flex gap-2 items-center w-full flex justify-center", {
            "border-orange-500": page === "roles",
          })}
        >
          <ConciergeBellIcon size={16} />
          Roles
        </Link>
      </li>


      <li className="flex-1 xl:flex-none">
        <Link href="/admin/staff/hiring"
          className={cn("py-6 xl:px-6 block border-b border-transparent flex gap-2 items-center w-full flex justify-center", {
            "border-orange-500": page === "hiring",
          })}
        >
          <TelescopeIcon size={16} />
          Hiring
        </Link>
      </li>

    </ul>
  )
}
