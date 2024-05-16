'use client'

import { cn } from "@/lib/utils"
import { CalendarClockIcon, FileImageIcon, LineChartIcon, SquareMenuIcon, UsersIcon, UtensilsCrossedIcon } from "lucide-react"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

export function SideNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const segments = useSelectedLayoutSegments()
  console.log(segments)
  return (
    <ul className="text-white">
      <li>
        <Link onClick={onNavigate} href="/admin/menu/dishes" className={cn("px-6 py-4 block font-semibold border-l-2 border-transparent hover:bg-slate-800/50 flex items-center gap-4", {
          "border-orange-500": segments[0] === "menu"
        })}>
          <UtensilsCrossedIcon size={20} />
          Menu
        </Link>
      </li>
      <li>
        <Link onClick={onNavigate} href="/admin/staff/members" className={cn("px-6 py-4 block font-semibold border-l-2 border-transparent hover:bg-slate-800/50 flex items-center gap-4", {
          "border-orange-500": segments[0] === "staff"
        })}>
          <UsersIcon size={20} />
          Staff
        </Link>
      </li>
      <li>
        <Link onClick={onNavigate} href="/admin/schedule" className={cn("px-6 py-4 block font-semibold border-l-2 border-transparent hover:bg-slate-800/50 flex items-center gap-4", {
          "border-orange-500": segments[0] === "schedule"
        })}>
          <CalendarClockIcon size={20} />
          Schedule
        </Link>
      </li>
      <li>
        <Link onClick={onNavigate} href="/admin/reports" className={cn("px-6 py-4 block font-semibold border-l-2 border-transparent hover:bg-slate-800/50 flex items-center gap-4", {
          "border-orange-500": segments[0] === "schedule"
        })}>
          <LineChartIcon size={20} />
          Reports
        </Link>
      </li>

      <li>
        <Link onClick={onNavigate} href="/admin/images" className={cn("px-6 py-4 block font-semibold border-l-2 border-transparent hover:bg-slate-800/50 flex items-center gap-4", {
          "border-orange-500": segments[0] === "images"
        })}>
          <FileImageIcon size={20} />
          Images
        </Link>
      </li>

    </ul>
  )
}

