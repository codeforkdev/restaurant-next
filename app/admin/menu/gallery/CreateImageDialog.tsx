import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function CreateImageDialog({ children }: { children: React.ReactNode }) {

  return (

    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Add image to gallery
        </DialogHeader>
        <Label></Label>
      </DialogContent>

    </Dialog>
  )

}
