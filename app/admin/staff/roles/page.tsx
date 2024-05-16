import { Button } from "@/components/ui/button";
import { CreateRoleDialog } from "../CreateRoleDialog";
import { RolesTable } from "./RolesTable";
import { listRolesWithStaff } from "@/app/actions/roles";

export default async function Page() {
  const roles = await listRolesWithStaff()
  return (
    <div className="flex flex-col gap-2 py-4">
      <div>
        <CreateRoleDialog>
          <Button className="w-fit">+ Role</Button>
        </CreateRoleDialog>
      </div>
      <RolesTable roles={roles} />
    </div>
  )
}
