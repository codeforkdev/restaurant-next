'use server'

import { db } from "@/db"
import * as schema from "@/db/schema"
import { asc, eq } from "drizzle-orm"

export async function createStaff(staff: schema.NewStaff) {
  await db.insert(schema.staff).values(staff)
}

export async function getStaff(id: number) {
  const staff = await db.query.staff.findFirst({
    where: eq(schema.staff.id, id)
  })
  return staff
}

export async function listStaff() {
  const staff = await db.query.staff.findMany({
    with: { role: true },
    orderBy: asc(schema.staff.id)
  })

  return staff
}

export async function updateStaff({ id, data }: { id: number, data: schema.NewStaff }) {
  await db.update(schema.staff).set(data).where(eq(schema.staff.id, id))
}
