'use server'
import { db } from "@/db";
import * as schema from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export async function createDish(dish: schema.NewDish) {
  await db.insert(schema.dishes).values(dish)
  revalidatePath("/")
}


export async function getDish(id: number) {
  const dish = await db.query.dishes.findFirst({
    where: eq(schema.dishes.id, id),
    with: {
      category: true
    }
  })
  return dish
}

export async function updateDish(id: number, dish: Partial<schema.Dish>) {
  await db.update(schema.dishes).set(dish).where(eq(schema.dishes.id, id)).returning()
  const item = await db.query.dishes.findFirst({
    where: eq(schema.dishes.id, id),
    with: {
      category: {
        columns: {
          id: true,
          name: true
        }
      }
    }

  })
  revalidatePath("/")
  return item
}

export async function deleteDish(id: number) {
  await db.delete(schema.dishes).where(eq(schema.dishes.id, id))
  revalidatePath("/")
}


export async function createCategory(name: string) {
  try {
    await db.insert(schema.menuCategories).values({ name })
    revalidatePath("/")
    return { ok: true }
  } catch (e: any) {
    return { ok: false }
  }
}

export async function getCategoryWithDishes(id: number) {
  return await db.query.menuCategories.findFirst({
    where: eq(schema.menuCategories.id, id),
    with: {
      dishes: true
    }
  })
}

export async function updateCategory(id: number, category: Partial<schema.Category>, image?: FormData) {

  if (image) {
    const file = image.get('file') as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, function(error: any, result: any) {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      }).end(buffer)
    }).then(async (data: any) => {
      console.log(data)
      if (!data?.secure_url) return
      await db.update(schema.menuCategories).set({ ...category, image: data.secure_url }).where(eq(schema.menuCategories.id, id))

    })
  } else {
    await db.update(schema.menuCategories).set(category).where(eq(schema.menuCategories.id, id))
  }
}


export async function listCategories() {
  const categories = await db.query.menuCategories.findMany({
    orderBy: asc(schema.menuCategories.id),
    with: {
      dishes: true
    }
  })
  return categories
}


export async function uploadImage(image: FormData) {
  console.log("Begin uploading image")
  const file = image.get('file') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, function(error: any, result: any) {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    }).end(buffer)
  }).then(async (data: any) => {
    console.log(data)
    if (!data?.secure_url) return
    await db.insert(schema.images).values({ url: data.secure_url })
    revalidatePath("/")
  })
}





