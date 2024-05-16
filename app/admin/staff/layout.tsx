import { TabLinks } from "./TabLinks";

export default function Layout({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return <div className="h-full bg-gray-100 flex flex-col ">
    <TabLinks />
    <div className="max-w-7xl mx-auto px-4 w-full h-full">
      {children}
    </div>
  </div>
}


