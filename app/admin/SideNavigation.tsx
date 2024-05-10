'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

export function SideNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const segments = useSelectedLayoutSegments()
  console.log(segments)
  return (
    <>

      <ul className="text-white">
        <li>
          <Link onClick={onNavigate} href="/admin/menu/dishes" className={cn("px-6 py-4 block font-semibold border-l border-transparent hover:bg-slate-800/50", {
            "border-orange-500": segments[0] === "menu"
          })}>
            Menu
          </Link>
        </li>
        <li>
          <Link onClick={onNavigate} href="/admin/staff" className={cn("px-6 py-4 block font-semibold border-l border-transparent hover:bg-slate-800/50", {
            "border-orange-500": segments[0] === "staff"
          })}>
            Staff
          </Link>
        </li>

      </ul>

    </>
  )
}

