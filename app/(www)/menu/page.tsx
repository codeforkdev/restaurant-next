import { db } from "@/db"
import { cn } from "@/lib/utils"
import Image from "next/image"
export const dynamic = "force-dynamic";

export default async function Page() {
  const categories = await db.query.menuCategories.findMany({ with: { menuItems: true } })
  return (
    <>
      <h1 className="text-5xl text-center py-12">Menu</h1>
      <div className="flex flex-col gap-16 relative max-w-7xl mx-auto">


        {
          categories.map(category => {
            if (category.menuItems.length === 0) return
            return (
              <>
                {false && (
                  <div key={category.id} className={cn("border-2 relative h-64  bg-no-repeat bg-fixed bg-cover relative")}>
                    <Image src={category?.image ?? ""} alt="category" fill className="object-cover" />
                    <div className="bg-black/60 absolute w-full text-white py-16 -translate-y-1/2 top-1/2 flex flex-col gap-4">
                      <p className="text-center text-6xl tracking-wide text-orange-200 font-light ">{category.name}
                      </p>
                      <p className="text-center">{category.description}</p>
                    </div>
                  </div>

                )
                }



                <div className="max-w-7xl mx-auto flex flex-col  gap-4 w-full px-4">
                  <h2 className="text-3xl text-red-800 font-semibold">{category.name}</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8  w-full ">
                    {category.menuItems.filter(item => item.status === "serving").map(item =>
                      <li key={item.id}>
                        <div className="h-full flex flex-col gap-2 pb-2">
                          <p className=" font-light border-[#C6B6A8] border-b-2 pb-2 text-xl tracking-wide text-[#7B7B7B]">{item.name}</p>
                          <p className="leading-8 font-light text-[#7B7B7B]">{item.description}</p>
                          <p className="font-semibold font-bold">${item.price}</p>
                        </div>
                      </li>
                    )}
                  </ul>

                </div>
              </>

            )
          })
        }



      </div >
    </>
  )
}
