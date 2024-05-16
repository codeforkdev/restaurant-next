'use server'

import { db } from "@/db"
import * as schema from '@/db/schema'
import { asc, eq } from "drizzle-orm"

export async function listJobs() {
  const jobs = await db.query.jobs.findMany({ orderBy: asc(schema.jobs.id) })
  return jobs
}

export async function createJob(job: schema.NewJob) {
  await db.insert(schema.jobs).values(job)
}

export async function updateJob(id: number, job: Partial<schema.NewJob>) {
  await db.update(schema.jobs).set(job).where(eq(schema.jobs.id, id))
}
