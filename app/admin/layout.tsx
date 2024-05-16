import Image from "next/image"
import { SideNavigation } from "./SideNavigation"
import { HamburgerMenu } from "./HamburgerMenu"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col xl:flex-row h-full bg-slate-900">
      <div className="bg-slate-900 xl:hidden p-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative h-10 w-10">
            <Image src={'https://demartinolatin.com/wp-content/uploads/2019/04/Logo_Web_Final_Footer.png'} alt="logo" fill />
          </div>
          <p className="text-gray-50">De Martinos</p>
        </div>
        <HamburgerMenu />
      </div>
      <div className="w-72 border-r h-full hidden xl:block">
        <div className="flex gap-4 px-6 py-4 items-center border-b border-slate-700">
          <div className="relative h-10 w-10">
            <Image src={'https://demartinolatin.com/wp-content/uploads/2019/04/Logo_Web_Final_Footer.png'} alt="logo" fill />
          </div>
          <div className="text-xl text-white font-semibold">De Martinos</div>
        </div>
        <SideNavigation />
      </div>
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
    </div>
  )
}
