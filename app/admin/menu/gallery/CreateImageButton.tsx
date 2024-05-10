'use client'
import { uploadImage } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateImageButton() {
  return (
    <>
      <Button asChild>
        <Label htmlFor="image" className="hover:cursor-pointer">
          + image
        </Label>
      </Button>
      <Input id="image" type="file" className="hidden"
        onChange={async (e) => {
          if (e.currentTarget?.files) {
            const file = e.currentTarget.files[0]
            if (!file) {
              return
            }
            const formData = new FormData()
            formData.append("file", file)
            await uploadImage(formData)
          }
        }} />

    </>

  )
}

