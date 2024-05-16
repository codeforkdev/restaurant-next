'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function SearchInput({ defaultSearch }: { defaultSearch?: string }) {
  const [search, setSearch] = useState(defaultSearch ?? "")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
    const value = event.currentTarget.value?.trim()
    const params = new URLSearchParams(searchParams.toString())

    if (!value) {
      params.delete("search")
    } else {
      params.set("search", value)
    }
    router.push("/admin/menu/dishes" + "?" + params.toString())
    router.refresh()

  }

  return (
    <div className="flex-1 flex flex-col gap-2 w-full">
      <Label>Search</Label>
      <Input
        className="w-full"
        placeholder="Filter by name..."
        value={search}
        onChange={handleChange}
      />
    </div>
  )
}

