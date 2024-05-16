'use server'
import { db } from '@/db'
import * as schema from '@/db/schema'

export async function createRole(role: schema.NewRole) {
  await db.insert(schema.roles).values(role)
}

export async function listRolesWithStaff() {
  const roles = await db.query.roles.findMany({ with: { staff: true } })
  return roles
}

