import { db } from '@/db'
import Image from 'next/image'
export default async function Page() {
  const images = await db.query.images.findMany()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {images.map(image => (
        <div key={image.id} className="h-72 relative">
          <Image src={image.url ?? ""} alt="thing" fill className="object-cover" />
        </div>
      ))}
    </div>
  )
}
