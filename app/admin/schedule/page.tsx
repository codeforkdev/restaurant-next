import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserIcon } from "lucide-react";

export default function Page() {
  return <div className="h-full py-4 px-4">
    <div className="w-72 h-full flex flex-col gap-4 ">
      <div className="h-full  shadow rounded-lg overflow-clip bg-white flex-1">
        <div className="h-2 bg-orange-500"></div>
        <div className="p-4">
          <div className="font-semibold text-xl">Sun, Jun 2</div>
          <div>
            <div className="flex items-center justify-end">
              <UserIcon fill="gray" stroke="none" />
              <span>9</span>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">+ Shift</Button>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow flex items-center justify-between p-4">
        <div className="bg-green-300 w-fit px-4 rounded-full font-semibold">20%</div>
        <div className="font-semibold">
          <p>24 hours</p>
          <p>$300</p>
        </div>
      </div>
    </div>
  </div>

}
