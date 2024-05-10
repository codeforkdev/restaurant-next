'use server'
import { db } from "@/db";
import { Category, menuCategories, menuItems, images } from "@/db/schema";
import { MenuItem } from "@/types/menu-item";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export async function createMenuItem(menuItem: typeof menuItems.$inferInsert) {
  console.log(menuItem)
  await db.insert(menuItems).values(menuItem)
  revalidatePath("/")
}


export async function getMenuItemById(id: number) {
  const menuItem = await db.query.menuItems.findFirst({
    where: eq(menuItems.id, id),
    with: {
      category: {
        columns: {
          id: true,
          name: true
        }
      }
    }
  })
  return menuItem
}

export async function updateMenuItem(id: number, menuItem: Partial<MenuItem>) {
  await db.update(menuItems).set(menuItem).where(eq(menuItems.id, id)).returning()
  const item = await db.query.menuItems.findFirst({
    where: eq(menuItems.id, id),
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

export async function deleteMenuItem(id: number) {
  await db.delete(menuItems).where(eq(menuItems.id, id))
  revalidatePath("/")
}


export async function createCategory(name: string) {
  try {
    await db.insert(menuCategories).values({ name })
    revalidatePath("/")
    return { ok: true }
  } catch (e: any) {
    return { ok: false }
  }
}

export async function getCategoryWithDishes(id: number) {
  return await db.query.menuCategories.findFirst({
    where: eq(menuCategories.id, id),
    with: {
      menuItems: true
    }
  })
}

export async function updateCategory(id: number, category: Partial<Category>, image?: FormData) {

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
      await db.update(menuCategories).set({ ...category, image: data.secure_url }).where(eq(menuCategories.id, id))

    })
  } else {
    await db.update(menuCategories).set(category).where(eq(menuCategories.id, id))
  }
}


export async function listCategories() {
  const categories = await db.query.menuCategories.findMany({
    orderBy: asc(menuCategories.id)
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
    await db.insert(images).values({ url: data.secure_url })
    revalidatePath("/")
  })

}
