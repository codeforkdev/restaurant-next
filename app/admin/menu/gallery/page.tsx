import { db } from "@/db";
import Image from 'next/image'
import { CreateImageButton } from "./CreateImageButton";

export default async function Page() {
  const images = await db.query.images.findMany()

  return (
    <div className="pb-8">
      <div className="p-2 py-4">
        <CreateImageButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-4 gap-4 place-items-center">
        {images.map(image => (
          <div key={image.id} className="border-2 border-transparent hover:border-blue-500 p-1 rounded-lg relative group max-w-[300px] w-full">
            <div className="h-60 relative rounded overflow-clip ">
              <Image src={image.url ?? ""} alt="thing" fill />
            </div>
            <button className="text-red-500 absolute right-2 top-2 hidden group-hover:block bg-gray-50 h-5 w-5 rounded-full text-sm flex items-center justify-center font-semibold">X</button>
          </div>
        ))}
      </div>
    </div>
  )
}
