import { db } from "@/db"
export const dynamic = "force-dynamic";

export default async function Page() {
  const categories = await db.query.menuCategories.findMany({ with: { dishes: true } })
  return (
    <div className="bg-gray-50 h-full py-8">
      <div className="flex flex-col relative max-w-7xl mx-auto bg-white p-12 shadow-lg">
        {
          categories.map(category => {
            if (category.dishes.length === 0) return
            return (
              <>
                <div className="max-w-7xl mx-auto flex flex-col  gap-4 w-full px-16 border border-red-800 py-16 relative">
                  <h2 className="text-3xl font-semibold font-semibold text-center bg-white px-8 border-x border-red-800 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase">{category.name}</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8  w-full ">
                    {category.dishes.filter(item => item.status === "serving").map(item =>
                      <li key={item.id}>
                        <div className="h-full flex flex-col pb-2">
                          <div className="flex justify-between">
                            <p className=" font-semibold text-lg tracking-wider text-black uppercase tracking-wide">{item.name}</p>
                            <p className="font-semibold font-bold">${item.price}</p>
                          </div>
                          <p className="leading-8 font-light ">{item.description}</p>
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
    </div>
  )
}
