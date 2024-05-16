import { db } from "@/db"
import { StaffTable } from "./StaffTable"
import { CreateStaffDialog } from "../CreateStaffDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateRoleDialog } from "../CreateRoleDialog"
import { listStaff } from "@/app/actions/staff"


export default async function Page() {
  const staff = (await listStaff()).map((s) => ({ ...s, name: `${s.firstName} ${s.lastName}` }))
  const roles = await db.query.roles.findMany()

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 w-full">
          <Label>Search</Label>
          <Input placeholder="Search name..." />
        </div>

        <div className="flex-1 max-w-[300px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem value={role.id.toString()}>{role.name}</SelectItem>
              ))}
              <SelectSeparator />
              <CreateRoleDialog>
                <Button className="w-full">Create Role</Button>
              </CreateRoleDialog>
            </SelectContent>
          </Select>
        </div>
        <CreateStaffDialog roles={roles}>
          <Button>+ Staff</Button>
        </CreateStaffDialog>
      </div>
      <StaffTable data={staff} roles={roles} />
    </div >
  )
}



